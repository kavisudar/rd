"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import PortfolioImage from "@/components/ui/PortfolioImage";
import VisualFallback from "./VisualFallback";

const MotionLink = motion.create(Link);

export default function CaseStudyCard({ caseStudy }) {
  const { companyName, industry, projectTitle, slug, website, logo, screenshot, featured } = caseStudy;

  return (
    <MotionLink
      href={`/case-studies/${slug}`}
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`View case study: ${projectTitle}`}
      className="group glass relative flex h-135 w-full cursor-pointer flex-col overflow-hidden rounded-[28px] text-left transition-all duration-500 ease-luxury hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_24px_60px_-20px_rgba(124,58,237,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <div className="relative h-[70%] min-h-70 w-full shrink-0">
        <div className="absolute inset-0 overflow-hidden">
          {screenshot ? (
            <PortfolioImage
              src={screenshot}
              alt={`${companyName} website preview`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
            />
          ) : (
            <VisualFallback logo={logo} companyName={companyName} industry={industry} />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-card" />
        </div>

        {featured && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-bg">
            <Sparkles size={11} />
            Featured
          </span>
        )}

        {screenshot && (
          <div className="absolute -bottom-6 left-6 z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg p-2 shadow-lg">
            <div className="relative h-full w-full">
              <Image src={logo} alt={`${companyName} logo`} fill sizes="56px" className="object-contain" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-6 pb-5 pt-8">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-sm font-medium text-ink/80">{companyName}</span>
          <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-gold">
            {industry}
          </span>
        </div>

        <h3 className="line-clamp-2 font-display text-lg leading-snug text-ink sm:text-xl">
          {projectTitle}
        </h3>

        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3">
          {website ? (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                window.open(website, "_blank", "noopener,noreferrer");
              }}
              className="relative z-10 text-xs font-medium uppercase tracking-widest text-text-muted transition-colors duration-300 ease-luxury hover:text-gold"
            >
              Live Website ↗
            </button>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-ink transition-colors duration-300 ease-luxury group-hover:text-gold">
            View Case Study
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 ease-luxury group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-gold/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-luxury group-hover:opacity-100" />
    </MotionLink>
  );
}
