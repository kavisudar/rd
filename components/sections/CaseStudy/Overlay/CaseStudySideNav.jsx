"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollContainer } from "./scrollContext";

export default function CaseStudySideNav({ sections }) {
  const scrollRef = useScrollContainer();
  const [active, setActive] = useState(sections[0]?.id);
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;

  useEffect(() => {
    const container = scrollRef?.current;
    if (!container) return undefined;

    const elements = sections
      .map(({ id }) => container.querySelector(`#${id}`))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = null;
        let bestRatio = 0;
        for (const { id } of sectionsRef.current) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      { root: container, rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollRef, sections]);

  const scrollToSection = useCallback(
    (id) => {
      const container = scrollRef?.current;
      const el = container?.querySelector(`#${id}`);
      if (!el) return;
      setActive(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [scrollRef],
  );

  return (
    <nav
      aria-label="Case study sections"
      className="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] lg:sticky lg:top-0 lg:w-40 lg:shrink-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0 lg:pt-1 [&::-webkit-scrollbar]:hidden"
    >
      {sections.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            aria-current={isActive ? "true" : undefined}
            className={`group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-left text-xs font-medium uppercase tracking-widest transition-all duration-300 ease-luxury lg:w-full lg:rounded-lg ${
              isActive
                ? "bg-gold/12 text-gold"
                : "text-text-secondary hover:bg-card/60 hover:text-ink"
            }`}
          >
            <Icon
              size={14}
              strokeWidth={1.75}
              className={`shrink-0 transition-colors duration-300 ease-luxury ${isActive ? "text-gold" : "text-text-muted group-hover:text-ink"}`}
            />
            <span className="truncate">{label}</span>
            {isActive && (
              <span className="ml-auto hidden h-1.5 w-1.5 shrink-0 rounded-full bg-gold lg:block" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
