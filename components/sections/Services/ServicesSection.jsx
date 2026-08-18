"use client";

import { useRef } from "react";
import { services } from "@/data/services";
import { useServicesAnimation } from "@/hooks/useServicesAnimation";
import ServiceCard from "./ServiceCard";

/**
 * Two-column services gallery. The 50/50 split below is a plain CSS Grid
 * gated only by the `md:` width breakpoint - it is NEVER combined with a
 * `motion-safe:`/`motion-reduce:` variant, because that combination is what
 * previously caused the whole grid to collapse to a single (mobile) column
 * whenever the OS/browser reported prefers-reduced-motion, regardless of
 * viewport width. Width alone decides the layout; hooks/useServicesAnimation.js
 * decides, independently, how much of the pin/scroll choreography to run.
 *
 * md and up: left column (eyebrow, heading, description, CTA, progress
 * accent) sits in column 1 and never moves; the right column (column 2)
 * holds the horizontal card track. useServicesAnimation pins the whole
 * section and scrubs the track via GSAP ScrollTrigger + xPercent so exactly
 * one card fills the right half at a time.
 *
 * Below md, the grid collapses to a single column (`grid-cols-1`) and the
 * track's `md:` overrides never apply, so it renders as a plain vertical
 * flex list - no pin, no horizontal scroll, exactly per spec.
 *
 * `--card-count` is set once here and read by the track/card width via
 * `calc(var(--card-count) * 100%)` / `calc(100% / var(--card-count))` -
 * this keeps those Tailwind arbitrary-value classes static strings (so the
 * JIT compiler picks them up) while the actual count is injected at runtime
 * purely through the CSS custom property, no per-card inline sizing needed.
 */
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const count = services.length;

  useServicesAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      style={{ "--card-count": count }}
      className="relative w-full bg-bg py-24 md:h-screen md:overflow-hidden md:py-0"
    >
      <div className="mx-auto grid h-full max-w-[1800px] grid-cols-1 gap-14 px-6 sm:px-8 md:grid-cols-2 md:gap-0 md:px-0">
        {/* LEFT — column 1, pinned by the section-level ScrollTrigger, never moves */}
        <div className="flex flex-col justify-center gap-7 py-4 md:h-full md:px-10 md:py-0 lg:px-16 xl:px-24">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
            <span
              data-services-eyebrow
              className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold"
            >
              Services
            </span>
          </div>

          <h2
            id="services-heading"
            data-services-heading
            className="font-display text-4xl font-semibold tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            We build premium
            <br />
            digital experiences.
          </h2>

          <p
            data-services-description
            className="max-w-md text-lg font-medium leading-relaxed text-black sm:text-xl"
          >
            From pixel-perfect interfaces to full-stack development and growth
            marketing — Raga Designers turns ideas into digital products that
            perform.
          </p>

          <a
            data-services-link
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-widest text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="relative">
              Start Your Project
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left bg-ink/20 transition-colors duration-300 ease-out group-hover:bg-gold" />
            </span>
            <span
              aria-hidden="true"
              className="inline-block text-gold transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          <div className="mt-6 hidden items-center gap-4 md:flex">
            <span className="font-display text-sm tabular-nums text-ink">
              <span data-services-counter-current>01</span>
              <span className="text-text-muted"> / {String(count).padStart(2, "0")}</span>
            </span>
            <span className="h-px flex-1 bg-border">
              <span
                data-services-progress-fill
                className="block h-px bg-gold transition-[width] duration-100 ease-out"
                style={{ width: `${(1 / count) * 100}%` }}
              />
            </span>
          </div>
        </div>

        {/* RIGHT — column 2, ONLY the service cards. md+: horizontal GSAP track. Below md: plain vertical stack. */}
        <div data-services-viewport className="relative overflow-hidden md:h-full md:py-10 lg:py-14">
          <div
            data-services-track
            className="flex h-full flex-col gap-8 pb-4 md:w-[calc(var(--card-count)*100%)] md:flex-row md:gap-0 md:pb-0"
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                data-service-card
                className="w-full shrink-0 md:h-full md:w-[calc(100%/var(--card-count))] md:px-3 lg:px-5"
              >
                <ServiceCard service={service} index={index} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
