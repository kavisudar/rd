import caseStudies from "@/data/caseStudies.json";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudies.map((caseStudy) => ({
      url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
