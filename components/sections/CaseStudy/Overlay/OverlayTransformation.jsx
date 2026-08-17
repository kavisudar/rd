import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import PortfolioImage from "@/components/ui/PortfolioImage";
import { parseChallenge, firstSentence } from "@/lib/caseStudy";

export default function OverlayTransformation({ caseStudy }) {
  const { headline } = parseChallenge(caseStudy.challenge);
  const caption = firstSentence(caseStudy.solution);

  return (
    <section id="solution" className="relative flex scroll-mt-4 flex-col gap-6 py-6 sm:py-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:py-8">
      <FadeIn
        direction="up"
        duration={0.5}
        className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-bg-secondary/50 p-6"
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted sm:text-xs">Before</span>
        <p className="font-display text-lg leading-[1.25] text-text-secondary sm:text-xl">{headline}.</p>
      </FadeIn>

      <span
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-white shadow-lg lg:flex"
        aria-hidden="true"
      >
        <ArrowRight size={18} />
      </span>

      <FadeIn direction="up" delay={0.1} duration={0.5} className="flex flex-col gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">After</span>
        {caseStudy.solutionImage ? (
          <div className="group relative h-64 w-full overflow-hidden rounded-2xl border border-border shadow-card sm:h-80 lg:h-[26rem]">
            <PortfolioImage
              src={caseStudy.solutionImage}
              alt={`${caseStudy.companyName} solution`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-4">
              <p className="text-sm leading-relaxed text-white/90">{caption}</p>
            </div>
          </div>
        ) : (
          <div className="flex h-64 w-full flex-col justify-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 p-6 sm:h-80 lg:h-[26rem]">
            <p className="font-display text-lg leading-[1.25] text-ink sm:text-xl">{caption}</p>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
