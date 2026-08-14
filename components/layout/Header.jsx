"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "@/lib/lenis-context";
import company from "@/data/company.json";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const showSurface = scrolled && !open;

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setOpen(false);

    if (href === "#top") {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -88, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxury ${
          showSurface ? "glass-nav shadow-[0_8px_32px_rgba(79,70,229,0.08)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="relative z-10 flex items-center gap-3"
            aria-label="Raga Designers home"
          >
            <div className="relative h-9 w-auto shrink-0">
              <Image
                src="/assets/images/rdb.png"
                alt={company.shortName}
                width={140}
                height={36}
                className="h-9 w-auto object-contain"
                priority
              />
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {company.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative text-xs font-medium uppercase tracking-widest text-ink"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-luxury group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="rounded-full border border-gold px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-gold transition-colors duration-300 ease-luxury hover:bg-gold hover:text-bg"
            >
              Book a Consultation
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 text-ink lg:hidden"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg-secondary px-8"
          >
            <nav className="flex flex-col gap-1">
              {company.nav.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-2.5 font-display text-4xl text-ink sm:text-6xl"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + company.nav.length * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-gold px-6 py-3 text-xs font-medium uppercase tracking-widest text-gold"
            >
              Book a Consultation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
