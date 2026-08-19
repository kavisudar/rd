"use client";

import Image from "next/image";
import ServiceIcon from "./ServiceIcon";

/**
 * A single premium service slide. The root element is left "bare" (no
 * transform/opacity classes) because hooks/useServicesAnimation.js drives
 * this element's opacity/x/scale directly via GSAP inline styles (desktop
 * pinned track) - anything CSS-transform-based (hover lift, image zoom)
 * therefore lives on the *inner* wrapper below, keeping the two transform
 * systems from fighting over the same node. On mobile, ServicesSection
 * wraps this component in a Framer Motion <motion.div> instead and this
 * root element just renders inert.
 */
export default function ServiceCard({ service, index, onOpen, className = "", style, ...rootProps }) {
  const { title, subtitle, image, icon, tags = [] } = service;

  const handleActivate = () => onOpen?.(service, index);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <article className={`h-full w-full ${className}`} style={style} {...rootProps}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        aria-label={`View details for ${title}`}
        className="group/hover relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#efe7d8] bg-surface shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.02] hover:border-brand-gold hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-1400 ease-out will-change-transform group-hover/hover:scale-110">
            <Image
              data-service-image
              src={image}
              alt=""
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-surface)_0%,var(--color-surface)_40%,transparent_72%)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
          <div className="flex items-start justify-between">
            <span className="font-display text-5xl font-semibold tabular-nums text-ink/10 sm:text-6xl lg:text-7xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-bg/40 text-gold backdrop-blur transition-colors duration-500 ease-out group-hover/hover:border-gold/50">
              <ServiceIcon name={icon} className="h-5 w-5" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl text-balance">
              {title}
            </h3>
            <p className="max-w-md text-base font-medium leading-relaxed text-black sm:text-lg">{subtitle}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-bg/40 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-text-secondary transition-colors duration-500 ease-out group-hover/hover:border-gold/40 group-hover/hover:text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span
              aria-hidden="true"
              className="mt-4 inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-widest text-ink"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border text-gold transition-all duration-500 ease-out group-hover/hover:translate-x-1 group-hover/hover:border-gold group-hover/hover:bg-gold group-hover/hover:text-white group-hover/hover:shadow-[0_0_25px_rgba(201,161,74,0.4)]">
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
                Explore Service
                <span className="absolute inset-x-0 -bottom-1 h-px origin-left bg-ink/20 transition-colors duration-300 ease-out group-hover/hover:bg-gold" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
