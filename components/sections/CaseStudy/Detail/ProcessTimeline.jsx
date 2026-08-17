"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProcessTimeline({ caseStudy }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.5"],
  });

  return (
    <section className="relative w-full bg-bg py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="How We Got There" title="The Process" />

        <div ref={containerRef} className="relative mt-16 sm:mt-20">
          <div
            className="absolute left-[11px] top-1 h-[calc(100%-0.5rem)] w-px bg-border sm:left-[15px]"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[11px] top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-gold shadow-[0_0_12px_rgba(79,70,229,0.5)] sm:left-[15px]"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 sm:gap-14">
            {caseStudy.process.map((step, index) => (
              <FadeIn
                key={step.title}
                direction="up"
                amount={0.5}
                className="relative flex gap-6 pl-9 sm:gap-8 sm:pl-11"
              >
                <span className="absolute left-0 top-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-bg text-[11px] font-medium text-gold shadow-[0_0_16px_rgba(79,70,229,0.25)] sm:h-8 sm:w-8 sm:text-xs">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl text-ink sm:text-2xl">{step.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
