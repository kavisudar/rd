import FadeIn from "@/components/animations/FadeIn";
import { parseChallenge } from "@/lib/caseStudy";

export default function ChallengeSection({ caseStudy }) {
  const { headline, points } = parseChallenge(caseStudy.challenge);

  return (
    <section className="relative w-full bg-bg-secondary py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <FadeIn direction="none" duration={0.6}>
          <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">
            The Challenge
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.1} duration={0.7} className="mt-6 max-w-4xl">
          <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {headline}.
          </p>
        </FadeIn>

        {points.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:mt-20 sm:grid-cols-2">
            {points.map((point, index) => (
              <FadeIn
                key={point}
                direction="up"
                delay={0.1 + index * 0.08}
                duration={0.6}
                className="flex gap-5 border-t border-border pt-5"
              >
                <span className="font-display text-sm text-text-muted">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{point}</p>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
