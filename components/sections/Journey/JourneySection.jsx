"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import RevealText from "@/components/animations/RevealText";
import journeyData from "@/data/journey.json";
import { useJourneyAnimation } from "@/hooks/useJourneyAnimation";
import MountainScene from "./MountainScene";
import JourneyCheckpoint from "./JourneyCheckpoint";
import JourneyIcon from "./JourneyIcon";
import { CHECKPOINT_POINTS } from "./journeyPoints";

/**
 * Deterministic (not Math.random()) star field so server and client render
 * the same markup - a low-discrepancy sequence via the golden-angle
 * constant spreads points evenly without any two looking obviously aligned.
 */
function buildStarField(count) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: (i * 137.508) % 100,
    y: (i * 71.317) % 68,
    size: 1 + ((i * 13) % 3) * 0.5,
    duration: 2.4 + ((i * 7) % 5),
    delay: (i * 0.37) % 4,
  }));
}

const STARS = buildStarField(50);
const SUMMIT_POINT = CHECKPOINT_POINTS[CHECKPOINT_POINTS.length - 1];

export default function JourneySection() {
  const sectionRef = useRef(null);
  useJourneyAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-labelledby="journey-heading"
      className="relative w-full overflow-hidden bg-[#eef2ff] py-28 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f5f3ff_0%,#eef2ff_55%,#e0eaff_100%)]" />

        <div className="absolute inset-0">
          {STARS.map((s) => (
            <span
              key={s.id}
              className="absolute rounded-full bg-gold-light/70"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                animation: `journey-star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="absolute -left-24 top-10 h-72 w-72 animate-[journey-orb-pulse_9s_ease-in-out_infinite] rounded-full bg-purple-500/20 blur-[100px]" />
        <div
          className="absolute -right-16 top-1/3 h-80 w-80 animate-[journey-orb-pulse_11s_ease-in-out_infinite] rounded-full bg-cyan-400/20 blur-[110px]"
          style={{ animationDelay: "2s" }}
        />

        {/* GSAP fades this wrapper in on entrance; the pulse inside is a
            separate element so the two never fight over `opacity`. */}
        <div data-journey-bg-glow className="absolute inset-x-0 bottom-0 top-1/4">
          <div className="mx-auto h-full w-full max-w-4xl animate-[journey-orb-pulse_8s_ease-in-out_infinite] rounded-full bg-indigo-400/10 blur-[120px]" />
        </div>

        <div className="absolute left-[8%] top-[18%] h-10 w-40 animate-[journey-cloud-drift_22s_ease-in-out_infinite_alternate] rounded-full bg-white/60 blur-2xl" />
        <div
          className="absolute left-[55%] top-[10%] h-8 w-56 animate-[journey-cloud-drift_28s_ease-in-out_infinite_alternate] rounded-full bg-white/60 blur-2xl"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute left-[30%] top-[26%] h-6 w-32 animate-[journey-cloud-drift_18s_ease-in-out_infinite_alternate] rounded-full bg-white/60 blur-xl"
          style={{ animationDelay: "6s", "--cloud-drift": "40px" }}
        />

        <div className="absolute inset-x-0 bottom-0 h-40 animate-[journey-fog-sway_14s_ease-in-out_infinite] bg-linear-to-t from-cyan-400/15 via-white/40 to-transparent blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-350 px-6 sm:px-8">
        <div className="flex flex-col items-center gap-5 text-center mb-50">
          <FadeIn direction="none" duration={0.6}>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-600">Our Process</span>
          </FadeIn>
          <RevealText
            as="h2"
            id="journey-heading"
            text="Climbing Higher Every Year"
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          />
          <FadeIn direction="up" delay={0.15} duration={0.7}>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              &ldquo;Every milestone reflects our dedication to innovation, customer trust, and sustainable
              business growth.&rdquo;
            </p>
          </FadeIn>
        </div>

        {/* Desktop/tablet mountain scene - width-gated only, never combined
            with a motion-preference variant (see useJourneyAnimation for why). */}
        <div className="relative mx-auto mt-20 hidden aspect-square w-full max-w-160 md:block lg:mt-24 lg:max-w-190">
          <MountainScene />
          <div
            data-journey-confetti-root
            className="absolute h-0 w-0"
            style={{ left: `${SUMMIT_POINT.x}%`, top: `${SUMMIT_POINT.y}%` }}
          />
          {journeyData.map((checkpoint, i) => (
            <JourneyCheckpoint key={checkpoint.id} checkpoint={checkpoint} point={CHECKPOINT_POINTS[i]} index={i} />
          ))}
        </div>

        {/* Mobile fallback: the diagonal mountain layout doesn't hold up at
            phone widths, so it collapses to a simple vertical timeline. */}
        <div className="mt-16 flex flex-col gap-5 md:hidden">
          {journeyData.map((checkpoint, i) => (
            <FadeIn key={checkpoint.id} direction="up" delay={i * 0.05} amount={0.3}>
              <div className="glass-panel flex items-start gap-4 p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-white/60 text-cyan-600">
                  <JourneyIcon name={checkpoint.icon} className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-display text-lg font-semibold text-ink">
                    {checkpoint.value.toLocaleString()}
                    {checkpoint.suffix}
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/90">{checkpoint.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">{checkpoint.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-8 text-center lg:mt-28">
          <FadeIn direction="up" amount={0.4}>
            <p className="font-display text-xl italic leading-snug text-ink/80 sm:text-2xl">
              &ldquo;The greatest achievements begin with a single step. Every milestone strengthens our vision
              for the future.&rdquo;
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.1} amount={0.4}>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(79,70,229,0.35)] transition-transform duration-300 ease-out hover:scale-105 hover:shadow-[0_10px_50px_rgba(56,189,248,0.45)]"
            >
              Explore Our Journey
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
