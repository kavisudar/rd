import { notFound } from "next/navigation";
import caseStudies from "@/data/caseStudies.json";
import company from "@/data/company.json";
import { SITE_URL } from "@/lib/site";
import CaseStudyHero from "@/components/sections/CaseStudy/Detail/CaseStudyHero";
import ProjectSnapshot from "@/components/sections/CaseStudy/Detail/ProjectSnapshot";
import ChallengeSection from "@/components/sections/CaseStudy/Detail/ChallengeSection";
import ProcessTimeline from "@/components/sections/CaseStudy/Detail/ProcessTimeline";
import SolutionShowcase from "@/components/sections/CaseStudy/Detail/SolutionShowcase";
import ResultsShowcase from "@/components/sections/CaseStudy/Detail/ResultsShowcase";
import ServicesShowcase from "@/components/sections/CaseStudy/Detail/ServicesShowcase";
import GalleryShowcase from "@/components/sections/CaseStudy/Detail/GalleryShowcase";
import NextCaseStudy from "@/components/sections/CaseStudy/Detail/NextCaseStudy";

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) return {};

  const title = `${caseStudy.companyName} Case Study | ${company.name}`;
  const url = `${SITE_URL}/case-studies/${caseStudy.slug}`;
  const ogImage = caseStudy.screenshot ?? caseStudy.logo;

  return {
    title,
    description: caseStudy.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: caseStudy.shortDescription,
      siteName: company.name,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: caseStudy.shortDescription,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((cs) => cs.slug === slug);
  if (index === -1) notFound();

  const caseStudy = caseStudies[index];
  const nextCaseStudy = caseStudies[(index + 1) % caseStudies.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.projectTitle,
    about: caseStudy.companyName,
    description: caseStudy.shortDescription,
    url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
    image: caseStudy.screenshot,
    author: { "@type": "Organization", name: company.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyHero caseStudy={caseStudy} />
      <ProjectSnapshot caseStudy={caseStudy} />
      <ChallengeSection caseStudy={caseStudy} />
      <ProcessTimeline caseStudy={caseStudy} />
      <SolutionShowcase caseStudy={caseStudy} />
      <ResultsShowcase caseStudy={caseStudy} />
      <ServicesShowcase caseStudy={caseStudy} />
      <GalleryShowcase caseStudy={caseStudy} />
      <NextCaseStudy nextCaseStudy={nextCaseStudy} />
    </>
  );
}
