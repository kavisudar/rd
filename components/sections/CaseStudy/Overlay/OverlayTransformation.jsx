import { ArrowDown } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import PortfolioImage from "@/components/ui/PortfolioImage";
import { parseChallenge, firstSentence } from "@/lib/caseStudy";

export default function OverlayTransformation({ caseStudy }) {
  const { headline } = parseChallenge(caseStudy.challenge);
  const caption = firstSentence(caseStudy.solution);

  return (
    <section id="solution" className="flex scroll-mt-4 flex-col gap-5 py-6 sm:gap-6 sm:py-8 lg:py-8">
      <FadeIn
        direction="up"
        duration={0.5}
        className="flex w-full flex-col justify-center gap-3 rounded-2xl border border-border bg-bg-secondary/50 p-6"
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted sm:text-xs">Before</span>
        <p className="font-display text-lg leading-[1.25] text-text-secondary sm:text-xl">{headline}.</p>
      </FadeIn>

      <span
        className="pointer-events-none z-10 mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-white shadow-lg"
        aria-hidden="true"
      >
        <ArrowDown size={18} />
      </span>

      <FadeIn direction="up" delay={0.1} duration={0.5} className="mx-auto flex w-full max-w-[540px] flex-col gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">After</span>
        {caseStudy.solutionImage ? (
          <div className="group relative mx-auto aspect-[673/780] w-full max-w-[540px] overflow-hidden rounded-2xl border border-border bg-ink shadow-card">
            <PortfolioImage
              src={caseStudy.solutionImage}
              alt=""
              sizes="(min-width: 640px) 540px, 100vw"
              className="scale-110 object-cover opacity-60 blur-2xl"
            />
            <div className="absolute inset-0 bg-ink/40" />
            <PortfolioImage
              src={caseStudy.solutionImage}
              alt={`${caseStudy.companyName} solution`}
              sizes="(min-width: 640px) 540px, 100vw"
              className="object-contain transition-transform duration-700 ease-luxury group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-4">
              <p className="text-base font-medium leading-relaxed text-white/90">{caption}</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex aspect-[673/780] w-full max-w-[540px] flex-col justify-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <p className="font-display text-lg leading-[1.25] text-ink sm:text-xl">{caption}</p>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
