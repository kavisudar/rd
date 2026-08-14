"use client";

import { motion } from "framer-motion";

export default function FilterBar({ categories, active, onChange, layoutId }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`relative rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest transition-colors duration-300 ease-luxury ${
              isActive ? "text-white" : "text-text-secondary hover:text-ink"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
