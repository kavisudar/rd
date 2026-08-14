"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import useReducedMotion from "./useReducedMotion";

/**
 * Drives the ServicesSection markup via its data-services-… / data-service-…
 * attributes.
 *
 * The pin + horizontal scrub is gated ONLY by viewport width via
 * `gsap.matchMedia("(min-width: 768px)")` - never by prefers-reduced-motion.
 * (An earlier version also gated the CSS grid/track layout behind
 * `motion-safe:`, so reduced-motion collapsed the whole desktop layout to a
 * single column - the "cards under the text" bug. Layout is now pure CSS by
 * width alone; `reduced` here only trims the decorative per-card fade/scale
 * flourish below, since the position scrub itself is user-driven, not
 * autoplaying, motion.)
 *
 * md and up: the whole section pins full height while the right-hand track
 * slides horizontally so exactly one card fills that column at a time.
 * ServicesSection sizes the track/cards via a `--card-count` CSS variable
 * (`calc(var(--card-count) * 100%)` / `calc(100% / var(--card-count))`), so
 * the total horizontal travel is always a clean `xPercent: -100 * (count -
 * 1) / count` - no per-card pixel widths are measured here.
 *
 * Each card additionally gets its own scrubbed timeline tied to that same
 * pin animation via `containerAnimation` (GSAP's documented mechanism for
 * per-item triggers inside a horizontal-scroll container): as a card's left
 * edge crosses in from the right it fades/slides/scales up to "active"
 * size, and as it's pushed out past the left edge it eases back down to a
 * slightly smaller "inactive" size. The first/last cards only get the half
 * of that lifecycle that's actually reachable (card 1 has no "enter" phase,
 * card N has no "exit" phase) so the left column stays perfectly still from
 * the moment the section pins until the last card has fully arrived.
 *
 * Below md, the matchMedia query never matches, so the section renders as
 * the plain vertical stack described in ServicesSection - no pin, no
 * horizontal scroll.
 *
 * scrub is a smoothing duration, not `true`: with `scrub: true` the track
 * maps 1:1 to raw scroll position, so one hard flick can carry the virtual
 * scroll straight through the whole pin distance in fewer frames than the
 * eye can register, which reads as the section being skipped rather than
 * glided through. A short scrub duration makes GSAP ease toward the scroll
 * position over a fraction of a second regardless of input speed.
 */
export function useServicesAnimation(sectionRef) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const eyebrow = section.querySelector("[data-services-eyebrow]");
    const heading = section.querySelector("[data-services-heading]");
    const description = section.querySelector("[data-services-description]");
    const link = section.querySelector("[data-services-link]");
    const viewport = section.querySelector("[data-services-viewport]");
    const track = section.querySelector("[data-services-track]");
    const counter = section.querySelector("[data-services-counter-current]");
    const progressFill = section.querySelector("[data-services-progress-fill]");
    const cards = Array.from(section.querySelectorAll("[data-service-card]"));
    const introTargets = [eyebrow, heading, description, link].filter(Boolean);

    if (reduced) {
      gsap.set(introTargets, { opacity: 1, y: 0 });
    } else {
      gsap.set(introTargets, { opacity: 0, y: 28 });
    }

    const introTween = reduced
      ? null
      : gsap.to(introTargets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 75%" },
        });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!viewport || !track || cards.length === 0) return undefined;

      const count = cards.length;
      const shiftXPercent = (-100 * (count - 1)) / count;
      const getDistance = () => Math.max(viewport.clientWidth * (count - 1), 0);

      const pinTween = gsap.to(track, {
        xPercent: shiftXPercent,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const active = Math.min(count, Math.round(self.progress * (count - 1)) + 1);
            if (counter) counter.textContent = String(active).padStart(2, "0");
            if (progressFill) progressFill.style.width = `${(active / count) * 100}%`;
          },
        },
      });

      const cardTimelines = cards
        .map((card, index) => {
          const image = card.querySelector("[data-service-image]");
          const isFirst = index === 0;
          const isLast = index === count - 1;

          if (reduced) {
            gsap.set(card, { opacity: 1, x: 0, scale: 1 });
            if (image) gsap.set(image, { scale: 1 });
            return null;
          }

          gsap.set(card, {
            opacity: isFirst ? 1 : 0,
            x: isFirst ? 0 : 100,
            scale: isFirst ? 1 : 0.95,
          });
          if (image) gsap.set(image, { scale: 1.15 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: pinTween,
              start: isFirst ? "left 0%" : "left 100%",
              end: isLast ? "left 0%" : "right 0%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          if (!isFirst) {
            tl.fromTo(
              card,
              { opacity: 0, x: 100, scale: 0.95 },
              { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
              0,
            );
            if (image) tl.to(image, { scale: 1, duration: 1, ease: "power3.out" }, 0);
          }

          if (!isLast) {
            tl.to(card, { opacity: 0.45, scale: 0.92, duration: 1, ease: "power2.in" }, isFirst ? 0 : 1);
            if (image) tl.to(image, { scale: 1.15, duration: 1, ease: "power2.in" }, isFirst ? 0 : 1);
          }

          return tl;
        })
        .filter(Boolean);

      return () => {
        pinTween.scrollTrigger?.kill();
        pinTween.kill();
        cardTimelines.forEach((tl) => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      };
    });

    return () => {
      introTween?.scrollTrigger?.kill();
      introTween?.kill();
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [sectionRef, reduced]);
}

export default useServicesAnimation;
