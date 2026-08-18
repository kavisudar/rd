import FadeIn from "@/components/animations/FadeIn";

export default function OverlayOverview({ caseStudy }) {
  const services = caseStudy.services ?? [];

  return (
    <section
      id="overview"
      className="grid scroll-mt-4 grid-cols-1 gap-8 py-6 sm:gap-10 sm:py-8 lg:grid-cols-[1fr_280px] lg:py-8"
    >
      <div className="flex flex-col gap-4">
        <FadeIn direction="none" duration={0.5}>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">
            Overview
          </span>
        </FadeIn>
        <FadeIn direction="up" delay={0.05} duration={0.5}>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-black sm:text-lg">
            {caseStudy.projectOverview}
          </p>
        </FadeIn>
      </div>

      {services.length > 0 && (
        <FadeIn
          direction="up"
          delay={0.1}
          duration={0.5}
          className="flex h-fit flex-col gap-3 rounded-2xl border border-border bg-card/50 p-5"
        >
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ink sm:text-xs">
            What We Delivered
          </span>
          <div className="flex flex-wrap gap-1.5">
            {services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[11px] leading-none text-gold"
              >
                {service}
              </span>
            ))}
          </div>
        </FadeIn>
      )}
    </section>
  );
}
