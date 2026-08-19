"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import FormField from "./FormField";
import { GOOGLE_SHEETS_URL } from "@/lib/site";

const TRUST_ITEMS = ["Response within 24 Hours", "100% Confidential"];

const DESCRIPTION_MAX = 600;

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  description: "",
};

function validateField(name, value) {
  switch (name) {
    case "firstName":
    case "lastName":
    case "company":
      return value.trim().length > 1 ? "" : "This field is required.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address.";
    case "phone":
      return /^[0-9+()\-\s]{7,20}$/.test(value.trim()) ? "" : "Enter a valid phone number.";
    case "website":
      if (!value.trim()) return "";
      return /^(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$/i.test(value.trim()) ? "" : "Enter a valid URL.";
    case "description":
      return value.trim().length >= 20 ? "" : "Please share a few more details (min. 20 characters).";
    default:
      return "";
  }
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name]) }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setTouched({});
    setErrors({});
    setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Guards against a duplicate submission slipping in before the disabled
    // button prop has re-rendered (e.g. an Enter-key double-fire).
    if (status === "submitting") return;

    const nextErrors = Object.fromEntries(Object.keys(form).map((name) => [name, validateField(name, form[name])]));
    setErrors(nextErrors);
    setTouched(Object.fromEntries(Object.keys(form).map((name) => [name, true])));

    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("submitting");

    try {
      // No explicit Content-Type header on purpose: setting one (e.g.
      // application/json) turns this into a CORS-preflighted request, which
      // Google Apps Script Web Apps don't handle, so the request would fail
      // before ever reaching doPost. Apps Script reads the raw body via
      // e.postData.contents regardless of the declared content type.
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          companyName: form.company,
          website: form.website,
          description: form.description,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.result === "error") {
        throw new Error(result?.error || `Request failed with status ${response.status}`);
      }

      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-form-card relative flex flex-col items-center gap-4 overflow-hidden px-8 py-16 text-center sm:px-10">
        <span aria-hidden="true" className="aurora-blob -right-16 -top-16 h-56 w-56 bg-gold/10" />
        <span aria-hidden="true" className="aurora-blob -bottom-16 -left-16 h-56 w-56 bg-gold-bright/10" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
        >
          <CheckCircle2 size={32} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col gap-2"
        >
          <h3 className="font-display text-2xl text-ink sm:text-3xl">Message Sent!</h3>
          <p className="max-w-sm text-base font-medium leading-relaxed text-black">
            Thank you! Your message has been submitted successfully. We&apos;ll get back to you soon.
          </p>
        </motion.div>
        <button
          type="button"
          onClick={resetForm}
          className="relative z-10 mt-2 text-xs font-medium uppercase tracking-widest text-gold transition-colors duration-300 ease-luxury hover:text-gold-light"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="contact-form-card relative flex flex-col items-center gap-4 overflow-hidden px-8 py-16 text-center sm:px-10">
        <span aria-hidden="true" className="aurora-blob -right-16 -top-16 h-56 w-56 bg-red-400/10" />
        <span aria-hidden="true" className="aurora-blob -bottom-16 -left-16 h-56 w-56 bg-red-400/10" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600"
        >
          <AlertCircle size={32} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col gap-2"
        >
          <h3 className="font-display text-2xl text-ink sm:text-3xl">Something Went Wrong</h3>
          <p className="max-w-sm text-base font-medium leading-relaxed text-black">
            Something went wrong while submitting your form. Please try again.
          </p>
        </motion.div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="relative z-10 mt-2 text-xs font-medium uppercase tracking-widest text-gold transition-colors duration-300 ease-luxury hover:text-gold-light"
        >
          Back to form
        </button>
      </div>
    );
  }

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="contact-form-card relative flex flex-col gap-4 overflow-hidden px-6 py-5 sm:px-8 sm:py-5"
    >
      <span aria-hidden="true" className="aurora-blob -right-20 -top-20 h-64 w-64 bg-gold/10" />
      <span aria-hidden="true" className="aurora-blob -bottom-24 -left-16 h-56 w-56 bg-gold-bright/8" />

      <motion.div variants={itemVariants} className="relative z-10 flex flex-col gap-1.5">
        <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
          Ready to Build Something Amazing?
        </h3>
        <p className="text-base font-medium leading-relaxed text-black">
          Tell us about your project and our team will get back to you within 24 hours.
        </p>
      </motion.div>

      <div className="relative z-10 flex flex-col gap-3">
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="contact-firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            error={errors.firstName}
            touched={touched.firstName}
            placeholder="Jane"
            autoComplete="given-name"
            required
          />
          <FormField
            id="contact-lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            error={errors.lastName}
            touched={touched.lastName}
            placeholder="Doe"
            autoComplete="family-name"
            
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="contact-email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
          <FormField
            id="contact-phone"
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            onBlur={handleBlur("phone")}
            error={errors.phone}
            touched={touched.phone}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="contact-company"
            label="Company Name"
            value={form.company}
            onChange={handleChange("company")}
            onBlur={handleBlur("company")}
            error={errors.company}
            touched={touched.company}
            placeholder="Your company"
            autoComplete="organization"
            required
          />
          <FormField
            id="contact-website"
            label="Website (Optional)"
            type="url"
            value={form.website}
            onChange={handleChange("website")}
            onBlur={handleBlur("website")}
            error={errors.website}
            touched={touched.website}
            placeholder="https://yourcompany.com"
            autoComplete="url"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="contact-description" className="text-xs font-medium uppercase tracking-widest text-text-secondary">
              Project Description
              <span className="ml-0.5 text-gold" aria-hidden="true">
                *
              </span>
            </label>
            <span className="text-[11px] text-text-muted">
              {form.description.length}/{DESCRIPTION_MAX}
            </span>
          </div>
          <div className="relative">
            <textarea
              id="contact-description"
              name="description"
              value={form.description}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="Tell us about your project goals, business, audience, and expectations..."
              maxLength={DESCRIPTION_MAX}
              required
              aria-required="true"
              aria-invalid={Boolean(touched.description && errors.description)}
              aria-describedby={touched.description && errors.description ? "contact-description-error" : undefined}
              className={`h-18 w-full resize-none rounded-2xl border bg-[#fbfaf8] px-4 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-luxury placeholder:text-text-muted/70 ${
                touched.description && errors.description
                  ? "border-red-300 focus:border-red-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
                  : "border-[#e9e3d6] focus:border-gold focus:bg-white focus:shadow-[0_0_0_3px_rgba(201,161,74,0.15)]"
              }`}
            />
            {touched.description && !errors.description && form.description.trim().length > 0 && (
              <CheckCircle2
                aria-hidden="true"
                size={18}
                className="pointer-events-none absolute right-3.5 top-3.5 text-emerald-500"
              />
            )}
          </div>
          <div className="min-h-3">
            {touched.description && errors.description && (
              <p id="contact-description-error" role="alert" className="text-xs text-red-500">
                {errors.description}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="relative z-10 flex flex-col gap-2.5">
        <div className="group/submit relative w-full overflow-hidden rounded-full sm:w-fit">
          <Button
            type="submit"
            variant="solid"
            magnetic={false}
            disabled={status === "submitting"}
            className="w-full justify-center active:scale-[0.98] disabled:cursor-wait disabled:opacity-90 sm:w-fit"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              "Let's Build Together"
            )}
          </Button>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 animate-[btn-shine-sweep_3.5s_ease-in-out_infinite]"
          />
        </div>

        <div className="border-t border-[#e9e3d6]/70 pt-2.5">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {TRUST_ITEMS.map((label) => (
              <li key={label} className="flex items-center gap-2.5 text-base font-medium text-black">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.form>
  );
}