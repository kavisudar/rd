"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import RevealText from "@/components/animations/RevealText";
import { revertScrollTriggers } from "@/lib/gsap";

export default function NextCaseStudy({ nextCaseStudy }) {
  return (
    <section className="relative w-full bg-bg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <FadeIn direction="up" duration={0.6}>
          <Link
            href="/#case-studies"
            onNavigate={revertScrollTriggers}
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors duration-300 ease-luxury hover:text-gold"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 ease-luxury group-hover:-translate-x-1" />
            Back to All Case Studies
          </Link>
        </FadeIn>

        <FadeIn direction="up" delay={0.1} duration={0.7} className="mt-10 sm:mt-14">
          <Link
            href={`/case-studies/${nextCaseStudy.slug}`}
            onNavigate={revertScrollTriggers}
            className="group glass-panel relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] p-8 sm:flex-row sm:items-center sm:p-14"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">
                Next Case Study
              </span>
              <RevealText
                as="h2"
                text={nextCaseStudy.companyName}
                className="font-display text-4xl font-medium uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
              />
              <p className="text-sm uppercase tracking-widest text-text-muted">{nextCaseStudy.industry}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              {nextCaseStudy.logo && (
                <span className="relative hidden h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg p-2 shadow-lg sm:flex">
                  <Image
                    src={nextCaseStudy.logo}
                    alt={`${nextCaseStudy.companyName} logo`}
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                </span>
              )}
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold text-white transition-transform duration-300 ease-luxury group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-16 sm:w-16">
                <ArrowUpRight size={22} />
              </span>
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
