"use client";

import { useEffect, useRef } from "react";
import { ScrollContainerContext, FooterSlotContext } from "./Overlay/scrollContext";
import CaseStudyOverlayContent from "./Overlay/CaseStudyOverlayContent";

// Renders the exact same card design used by the case-study modal (opened
// by clicking a card on the homepage) as a standalone page, so a hard
// navigation/reload/new-tab visit to /case-studies/[slug] looks identical
// instead of falling back to a differently-designed page. The scroll-spy
// side nav and the previous/next footer both expect the modal's internal
// scroll container + footer portal target; here they get the real page
// scroll element and an inline slot instead.
export default function CaseStudyPageContent({ caseStudy, previousCaseStudy, nextCaseStudy, index, total }) {
  const scrollRef = useRef(null);
  const footerSlotRef = useRef(null);

  useEffect(() => {
    scrollRef.current = document.documentElement;
  }, []);

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
      <FooterSlotContext.Provider value={footerSlotRef}>
        <div className="mx-auto max-w-[1120px] px-0 pt-24 sm:pt-28">
          <div className="overflow-hidden rounded-none border-x border-border/60 bg-card/40 sm:rounded-[32px] sm:border">
            <CaseStudyOverlayContent
              caseStudy={caseStudy}
              previousCaseStudy={previousCaseStudy}
              nextCaseStudy={nextCaseStudy}
              index={index}
              total={total}
            />
          </div>
        </div>
        <div ref={footerSlotRef} className="mx-auto max-w-[1120px]" />
      </FooterSlotContext.Provider>
    </ScrollContainerContext.Provider>
  );
}
