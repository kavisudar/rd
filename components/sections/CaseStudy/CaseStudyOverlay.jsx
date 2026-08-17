"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLenis } from "@/lib/lenis-context";
import { ScrollContainerContext, FooterSlotContext } from "@/components/sections/CaseStudy/Overlay/scrollContext";

export default function CaseStudyOverlay({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const scrollRef = useRef(null);
  const footerSlotRef = useRef(null);
  const initialPathRef = useRef(pathname);

  // Next passes the `@casestudy` slot as a React *element* reference (e.g.
  // `<Default/>`), which is always a truthy object regardless of whether it
  // renders to null - so open/closed can't be read off `children` itself.
  // The interception only ever activates via a client-side transition, so a
  // pathname that matches `/case-studies/[slug]` on the very first render
  // means the real standalone page was hard-loaded there (overlay must stay
  // closed); only a pathname that CHANGES into that shape after mount is a
  // genuine soft-nav interception.
  const isOpen = pathname.startsWith("/case-studies/") && pathname !== initialPathRef.current;

  const [cached, setCached] = useState(isOpen ? children : null);
  const [cachedPath, setCachedPath] = useState(pathname);

  useEffect(() => {
    if (isOpen) {
      setCached(children);
      setCachedPath(pathname);
    }
  }, [isOpen, children, pathname]);

  const close = () => router.back();

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, lenis]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [cachedPath]);

  return (
    <AnimatePresence onExitComplete={() => setCached(null)}>
      {isOpen && (
        <motion.div
          key="case-study-backdrop"
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-ink/50 p-0 backdrop-blur-2xl sm:p-6 lg:p-10"
          style={{ position: "fixed", zIndex: 100 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={close}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <span className="aurora-blob -left-32 -top-32 h-96 w-96 bg-gold/25" />
            <span className="aurora-blob -bottom-40 -right-24 h-[28rem] w-[28rem] bg-gold-light/20" />
            <span className="aurora-blob left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 bg-brand-gold/10" />
            <div
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative h-full w-full sm:h-[min(92vh,880px)] sm:w-[min(94vw,1120px)]"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Case study"
              className="relative flex h-full w-full flex-col overflow-hidden border border-white/50 bg-linear-to-b from-white/85 to-white/60 shadow-[0_30px_80px_-20px_rgba(79,70,229,0.4),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl sm:rounded-[32px]"
              style={{ WebkitBackdropFilter: "blur(40px) saturate(160%)", backdropFilter: "blur(40px) saturate(160%)" }}
            >
              <div
                className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
                aria-hidden="true"
              />

              <div
                ref={scrollRef}
                data-lenis-prevent
                className="relative flex-1 overflow-y-auto overscroll-contain"
              >
                <ScrollContainerContext.Provider value={scrollRef}>
                  <FooterSlotContext.Provider value={footerSlotRef}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={cachedPath}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {cached}
                      </motion.div>
                    </AnimatePresence>
                  </FooterSlotContext.Provider>
                </ScrollContainerContext.Provider>
              </div>

              <div ref={footerSlotRef} className="shrink-0" />
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close case study"
              className="group absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-ink shadow-lg backdrop-blur-xl transition-all duration-300 ease-luxury hover:scale-110 hover:rotate-90 hover:border-gold hover:bg-gold hover:text-white sm:-right-4 sm:-top-4"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
