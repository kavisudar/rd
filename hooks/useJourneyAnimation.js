"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import useReducedMotion from "./useReducedMotion";
import { CHECKPOINT_POINTS, getCumulativeFractions } from "@/components/sections/Journey/journeyPoints";

function formatCount(value) {
  return Math.round(value).toLocaleString();
}

function spawnConfetti(root) {
  if (!root) return;
  const colors = ["#fbbf24", "#22d3ee", "#a78bfa", "#f472b6", "#34d399"];

  Array.from({ length: 26 }).forEach(() => {
    const el = document.createElement("span");
    el.style.position = "absolute";
    el.style.left = "0";
    el.style.top = "0";
    el.style.width = `${3 + Math.random() * 4}px`;
    el.style.height = `${6 + Math.random() * 6}px`;
    el.style.borderRadius = "1px";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.willChange = "transform, opacity";
    root.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 80;
    gsap.set(el, { x: 0, y: 0, opacity: 1, rotate: 0 });
    gsap
      .timeline({ onComplete: () => el.remove() })
      .to(el, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance * 0.6 - 18,
        rotate: gsap.utils.random(-260, 260),
        duration: 0.5 + Math.random() * 0.4,
        ease: "power2.out",
      })
      .to(el, { y: "+=90", opacity: 0, duration: 0.7, ease: "power1.in" }, ">-0.1");
  });
}

/**
 * Drives the Journey mountain via its data-journey-* / data-checkpoint-*
 * attributes: a one-shot GSAP timeline (ScrollTrigger `once: true`, no
 * scrub - this is a cinematic reveal, not a scroll-scrubbed pin like
 * Services) that fades in the mountain, draws the ascent trail, then walks
 * checkpoint-by-checkpoint with a glowing dot traveling the path between
 * them via MotionPathPlugin, ending in the summit flag/confetti finale.
 *
 * Checkpoint hover (path-segment highlight) is wired independently of the
 * `reduced` branch below since it's user-driven interaction, not autoplay.
 *
 * `getCumulativeFractions` gives each checkpoint's exact position along the
 * path as a 0-1 fraction of total length, computed from the same straight-
 * line vertices the `d` string is built from - so MotionPathPlugin's
 * start/end and the hover highlight's stroke-dasharray math both line up
 * with the actually-rendered path with no runtime sampling required.
 */
