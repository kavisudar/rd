import FadeIn from "@/components/animations/FadeIn";

export default function OverlayProcess({ caseStudy }) {
  const process = caseStudy.process ?? [];
  if (process.length === 0) return null;

  return (
    <section id="approach" className="flex scroll-mt-4 flex-col gap-4 py-6 sm:gap-5 sm:py-8 lg:py-8">
      <FadeIn direction="none" duration={0.5}>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold sm:text-xs">
          Our Approach
        </span>
      </FadeIn>

      <div className="relative flex flex-col gap-6 sm:gap-7">
        <div
          className="absolute left-[11px] top-1 h-[calc(100%-0.5rem)] w-px bg-linear-to-b from-gold via-gold/35 to-transparent sm:left-[15px]"
          aria-hidden="true"
        />

        {process.map((step, index) => (
          <FadeIn
            key={step.title}
            direction="up"
            delay={index * 0.06}
            duration={0.45}
            className="relative flex gap-4 pl-9 sm:gap-5 sm:pl-11"
          >
            <span className="absolute left-0 top-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-bg text-[11px] font-medium text-gold shadow-[0_0_16px_rgba(79,70,229,0.25)] sm:h-8 sm:w-8 sm:text-xs">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1 pt-0.5">
              <h3 className="font-display text-base text-ink sm:text-lg">{step.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-black sm:text-base">{step.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
