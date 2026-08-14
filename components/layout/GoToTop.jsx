"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/lib/lenis-context";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const aboutEl = document.getElementById("about");
    if (!aboutEl) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });

    observer.observe(aboutEl);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "fixed", zIndex: 40 }}
          className="group glass bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-luxury hover:-translate-y-0.5 hover:scale-105 hover:border-brand-gold/50 hover:bg-white/70 hover:shadow-[0_10px_28px_rgba(201,161,74,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:bottom-8 sm:right-8"
        >
          <ArrowUp
            size={20}
            className="text-brand-gold transition-transform duration-300 ease-luxury group-hover:-translate-y-1"
          />

          <span
            role="tooltip"
            className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-all duration-300 ease-luxury group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
          >
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