export function useJourneyAnimation(sectionRef) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mountain = section.querySelector("[data-journey-mountain]");
    const bgGlow = section.querySelector("[data-journey-bg-glow]");
    const pathEl = section.querySelector("[data-journey-path]");
    const pathGlowEl = section.querySelector("[data-journey-path-glow]");
    const pathHighlightEl = section.querySelector("[data-journey-path-highlight]");
    const travelDot = section.querySelector("[data-journey-travel-dot]");
    const sunEl = section.querySelector("[data-journey-sun]");
    const goldenWash = section.querySelector("[data-journey-golden-wash]");
    const flagGroup = section.querySelector("[data-journey-flag]");
    const flagCloth = section.querySelector("[data-journey-flag-cloth]");
    const confettiRoot = section.querySelector("[data-journey-confetti-root]");
    const checkpoints = Array.from(section.querySelectorAll("[data-checkpoint]"));

    if (!mountain || !pathEl || checkpoints.length === 0) return undefined;

    const circles = checkpoints.map((cp) => cp.querySelector("[data-checkpoint-circle]"));
    const glows = checkpoints.map((cp) => cp.querySelector("[data-checkpoint-glow]"));
    const countEls = checkpoints.map((cp) => cp.querySelector("[data-checkpoint-count]"));

    const fractions = getCumulativeFractions(CHECKPOINT_POINTS);
    const pathLength = pathEl.getTotalLength ? pathEl.getTotalLength() : 0;

    const dashTargets = [pathEl, pathGlowEl].filter(Boolean);
    gsap.set(dashTargets, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.set(circles.filter(Boolean), { opacity: 0, scale: 0 });
    gsap.set(glows.filter(Boolean), { opacity: 0 });
    gsap.set(mountain, { opacity: 0 });
    if (bgGlow) gsap.set(bgGlow, { opacity: 0 });
    if (flagGroup) gsap.set(flagGroup, { opacity: 0, y: 6, scale: 0.85 });
    if (sunEl) gsap.set(sunEl, { opacity: 0 });
    if (goldenWash) gsap.set(goldenWash, { opacity: 0 });

    let tl = null;

    if (reduced) {
      gsap.set(mountain, { opacity: 1 });
      if (bgGlow) gsap.set(bgGlow, { opacity: 1 });
      gsap.set(dashTargets, { strokeDashoffset: 0 });
      gsap.set(circles.filter(Boolean), { opacity: 1, scale: 1 });
      gsap.set(glows.filter(Boolean), { opacity: 1 });
      countEls.forEach((el) => {
        if (el) el.textContent = formatCount(Number(el.dataset.checkpointValue) || 0);
      });
      if (flagGroup) gsap.set(flagGroup, { opacity: 1, y: 0, scale: 1 });
      if (sunEl) gsap.set(sunEl, { opacity: 1 });
      if (goldenWash) gsap.set(goldenWash, { opacity: 0.4 });
    } else {
      tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });

      tl.to(mountain, { opacity: 1, duration: 1.2 }, 0);
      if (bgGlow) tl.to(bgGlow, { opacity: 1, duration: 1.5 }, 0);
      if (dashTargets.length) {
        tl.to(dashTargets, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.35);
      }

      checkpoints.forEach((cp, i) => {
        const circle = circles[i];
        const glow = glows[i];
        const countEl = countEls[i];
        const targetValue = countEl ? Number(countEl.dataset.checkpointValue) || 0 : 0;
        const counterProxy = { val: 0 };
        const stepLabel = `cp${i}`;

        tl.addLabel(stepLabel, i === 0 ? ">-0.3" : "+=0.15");

        if (i > 0 && travelDot && pathLength) {
          tl.set(travelDot, { opacity: 1 }, stepLabel)
            .to(
              travelDot,
              {
                motionPath: {
                  path: pathEl,
                  start: fractions[i - 1],
                  end: fractions[i],
                  align: pathEl,
                  alignOrigin: [0.5, 0.5],
                },
                duration: 0.45,
                ease: "power1.inOut",
              },
              stepLabel,
            )
            .to(travelDot, { opacity: 0, duration: 0.2 }, ">-0.05");
        }

        if (circle) {
          tl.to(circle, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(2.2)" }, i === 0 ? stepLabel : ">-0.1");
        }
        if (glow) tl.to(glow, { opacity: 1, duration: 0.35 }, "<");
        if (countEl) {
          tl.to(
            counterProxy,
            {
              val: targetValue,
              duration: 0.85,
              ease: "power2.out",
              onUpdate: () => {
                countEl.textContent = formatCount(counterProxy.val);
              },
            },
            "<",
          );
        }
      });

      if (flagGroup) {
        tl.to(flagGroup, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" }, ">-0.1");
      }
      if (sunEl) tl.to(sunEl, { opacity: 1, duration: 0.9 }, "<");
      if (goldenWash) tl.to(goldenWash, { opacity: 0.4, duration: 1.1 }, "<");
      tl.add(() => {
        spawnConfetti(confettiRoot);
        flagCloth?.classList.add("animate-[journey-flag-wave_2.6s_ease-in-out_infinite]");
      }, "<+0.1");
    }

    // Hover: highlight the path segment leading into the hovered checkpoint.
    // User-driven, so this stays live regardless of `reduced`.
    const onEnter = (event) => {
      if (!pathHighlightEl || !pathLength) return;
      const idx = Number(event.currentTarget.dataset.checkpointIndex);
      if (!Number.isFinite(idx) || idx <= 0) return;

      const segStart = fractions[idx - 1] * pathLength;
      const segEnd = fractions[idx] * pathLength;
      gsap.set(pathHighlightEl, {
        strokeDasharray: `${segEnd - segStart} ${pathLength - (segEnd - segStart)}`,
        strokeDashoffset: -segStart,
      });
      gsap.to(pathHighlightEl, { opacity: 1, duration: 0.3, overwrite: true });
    };
    const onLeave = () => {
      if (pathHighlightEl) gsap.to(pathHighlightEl, { opacity: 0, duration: 0.3, overwrite: true });
    };

    checkpoints.forEach((cp) => {
      cp.addEventListener("mouseenter", onEnter);
      cp.addEventListener("mouseleave", onLeave);
    });

    return () => {
      checkpoints.forEach((cp) => {
        cp.removeEventListener("mouseenter", onEnter);
        cp.removeEventListener("mouseleave", onLeave);
      });
      tl?.scrollTrigger?.kill();
      tl?.kill();
      gsap.killTweensOf(
        [mountain, bgGlow, pathEl, pathGlowEl, pathHighlightEl, travelDot, sunEl, goldenWash, flagGroup, ...circles, ...glows].filter(
          Boolean,
        ),
      );
      ScrollTrigger.refresh();
    };
  }, [sectionRef, reduced]);
}

export default useJourneyAnimation;
