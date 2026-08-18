import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import RevealText from "@/components/animations/RevealText";
import ScrollCue from "@/components/sections/Hero/ScrollCue";

export default function CaseStudyHero({ caseStudy }) {
  const { companyName, projectTitle, industry, category, year, logo, screenshot, website } = caseStudy;

  return (
    <section className="relative flex min-h-screen w-full items-end overflow-hidden bg-ink pb-16 pt-32 sm:pb-20 lg:pb-24">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/*
         * `screenshot` is a real product UI screenshot, not decorative stock
         * photography - blurred + scaled up (to hide the blur's edge
         * artifacts) so it reads as soft atmospheric color behind the hero
         * text instead of a second, competing layer of text/UI.
         */}
        {screenshot && (
          <Image src={screenshot} alt="" fill priority sizes="100vw" className="scale-110 object-cover blur-xl" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/55" />
        <div className="absolute inset-0 bg-ink/45" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-7 px-6 sm:px-8 lg:px-12">
        <FadeIn direction="none" duration={0.6} className="flex items-center gap-3">
          {logo && (
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/95 shadow-lg sm:h-12 sm:w-12">
              <Image src={logo} alt={`${companyName} logo`} fill sizes="48px" className="object-contain p-2" />
            </span>
          )}
          <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">
            {industry}
          </span>
        </FadeIn>

        <RevealText
          as="h1"
          text={companyName}
          className="block text-balance font-display text-4xl font-medium uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        />

        <FadeIn direction="up" delay={0.15} duration={0.7} className="max-w-2xl">
          <p className="text-xl font-medium leading-relaxed text-white/80 sm:text-2xl">{projectTitle}</p>
        </FadeIn>

        <FadeIn direction="up" delay={0.25} duration={0.7} className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-widest text-white/60">
            <span>{category}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
            <span>{year}</span>
          </div>

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white transition-colors duration-300 ease-luxury hover:text-brand-gold"
            >
              View Live Website
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 ease-luxury group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          )}
        </FadeIn>
      </div>

      <div className="absolute bottom-8 right-6 sm:right-8 lg:right-12">
        <ScrollCue className="text-white/70" />
      </div>
    </section>
  );
}
