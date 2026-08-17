import { notFound } from "next/navigation";
import caseStudies from "@/data/caseStudies.json";
import CaseStudyOverlayContent from "@/components/sections/CaseStudy/Overlay/CaseStudyOverlayContent";

export default async function InterceptedCaseStudyPage({ params }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((cs) => cs.slug === slug);
  if (index === -1) notFound();

  const total = caseStudies.length;
  const caseStudy = caseStudies[index];
  const previousCaseStudy = total > 1 ? caseStudies[(index - 1 + total) % total] : null;
  const nextCaseStudy = total > 1 ? caseStudies[(index + 1) % total] : null;

  return (
    <CaseStudyOverlayContent
      caseStudy={caseStudy}
      previousCaseStudy={previousCaseStudy}
      nextCaseStudy={nextCaseStudy}
      index={index}
      total={total}
    />
  );
}
