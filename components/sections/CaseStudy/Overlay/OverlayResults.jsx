import FadeIn from "@/components/animations/FadeIn";
import Counter from "@/components/animations/Counter";

export default function OverlayResults({ caseStudy }) {
  return (
    <section id="results" className="scroll-mt-4 py-6 sm:py-8 lg:py-8">
      <FadeIn direction="none" duration={0.5}>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">
          Results
        </span>
      </FadeIn>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-4">
        {caseStudy.results.map((result, index) => (
          <FadeIn
            key={result.label}
            direction="up"
            delay={index * 0.06}
            duration={0.45}
            className="flex flex-col gap-1.5 rounded-2xl border border-border bg-card/50 p-5"
          >
            <Counter
              value={result.value}
              prefix={result.prefix}
              suffix={result.suffix}
              className="font-display text-2xl text-gold sm:text-3xl"
            />
            <p className="text-xs leading-snug text-text-secondary">{result.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
