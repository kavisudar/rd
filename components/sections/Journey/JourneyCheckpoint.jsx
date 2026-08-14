"use client";

import { useCallback, useRef } from "react";
import JourneyIcon from "./JourneyIcon";

/**
 * One glass checkpoint marker on the mountain. Positioned absolutely via
 * `point` (0-100 coords shared with the SVG trail in journeyPoints.js).
 *
 * hooks/useJourneyAnimation.js owns the entrance choreography (circle scale
 * 0 -> 1, glow pulse, count-up text) via the data-checkpoint-* attributes
 * below, writing transforms/text directly as GSAP inline styles onto
 * `data-checkpoint-circle` and `data-checkpoint-count`. Every hover effect
 * (scale 1.08, extra glow, icon rotate, tooltip) therefore lives on plain
 * CSS/group-hover one level below `data-checkpoint-circle`, never on it -
 * same reasoning as ServiceCard: inline GSAP transforms always win over a
 * stylesheet rule, so mixing the two on one node means the hover effect
 * would silently never apply once GSAP has written to that node.
 *
 * The soft cursor-following light is plain CSS driven by two custom
 * properties updated straight off the mouse event (no React state), so
 * mouse movement never triggers a re-render.
 */
export default function JourneyCheckpoint({ checkpoint, point, index }) {
  const { icon, value, suffix, title, description, summit } = checkpoint;
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((event) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = event.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div
      data-checkpoint
      data-checkpoint-index={index}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      <div onMouseMove={handleMouseMove} className="group/checkpoint relative flex flex-col items-center">
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 z-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/checkpoint:opacity-100"
          style={{
            background: "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(103,232,249,0.35), transparent 65%)",
          }}
        />

        <div
          data-checkpoint-glow
          aria-hidden="true"
          className={`absolute z-0 rounded-full blur-md transition-transform duration-300 ease-out group-hover/checkpoint:scale-125 ${
            summit
              ? "h-16 w-16 bg-linear-to-br from-amber-300/60 to-fuchsia-400/40 sm:h-20 sm:w-20"
              : "h-11 w-11 bg-linear-to-br from-cyan-400/50 to-purple-500/40 sm:h-14 sm:w-14"
          }`}
        />

        <div data-checkpoint-circle className="relative z-10" style={{ opacity: 0, transform: "scale(0)" }}>
          <div
            data-checkpoint-icon
            className={`grid place-items-center rounded-full border border-border bg-white/70 text-cyan-600 shadow-[0_8px_30px_rgba(34,211,238,0.2)] backdrop-blur-md transition-transform duration-300 ease-out will-change-transform group-hover/checkpoint:scale-[1.08] group-hover/checkpoint:rotate-6 group-hover/checkpoint:text-amber-600 group-hover/checkpoint:shadow-[0_8px_36px_rgba(251,191,36,0.35)] ${
              summit ? "h-16 w-16 sm:h-20 sm:w-20" : "h-11 w-11 sm:h-14 sm:w-14"
            }`}
          >
            <JourneyIcon name={icon} className={summit ? "h-7 w-7 sm:h-8 sm:w-8" : "h-5 w-5 sm:h-6 sm:w-6"} />
          </div>
        </div>

        <div className="pointer-events-none relative z-10 mt-2 flex flex-col items-center gap-0.5 text-center">
          <span className="font-display text-sm font-semibold tabular-nums text-ink sm:text-base">
            <span data-checkpoint-count data-checkpoint-value={value}>0</span>
            {suffix}
          </span>
          <span className="hidden max-w-28 text-[10px] font-medium uppercase tracking-wider text-text-secondary sm:block">
            {title}
          </span>
        </div>

        <div
          data-checkpoint-tooltip
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-48 -translate-x-1/2 translate-y-1 rounded-2xl border border-border bg-white/90 px-4 py-3 text-center opacity-0 shadow-[0_20px_45px_rgba(79,70,229,0.18)] backdrop-blur-xl transition-all duration-300 ease-out group-hover/checkpoint:translate-y-0 group-hover/checkpoint:opacity-100"
        >
          <span className="block font-display text-sm font-semibold text-ink">{title}</span>
          <span className="mt-1 block text-xs leading-snug text-text-secondary">{description}</span>
        </div>
      </div>
    </div>
  );
}
