import FadeIn from "@/components/animations/FadeIn";
import RevealText from "@/components/animations/RevealText";
import Button from "@/components/ui/Button";
import DeviceShowcase from "../DeviceShowcase";

export default function OverlayHero({ caseStudy }) {
  const { companyName, projectTitle, industry, year, screenshot, deviceMockup, website, logo } = caseStudy;

  return (
    <section className="flex flex-col gap-6 px-5 pb-6 pt-6 sm:gap-7 sm:px-6 sm:pb-8 sm:pt-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-10 xl:px-12">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <FadeIn direction="none" duration={0.5} className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">
            Case Study
          </span>
          <span className="h-px flex-1 max-w-16 bg-border" aria-hidden="true" />
        </FadeIn>

        <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          <RevealText as="span" text={companyName} />
          <span className="text-gold">.</span>
        </h1>

        <FadeIn direction="up" delay={0.1} duration={0.5}>
          <p className="max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">{projectTitle}</p>
        </FadeIn>

        <FadeIn direction="up" delay={0.15} duration={0.5} className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs text-ink">
            <span className="text-text-muted">Industry</span>
            <span className="font-medium">{industry}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs text-ink">
            <span className="text-text-muted">Year</span>
            <span className="font-medium">{year}</span>
          </span>
        </FadeIn>

        {website && (
          <FadeIn direction="up" delay={0.2} duration={0.5}>
            <Button href={website} target="_blank" rel="noopener noreferrer" className="mt-1 w-fit px-6 py-3 text-[11px]">
              View Live Project
            </Button>
          </FadeIn>
        )}
      </div>

      <FadeIn direction="scale" delay={0.1} duration={0.7} className="w-full shrink-0 lg:w-[46%]">
        <DeviceShowcase
          screenshot={screenshot}
          mockupImage={deviceMockup}
          logo={logo}
          companyName={companyName}
          industry={industry}
        />
      </FadeIn>
    </section>
  );
}
