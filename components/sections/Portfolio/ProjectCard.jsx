"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import PortfolioImage from "@/components/ui/PortfolioImage";

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.button
      type="button"
      layout
      data-project-card
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      className="group relative block aspect-[3/4] w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border text-left transition-[transform,box-shadow,border-color] duration-500 ease-luxury will-change-transform hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_45px_rgba(124,58,237,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-[380px] lg:w-[540px]"
    >
      <PortfolioImage
        src={project.images?.[0]}
        alt={project.title}
        sizes="(min-width: 1024px) 540px, (min-width: 640px) 380px, 280px"
        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-110"
      />
      {project.video && (
        <video
          src={project.video}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-luxury group-hover:opacity-100 sm:block"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-500 ease-luxury group-hover:opacity-95" />

      <span className="absolute right-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ink shadow-sm backdrop-blur">
        {project.category}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
        <div className="flex translate-y-2 flex-col gap-1 opacity-90 transition-transform duration-500 ease-luxury group-hover:translate-y-0">
          <span className="text-xs uppercase tracking-widest text-white/70">
            {project.location} — {project.year}
          </span>
          <h3 className="font-display text-xl text-white sm:text-2xl">{project.title}</h3>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/40 py-2 pl-4 pr-2 text-xs font-medium uppercase tracking-widest text-white transition-colors duration-300 ease-luxury group-hover:border-gold group-hover:text-gold">
          <span className="hidden sm:inline">View Project</span>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current">
            <Plus size={14} />
          </span>
        </span>
      </div>
    </motion.button>
  );
}
