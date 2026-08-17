import { LifeBuoy, Handshake, Crown, PhoneCall, Briefcase, Phone } from "lucide-react";
import RevealText from "@/components/animations/RevealText";
import FadeIn from "@/components/animations/FadeIn";
import ContactForm from "./ContactForm";

const CONTACT_CHANNELS = [
  {
    label: "Support Desk",
    value: "ragadesigners.cse@gmail.com",
    href: "mailto:ragadesigners.cse@gmail.com",
    icon: LifeBuoy,
  },
  {
    label: "CEO Executive Office",
    value: "shreeragadesigners@gmail.com",
    href: "mailto:shreeragadesigners@gmail.com",
    icon: Handshake,
  },
  {
    label: "Chief Executive",
    value: "+91 99628 56406",
    href: "tel:+919962856406",
    icon: Crown,
  },
  {
    label: "Sales Line",
    value: "+91 99620 81472",
    href: "tel:+919962081472",
    icon: PhoneCall,
  },
  {
    label: "Business Enquiry",
    value: "+91 99627 43888",
    href: "tel:+919962743888",
    icon: Briefcase,
  },
  {
    label: "Support Line",
    value: "+91 99627 64888",
    href: "tel:+919962764888",
    icon: Phone,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen w-full items-center overflow-hidden bg-bg py-6 sm:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(79,70,229,0.12), transparent 55%), radial-gradient(circle at 80% 70%, rgba(6,182,212,0.1), transparent 50%), repeating-linear-gradient(0deg, rgba(79,70,229,0.04) 0px, rgba(79,70,229,0.04) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(79,70,229,0.04) 0px, rgba(79,70,229,0.04) 1px, transparent 1px, transparent 64px)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <FadeIn direction="none" duration={0.6}>
              <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">Let&apos;s Talk</span>
            </FadeIn>
            <RevealText
              as="h2"
              text="Let's Build Your Dream"
              className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            />
            <FadeIn delay={0.2} className="max-w-md text-base leading-relaxed text-text-secondary">
              <p>
                Tell us about your project — website, e-commerce store, or digital marketing goals — and we&apos;ll
                get back to you within one business day.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CONTACT_CHANNELS.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-panel group flex items-center gap-3 px-4 py-3.5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 ease-luxury group-hover:bg-gold group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-ink">{label}</span>
                    <span className="truncate text-xs text-text-muted">{value}</span>
                  </span>
                </a>
              ))}
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="lg:col-span-7">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
