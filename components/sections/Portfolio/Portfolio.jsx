"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects.json";
import SectionHeading from "@/components/ui/SectionHeading";
import FilterBar from "@/components/ui/FilterBar";
import ProjectCard from "./ProjectCard";
import Lightbox from "./Lightbox";

const ALL = "All Projects";

export default function Portfolio() {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return [ALL, ...unique];
  }, []);

  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState(null);
  const trackRef = useRef(null);

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [active]);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-project-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="relative flex h-screen w-full flex-col overflow-hidden bg-bg py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1600px] shrink-0 px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Show Case" title="Client Projects" />
          <FilterBar categories={categories} active={active} onChange={setActive} layoutId="portfolio-filter-pill" />
        </div>
      </div>

      <div className="relative mt-8 flex flex-1 items-center sm:mt-10">
        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => scrollByCard(-1)}
          className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-ink shadow-lg backdrop-blur transition-colors duration-300 ease-luxury hover:border-gold hover:text-gold sm:left-4 sm:flex lg:left-6"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={trackRef}
          className="flex h-full w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-24"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Next projects"
          onClick={() => scrollByCard(1)}
          className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-ink shadow-lg backdrop-blur transition-colors duration-300 ease-luxury hover:border-gold hover:text-gold sm:right-4 sm:flex lg:right-6"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <Lightbox project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
