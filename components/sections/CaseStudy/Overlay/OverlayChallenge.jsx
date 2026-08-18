import { Target } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { parseChallenge } from "@/lib/caseStudy";

export default function OverlayChallenge({ caseStudy }) {
  const { headline, points } = parseChallenge(caseStudy.challenge);
  const objectives = caseStudy.objectives ?? [];

  return (
    <section id="challenge" className="grid scroll-mt-4 grid-cols-1 gap-8 py-6 sm:gap-10 sm:py-8 lg:grid-cols-2 lg:py-8">
      <div className="flex flex-col gap-4">
        <FadeIn direction="none" duration={0.5}>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">
            The Challenge
          </span>
        </FadeIn>
        <FadeIn direction="up" delay={0.05} duration={0.5}>
          <p className="font-display text-xl leading-[1.2] tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
            {headline}.
          </p>
        </FadeIn>

        {points.length > 0 && (
          <div className="mt-1 flex flex-col gap-3">
            {points.map((point, index) => (
              <FadeIn
                key={point}
                direction="up"
                delay={0.08 + index * 0.06}
                duration={0.45}
                className="flex gap-4 border-t border-border/60 pt-3"
              >
                <span className="font-display text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-base font-medium leading-relaxed text-black">{point}</p>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {objectives.length > 0 && (
        <div className="flex flex-col gap-4">
          <FadeIn direction="none" duration={0.5} delay={0.05}>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">
              Objectives
            </span>
          </FadeIn>
          <div className="flex flex-col gap-3">
            {objectives.map((objective, index) => (
              <FadeIn
                key={objective}
                direction="up"
                delay={0.1 + index * 0.05}
                duration={0.45}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-3.5"
              >
                <Target className="mt-0.5 shrink-0 text-gold" size={16} strokeWidth={1.75} />
                <span className="text-base font-medium leading-relaxed text-black">{objective}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
