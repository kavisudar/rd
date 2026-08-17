"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioImage from "@/components/ui/PortfolioImage";

export default function GalleryShowcase({ caseStudy }) {
  const gallery = caseStudy.gallery ?? [];
  const [activeIndex, setActiveIndex] = useState(null);

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

  return (
    <section className="relative w-full bg-bg-secondary py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="A Closer Look" title="Project Gallery" />
      </div>

      <div
        className="mt-12 flex gap-5 overflow-x-auto px-6 pb-4 sm:mt-14 sm:gap-6 sm:px-8 [scrollbar-width:none] lg:px-12 [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {gallery.map((src, index) => (
          <button
            key={src + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open gallery image ${index + 1}`}
            className="group/gallery relative h-72 w-[85vw] shrink-0 overflow-hidden rounded-2xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:h-96 sm:w-[520px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <PortfolioImage
              src={src}
              alt={`${caseStudy.companyName} gallery image ${index + 1}`}
              sizes="(min-width: 640px) 520px, 85vw"
              className="object-cover transition-transform duration-500 ease-luxury group-hover/gallery:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 ease-luxury group-hover/gallery:bg-black/40 group-hover/gallery:opacity-100">
              <ZoomIn className="text-white" size={22} />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-6"
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
        )}
      </AnimatePresence>
    </section>
  );
}
