"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import caseStudies from "@/data/caseStudies.json";
import FadeIn from "@/components/animations/FadeIn";
import RevealText from "@/components/animations/RevealText";
import FilterBar, { ALL } from "./FilterBar";
import CaseStudyCard from "./CaseStudyCard";

const INITIAL_VISIBLE = 3;

export default function CaseStudies() {
  const categories = useMemo(
    () => Array.from(new Set(caseStudies.map((cs) => cs.category))),
    []
  );

  const [active, setActive] = useState(ALL);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (active === ALL ? caseStudies : caseStudies.filter((cs) => cs.category === active)),
    [active]
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <section id="case-studies" className="relative w-full bg-bg pt-14 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <FadeIn direction="none" duration={0.6}>
            <span className="text-[0.9375rem] font-semibold uppercase tracking-widest text-brand-gold">Our Work</span>
          </FadeIn>

          <RevealText
            as="h2"
            text="Case Studies"
            className="font-display text-4xl font-medium uppercase leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-7xl"
          />

          <FadeIn direction="up" delay={0.15} duration={0.7}>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Discover how we&apos;ve helped businesses achieve measurable results through design, development, and
              digital innovation.
            </p>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.2} className="mt-12 flex justify-center sm:mt-14">
          <FilterBar
            categories={categories}
            active={active}
            onChange={(category) => {
              setActive(category);
              setShowAll(false);
            }}
          />
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <FadeIn direction="up" className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="text-sm font-medium uppercase tracking-widest text-gold underline-offset-4 transition-colors duration-300 ease-luxury hover:text-ink hover:underline"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
