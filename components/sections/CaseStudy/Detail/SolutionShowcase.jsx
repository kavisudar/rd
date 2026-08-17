import FadeIn from "@/components/animations/FadeIn";
import PortfolioImage from "@/components/ui/PortfolioImage";
import { firstSentence } from "@/lib/caseStudy";

export default function SolutionShowcase({ caseStudy }) {
  const quote = firstSentence(caseStudy.solution);

  return (
    <section className="relative w-full overflow-hidden bg-bg-secondary py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <FadeIn direction="none" duration={0.6}>
          <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">
            The Solution
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.1} duration={0.7} className="mt-6 max-w-4xl">
          <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {quote}
          </p>
        </FadeIn>
      </div>

      <FadeIn
        direction="scale"
        delay={0.15}
        duration={0.8}
        amount={0.2}
        className="relative mt-14 h-[60vh] w-full sm:mt-16 sm:h-[70vh]"
      >
        <PortfolioImage src={caseStudy.solutionImage} alt="" sizes="100vw" className="object-cover" />
      </FadeIn>
    </section>
  );
}
