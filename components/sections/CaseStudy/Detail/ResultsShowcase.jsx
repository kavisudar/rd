import FadeIn from "@/components/animations/FadeIn";
import RevealText from "@/components/animations/RevealText";
import Counter from "@/components/animations/Counter";

export default function ResultsShowcase({ caseStudy }) {
  return (
    <section className="relative w-full bg-ink py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <RevealText
          as="h2"
          text="The Impact"
          className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        />

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudy.results.map((result, index) => (
            <FadeIn
              key={result.label}
              direction="up"
              delay={index * 0.08}
              duration={0.6}
              className="flex flex-col gap-3 border-t border-white/15 pt-6"
            >
              <Counter
                value={result.value}
                prefix={result.prefix}
                suffix={result.suffix}
                className="font-display text-4xl text-brand-gold sm:text-5xl"
              />
              <p className="text-sm uppercase tracking-widest text-white/60 sm:text-[13px]">{result.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
