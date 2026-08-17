"use client";

import { Compass, GalleryHorizontal, Lightbulb, Target, TrendingUp, Workflow } from "lucide-react";
import OverlayHero from "./OverlayHero";
import OverlayHighlights from "./OverlayHighlights";
import CaseStudySideNav from "./CaseStudySideNav";
import OverlayOverview from "./OverlayOverview";
import OverlayChallenge from "./OverlayChallenge";
import OverlayProcess from "./OverlayProcess";
import OverlayTransformation from "./OverlayTransformation";
import OverlayResults from "./OverlayResults";
import OverlayGallery from "./OverlayGallery";
import OverlayFooter from "./OverlayFooter";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: Compass },
  { id: "challenge", label: "The Challenge", icon: Target },
  { id: "approach", label: "Our Approach", icon: Workflow },
  { id: "solution", label: "The Solution", icon: Lightbulb },
  { id: "results", label: "Results", icon: TrendingUp },
  { id: "gallery", label: "Gallery", icon: GalleryHorizontal },
];

export default function CaseStudyOverlayContent({ caseStudy, previousCaseStudy, nextCaseStudy, index, total }) {
  const sections = SECTIONS.filter(({ id }) => {
    if (id === "gallery") return (caseStudy.gallery ?? []).length > 0;
    if (id === "approach") return (caseStudy.process ?? []).length > 0;
    return true;
  });

  return (
    <div className="flex flex-col divide-y divide-border/60">
      <OverlayHero caseStudy={caseStudy} />
      <OverlayHighlights caseStudy={caseStudy} />

      <div className="flex flex-col gap-4 px-5 pt-5 sm:gap-6 sm:px-6 sm:pt-6 lg:flex-row lg:items-start lg:gap-10 lg:px-10 lg:pt-8 xl:px-12">
        <CaseStudySideNav sections={sections} />

        <div className="min-w-0 flex-1 divide-y divide-border/60">
          <OverlayOverview caseStudy={caseStudy} />
          <OverlayChallenge caseStudy={caseStudy} />
          <OverlayProcess caseStudy={caseStudy} />
          <OverlayTransformation caseStudy={caseStudy} />
          <OverlayResults caseStudy={caseStudy} />
          <OverlayGallery caseStudy={caseStudy} />
        </div>
      </div>

      <OverlayFooter previousCaseStudy={previousCaseStudy} nextCaseStudy={nextCaseStudy} index={index} total={total} />
    </div>
  );
}
