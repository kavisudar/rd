"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import PortfolioImage from "@/components/ui/PortfolioImage";

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-2xl backdrop-blur-2xl sm:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-bg/90 text-ink shadow-md transition-colors duration-300 ease-luxury hover:bg-gold hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="relative h-64 w-full shrink-0 sm:h-auto sm:w-1/2">
              <PortfolioImage src={project.images?.[0]} alt={project.title} sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>

            <div className="flex flex-col gap-4 p-8 sm:w-1/2 sm:p-10">
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                {project.category} · {project.location} · {project.year}
              </span>
              <h3 className="font-display text-3xl text-ink sm:text-4xl">{project.title}</h3>
              <p className="text-base font-medium leading-relaxed text-black sm:text-lg">{project.description}</p>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live mt-2 inline-flex w-fit items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-xs font-medium uppercase tracking-widest text-gold transition-colors duration-300 ease-luxury hover:bg-gold hover:text-white"
                >
                  Visit Live Site
                  <ExternalLink size={15} className="transition-transform duration-300 ease-luxury group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
