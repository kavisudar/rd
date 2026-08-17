"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import PortfolioImage from "@/components/ui/PortfolioImage";

export default function OverlayGallery({ caseStudy }) {
  const gallery = caseStudy.gallery ?? [];
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    [gallery.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % gallery.length)),
    [gallery.length],
  );

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  if (gallery.length === 0) return null;

  const lightbox = activeIndex !== null && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-150 flex items-center justify-center bg-black/90 p-6"
        style={{ position: "fixed", zIndex: 150 }}
        onClick={close}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close gallery"
          className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-bg/90 text-ink transition-colors duration-300 ease-luxury hover:bg-gold hover:text-white"
        >
          <X size={18} />
        </button>

        {gallery.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/90 text-ink transition-colors duration-300 ease-luxury hover:bg-gold hover:text-white sm:left-8"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/90 text-ink transition-colors duration-300 ease-luxury hover:bg-gold hover:text-white sm:right-8"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative h-[80vh] w-full max-w-5xl"
        >
          <Image
            src={gallery[activeIndex]}
            alt={`${caseStudy.companyName} gallery image ${activeIndex + 1}`}
            fill
            sizes="(min-width: 1024px) 1024px, 90vw"
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="gallery" className="flex scroll-mt-4 flex-col gap-4 py-6 sm:gap-5 sm:py-8 lg:py-8">
      <FadeIn direction="none" duration={0.5}>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">
          A Closer Look
        </span>
      </FadeIn>

      <div
        className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {gallery.map((src, index) => (
          <button
            key={src + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open gallery image ${index + 1}`}
            className="group/gallery relative h-56 w-[72vw] shrink-0 overflow-hidden rounded-2xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:h-64 sm:w-[380px] lg:w-auto"
            style={{ scrollSnapAlign: "start" }}
          >
            <PortfolioImage
              src={src}
              alt={`${caseStudy.companyName} gallery image ${index + 1}`}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 380px, 72vw"
              className="object-cover transition-transform duration-500 ease-luxury group-hover/gallery:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 ease-luxury group-hover/gallery:bg-black/40 group-hover/gallery:opacity-100">
              <ZoomIn className="text-white" size={20} />
            </span>
          </button>
        ))}
      </div>

      {mounted && lightbox && createPortal(lightbox, document.body)}
    </section>
  );
}
