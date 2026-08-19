"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * The office reception photo as a cinematic panel, with the brand mark
 * floating on top like a physical object docked into the space rather than
 * a decorative icon animation.
 */
export default function HeroVisual() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -84]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(201,161,74,0.16),transparent_70%)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/50 shadow-card-hover sm:rounded-[36px]"
      >
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? undefined : { scale: imageScale, y: imageY }}
        >
          <Image
            src="/assets/images/office.jpeg"
            alt="Raga Designers' reception area at our Chennai studio"
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Grounding gradient - keeps the office recognizable, only darkens the base */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/50 via-ink/5 to-transparent" />
        {/* Warm brand tint, echoing the pendant lights */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-gold/15 via-transparent to-gold/10 mix-blend-overlay" />
        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_9vw_2vw_rgba(17,24,39,0.3)]" />
        {/* Film grain, same recipe as the global body texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/25 sm:rounded-[36px]" />

        <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/90 sm:text-[11px]">
            Our Studio · Chennai
          </span>
        </div>
      </motion.div>

      {/* Brand presence card - floats over the space like it belongs there */}
      <motion.div
        className="absolute -top-6 right-6 sm:-top-8 sm:right-10"
        style={prefersReducedMotion ? undefined : { y: cardY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1 }}
          className="glass flex h-20 w-20 items-center justify-center rounded-3xl p-3.5 shadow-glass-lift sm:h-24 sm:w-24"
        >
          <div
            className="relative h-full w-full motion-safe:animate-[float-drift_6s_ease-in-out_infinite]"
            style={{ "--drift-x": "0px", "--drift-y": "-6px" }}
          >
            <Image
              src="/assets/images/rd-mark.png"
              alt="Raga Designers"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
