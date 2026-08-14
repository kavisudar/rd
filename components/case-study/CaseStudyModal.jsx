"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, X, ZoomIn } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Counter from "@/components/animations/Counter";
import Button from "@/components/ui/Button";
import PortfolioImage from "@/components/ui/PortfolioImage";
import { useLenis } from "@/lib/lenis-context";

function Section({ title, children }) {
  return (
    <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-16">
      <FadeIn direction="up" amount={0.2}>
        <h3 className="mb-6 font-display text-2xl text-ink sm:text-3xl">{title}</h3>
        {children}
      </FadeIn>
    </div>
  );
}

export default function CaseStudyModal({ caseStudy, onClose }) {
  const [lightboxImage, setLightboxImage] = useState(null);
  const lightboxImageRef = useRef(null);
  lightboxImageRef.current = lightboxImage;
  const lenis = useLenis();

  useEffect(() => {
    setLightboxImage(null);
  }, [caseStudy]);

  useEffect(() => {
    if (!caseStudy) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (lightboxImageRef.current) setLightboxImage(null);
      else onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [caseStudy, onClose, lenis]);

  return (
    <>
      <AnimatePresence>
        {caseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 overflow-y-auto bg-black/85 backdrop-blur-md sm:p-6"
            data-lenis-prevent
            onClick={onClose}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="fixed right-4 top-4 z-110 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg/90 text-ink shadow-lg transition-colors duration-300 ease-luxury hover:bg-gold hover:text-white sm:right-6 sm:top-6"
            >
              <X size={18} />
            </button>

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${caseStudy.companyName} case study`}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="relative mx-auto w-full overflow-hidden border border-border bg-bg-secondary shadow-2xl sm:my-10 sm:max-w-300 sm:rounded-[32px]"
            >
              <div className="relative overflow-hidden px-6 pb-10 pt-16 sm:px-10 sm:pt-16 lg:px-16">
                <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-bg p-2.5 shadow-lg sm:h-20 sm:w-20">
                      <Image
                        src={caseStudy.logo}
                        alt={`${caseStudy.companyName} logo`}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium uppercase tracking-widest text-gold">
                        {caseStudy.industry}
                      </span>
                      <h2 className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
                        {caseStudy.companyName}
                      </h2>
                    </div>
                  </div>
                  <p className="max-w-2xl text-sm text-text-secondary sm:text-base">{caseStudy.projectTitle}</p>
                  <div>
                    <Button href={caseStudy.website} target="_blank" rel="noopener noreferrer" variant="outline">
                      Visit Website
                    </Button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                <Section title="Project Overview">
                  <p className="max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
                    {caseStudy.projectOverview}
                  </p>
                </Section>

                <Section title="The Challenge">
                  <p className="max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
                    {caseStudy.challenge}
                  </p>
                </Section>

                <Section title="Objectives">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {caseStudy.objectives.map((objective, index) => (
                      <motion.li
                        key={objective}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                      >
                        <CheckCircle2 className="mt-0.5 shrink-0 text-gold" size={18} />
                        <span className="text-sm text-text-secondary">{objective}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Section>

                <Section title="Our Process">
                  <div className="relative space-y-6 border-l border-border pl-8 sm:pl-10">
                    {caseStudy.process.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-2xl border border-border bg-card p-6"
                      >
                        <span className="absolute -left-11 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-bg text-xs font-medium text-gold sm:-left-[3.25rem]">
                          {index + 1}
                        </span>
                        <h4 className="font-display text-lg text-ink">{step.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </Section>

                <Section title="The Solution">
                  <p className="max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
                    {caseStudy.solution}
                  </p>
                  <div className="relative mt-6 h-64 w-full overflow-hidden rounded-2xl border border-border sm:h-80 lg:h-96">
                    <PortfolioImage
                      src={caseStudy.solutionImage}
                      alt={`${caseStudy.companyName} solution`}
                      sizes="(min-width: 1024px) 1100px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Section>

                <Section title="Results">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                    {caseStudy.results.map((result, index) => (
                      <motion.div
                        key={result.label}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8"
                      >
                        <Counter
                          value={result.value}
                          prefix={result.prefix}
                          suffix={result.suffix}
                          className="font-display text-3xl text-gold sm:text-4xl"
                        />
                        <p className="mt-2 text-xs uppercase tracking-widest text-text-secondary">{result.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </Section>

                {/* <Section title="Technologies Used">
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="rounded-full border border-border bg-card px-4 py-2 text-sm text-ink"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </Section> */}

                <Section title="Services Provided">
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.services.map((service, index) => (
                      <motion.span
                        key={service}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold"
                      >
                        {service}
                      </motion.span>
                    ))}
                  </div>
                </Section>

                <Section title="Project Gallery">
                  <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {caseStudy.gallery.map((src, index) => (
                      <button
                        key={src + index}
                        type="button"
                        onClick={() => setLightboxImage(src)}
                        aria-label={`Open gallery image ${index + 1}`}
                        className="group/gallery relative mb-4 block w-full overflow-hidden rounded-2xl border border-border break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <span className="relative block aspect-4/3 w-full">
                          <PortfolioImage
                            src={src}
                            alt={`${caseStudy.companyName} gallery image ${index + 1}`}
                            sizes="(min-width: 1024px) 380px, 90vw"
                            className="object-cover transition-transform duration-500 ease-luxury group-hover/gallery:scale-105"
                          />
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 ease-luxury group-hover/gallery:bg-black/40 group-hover/gallery:opacity-100">
                          <ZoomIn className="text-white" size={22} />
                        </span>
                      </button>
                    ))}
                  </div>
                </Section>

                <Section title="Client Website">
                  <div className="flex flex-col items-center gap-5 text-center">
                    <p className="max-w-md text-sm text-text-secondary sm:text-base">
                      Explore the live project and see the full experience in action.
                    </p>
                    <Button href={caseStudy.website} target="_blank" rel="noopener noreferrer" className="px-10 py-4 text-sm">
                      Visit Website
                    </Button>
                  </div>
                </Section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image"
              className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-bg/90 text-ink transition-colors duration-300 ease-luxury hover:bg-gold hover:text-white"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[80vh] w-full max-w-4xl"
            >
              <Image
                src={lightboxImage}
                alt="Gallery preview"
                fill
                sizes="(min-width: 896px) 896px, 90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
