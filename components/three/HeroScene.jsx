"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

const RINGS = [
  { sizeVmin: 30, duration: 20, reverse: false, opacity: 0.35 },
  { sizeVmin: 38, duration: 28, reverse: true, opacity: 0.28 },
  { sizeVmin: 46, duration: 36, reverse: false, opacity: 0.2 },
];

const SPHERES = [
  { top: "14%", left: "22%", size: 16, opacity: 0.55, blur: false, duration: 8, delay: 0 },
  { top: "24%", left: "72%", size: 10, opacity: 0.4, blur: true, duration: 10, delay: 0.6 },
  { top: "38%", left: "12%", size: 8, opacity: 0.35, blur: true, duration: 9, delay: 1.2 },
  { top: "18%", left: "50%", size: 6, opacity: 0.45, blur: false, duration: 7, delay: 0.3 },
  { top: "58%", left: "18%", size: 14, opacity: 0.4, blur: true, duration: 11, delay: 0.9 },
  { top: "68%", left: "78%", size: 18, opacity: 0.3, blur: true, duration: 12, delay: 0.2 },
  { top: "78%", left: "40%", size: 9, opacity: 0.5, blur: false, duration: 8.5, delay: 1.5 },
  { top: "48%", left: "84%", size: 12, opacity: 0.45, blur: false, duration: 9.5, delay: 0.8 },
  { top: "84%", left: "60%", size: 7, opacity: 0.35, blur: true, duration: 10.5, delay: 1.1 },
  { top: "8%", left: "38%", size: 11, opacity: 0.4, blur: false, duration: 7.5, delay: 0.4 },
];

export default function HeroScene() {
  const stageRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 });

  const tiltX = useTransform(springY, [-1, 1], [7, -7]);
  const tiltY = useTransform(springX, [-1, 1], [-7, 7]);
  const glowLeft = useTransform(springX, [-1, 1], ["30%", "70%"]);
  const glowTop = useTransform(springY, [-1, 1], ["30%", "70%"]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMove = (e) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouseX.set(Math.max(-1, Math.min(1, dx)));
      mouseY.set(Math.max(-1, Math.min(1, dy)));
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={stageRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-center"
      >
        {/* Ambient glow behind the logo */}
        <div className="h-[80vmin] w-[80vmin] rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.32),rgba(124,58,237,0.16)_45%,transparent_72%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-[45vmin] w-[45vmin] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.28),transparent_70%)] blur-3xl" />

        {/* Cursor-follow glow */}
        <motion.div
          className="absolute h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            left: glowLeft,
            top: glowTop,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.28), rgba(6,182,212,0.14) 45%, transparent 72%)",
          }}
        />

        {/* Orbital rings */}
        <div className="absolute z-0 flex items-center justify-center">
          {RINGS.map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${ring.sizeVmin}vmin`,
                height: `${ring.sizeVmin}vmin`,
                padding: 1,
                background: `conic-gradient(from ${i * 60}deg, rgba(79,70,229,${ring.opacity}), rgba(6,182,212,${ring.opacity * 0.8}), rgba(124,58,237,${ring.opacity}), transparent 65%)`,
                WebkitMask: "radial-gradient(closest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
                mask: "radial-gradient(closest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
              }}
              animate={prefersReducedMotion ? undefined : { rotate: ring.reverse ? -360 : 360 }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        {/* Floating glass spheres */}
        {SPHERES.map((s, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full border border-white/40 bg-white/30 ${s.blur ? "blur-[2px]" : ""}`}
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              boxShadow: "0 0 10px rgba(255,255,255,0.5) inset, 0 2px 6px rgba(79,70,229,0.15)",
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -16, 0], x: [0, 6, 0] }
            }
            transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}

        {/* Tilt wrapper: responds to cursor position. Nudged toward the left
            portion of the orbital rings on desktop so the rings stay visible
            around it; centered on smaller breakpoints. */}
        <motion.div
          className="relative z-10 lg:-translate-x-[calc(12vmin+2.5rem)]"
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
        >
          {/* Glass panel: continuous float / breathe loop */}
          <motion.div
            className="relative flex h-55 w-55 items-center justify-center rounded-4xl border border-white/50 bg-white/25 sm:h-65 sm:w-[260px] lg:h-[300px] lg:w-[300px]"
            style={{
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              boxShadow:
                "0 24px 64px rgba(79,70,229,0.2), 0 8px 24px rgba(124,58,237,0.12), 0 1px 1px rgba(255,255,255,0.7) inset, 0 -1px 1px rgba(255,255,255,0.4) inset",
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -14, 0],
                    rotateX: [0, 3, 0, -3, 0],
                    rotateY: [0, -4, 0, 4, 0],
                    scale: [1, 1.03, 1, 1.03, 1],
                  }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-br from-white/45 via-transparent to-transparent" />
            <div className="relative h-[82%] w-[95%]">
              <Image
                src="/assets/images/rd-logo.png"
                alt="Raga Designers"
                fill
                sizes="200px"
                className="object-contain drop-shadow-[0_10px_28px_rgba(79,70,229,0.25)] rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
