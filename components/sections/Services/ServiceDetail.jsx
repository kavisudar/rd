"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useLenis } from "@/lib/lenis-context";
import useReducedMotion from "@/hooks/useReducedMotion";
import ServiceIcon from "./ServiceIcon";

const EASE = [0.16, 1, 0.3, 1];
const VISIBLE_COMPANY_LIMIT = 6;

/**
 * Counts up from 0 to `value` whenever `active` flips true. Reduced-motion
 * users get the final number immediately instead of the tween, per the
 * animation spec's "respect reduced motion" requirement.
 */
function useCountUp(value, active, reduced) {
  const [count, setCount] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!active) return undefined;
    if (reduced) {
      setCount(value);
      return undefined;
    }

    setCount(0);
    const duration = 900;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, active, reduced]);

  return count;
}

function CompanyChip({ company, index }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
      }}
      className="flex items-center gap-3 rounded-2xl border border-border bg-bg/60 px-4 py-3 transition-colors duration-300 ease-luxury hover:border-gold/40"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface">
        {company.logo ? (
          <Image
            src={company.logo}
            alt=""
            width={40}
            height={40}
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <span className="font-display text-sm text-text-muted" aria-hidden="true">
            {company.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="truncate text-sm font-medium text-ink">{company.name}</span>
      <span className="ml-auto shrink-0 font-display text-xs tabular-nums text-text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.li>
  );
}

export default function ServiceDetail({ service, isOpen, onClose }) {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const closeButtonRef = useRef(null);
  const previouslyFocused = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const companies = service?.companies ?? [];
  const count = companies.length;
  const visibleCompanies = showAll ? companies : companies.slice(0, VISIBLE_COMPANY_LIMIT);
  const hiddenCount = companies.length - visibleCompanies.length;
  const animatedCount = useCountUp(count, isOpen, reduced);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocused.current = document.activeElement;
    closeButtonRef.current?.focus();
    setShowAll(false);

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      lenis?.start();
      previouslyFocused.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, lenis]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && service && (
        <motion.div
          key="service-detail-backdrop"
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-ink/50 p-0 backdrop-blur-2xl sm:p-6 lg:p-10"
          style={{ position: "fixed", zIndex: 100 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <span className="aurora-blob -left-32 -top-32 h-96 w-96 bg-gold/25" />
            <span className="aurora-blob -bottom-40 -right-24 h-[28rem] w-[28rem] bg-gold-light/20" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="relative h-full w-full sm:h-[min(92vh,860px)] sm:w-[min(94vw,1080px)]"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-detail-title"
              className="relative flex h-full w-full flex-col overflow-hidden border border-white/50 bg-linear-to-b from-white/85 to-white/60 shadow-[0_30px_80px_-20px_rgba(201,161,74,0.4),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl sm:rounded-[32px]"
              style={{ WebkitBackdropFilter: "blur(40px) saturate(160%)", backdropFilter: "blur(40px) saturate(160%)" }}
            >
              <div data-lenis-prevent className="relative flex-1 overflow-y-auto overscroll-contain lg:overflow-hidden">
                <motion.div
                  key={service.id}
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                  className="grid grid-cols-1 gap-0 lg:h-full lg:grid-cols-2"
                >
                  {/* Visual */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 1.06 },
                      show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className="relative h-64 w-full overflow-hidden bg-surface sm:h-80 lg:h-full lg:min-h-125"
                  >
                    {service.detailImageFit === "contain" ? (
                      <>
                        <Image
                          src={service.image}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="scale-110 object-cover opacity-40 blur-2xl"
                        />
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-contain p-8 sm:p-12"
                          priority
                        />
                      </>
                    ) : (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: service.detailImagePosition ?? "50% 50%" }}
                        priority
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-black/10 lg:bg-linear-to-r" />
                    <div className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md">
                      <ServiceIcon name={service.icon} className="h-5 w-5" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div data-lenis-prevent className="flex flex-col gap-6 overflow-y-auto p-8 sm:p-10 lg:h-full lg:p-12">
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                      className="flex flex-col gap-3"
                    >
                      <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                        Service
                      </span>
                      <h3
                        id="service-detail-title"
                        className="font-display text-3xl font-semibold tracking-tight text-ink text-balance sm:text-4xl"
                      >
                        {service.title}
                      </h3>
                    </motion.div>

                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.05 } },
                      }}
                      className="max-w-md text-base font-medium leading-relaxed text-black sm:text-lg"
                    >
                      {service.subtitle}
                    </motion.p>

                    {(service.tags ?? []).length > 0 && (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } },
                        }}
                        className="flex flex-wrap gap-2"
                      >
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-bg/40 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.15 } },
                      }}
                      className="h-px w-full bg-border"
                    />

                    {count > 0 ? (
                      <>
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 12 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.2 } },
                          }}
                        >
                          <span className="font-display text-5xl font-semibold tabular-nums text-ink sm:text-6xl">
                            {animatedCount}
                            <span className="text-brand-gold">+</span>
                          </span>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-text-muted">
                            Companies Served
                          </p>
                        </motion.div>

                        <motion.div
                          variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
                          }}
                          className="flex flex-col gap-3"
                        >
                          <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                            Companies We&rsquo;ve Worked With
                          </span>
                          <motion.ul
                            variants={{
                              hidden: {},
                              show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
                            }}
                            className="grid grid-cols-1 gap-2"
                          >
                            {visibleCompanies.map((company, index) => (
                              <CompanyChip key={company.name} company={company} index={index} />
                            ))}
                          </motion.ul>

                          {hiddenCount > 0 && (
                            <button
                              type="button"
                              onClick={() => setShowAll(true)}
                              className="w-fit text-xs font-medium uppercase tracking-widest text-gold underline-offset-4 hover:underline"
                            >
                              +{hiddenCount} more — View all companies →
                            </button>
                          )}
                        </motion.div>
                      </>
                    ) : (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.2 } },
                        }}
                        className="rounded-2xl border border-dashed border-border bg-bg/40 px-6 py-8 text-center"
                      >
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                          Coming Soon
                        </span>
                        <p className="mt-2 text-sm text-text-secondary">
                          We&rsquo;re building our first success story for this service.
                        </p>
                      </motion.div>
                    )}

                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.4 } },
                      }}
                      href="#contact"
                      onClick={onClose}
                      className="group mt-2 inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest text-ink"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border text-gold transition-all duration-300 ease-luxury group-hover:translate-x-1 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                          <path
                            d="M6 18L18 6M18 6H9M18 6V15"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="relative">
                        Discuss This Service
                        <span className="absolute inset-x-0 -bottom-1 h-px origin-left bg-ink/20 transition-colors duration-300 ease-out group-hover:bg-gold" />
                      </span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close service details"
              className="group absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-ink shadow-lg backdrop-blur-xl transition-all duration-300 ease-luxury hover:scale-110 hover:rotate-90 hover:border-gold hover:bg-gold hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:-right-4 sm:-top-4"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
