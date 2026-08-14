"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { videoTestimonials } from "@/data/videoTestimonials.json";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import VideoReviewCard from "./VideoReviewCard";

const FEATURED_COUNT = 2;

export default function Reviews() {
  const [first, second] = videoTestimonials.slice(0, FEATURED_COUNT);
  const [activeId, setActiveId] = useState(null);

  const cardProps = (testimonial) => ({
    testimonial,
    disabled: activeId !== null && activeId !== testimonial.id,
    onPlay: () => setActiveId(testimonial.id),
    onPause: () => setActiveId((current) => (current === testimonial.id ? null : current)),
  });

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-bg py-6 sm:py-8">
      <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col px-6 sm:px-8 lg:px-12">
        <div className="flex h-full min-h-0 flex-col rounded-4xl border border-border bg-bg-secondary px-6 py-6 sm:px-10 sm:py-8">
          <div className="shrink-0">
            <SectionHeading eyebrow="Client Voices" title="Hear It From Our Clients" align="center" />
          </div>

          <div className="mx-auto mt-6 grid min-h-0 w-full max-w-2xl flex-1 grid-cols-1 grid-rows-[1fr_auto_1fr] items-center gap-4 sm:mt-8 sm:gap-6 lg:max-w-4xl lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-1 lg:gap-10">
            <FadeIn direction="up" className="h-full min-h-0">
              <VideoReviewCard {...cardProps(first)} />
            </FadeIn>

            <FadeIn
              direction="scale"
              delay={0.15}
              className="flex shrink-0 flex-col items-center gap-3 px-4 text-center lg:w-44"
            >
              <Quote size={28} className="text-gold" strokeWidth={1.5} />
              <p className="font-display text-lg leading-snug text-ink sm:text-2xl">
                Real people.
                <br />
                Real results.
              </p>
              <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
              <p className="text-xs uppercase tracking-widest text-text-muted">Straight from our clients</p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1} className="h-full min-h-0">
              <VideoReviewCard {...cardProps(second)} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
