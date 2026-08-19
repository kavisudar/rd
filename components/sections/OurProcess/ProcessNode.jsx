"use client";

import { motion } from "framer-motion";
import { Search, ClipboardList, PenTool, Rocket, TrendingUp } from "lucide-react";

const ICONS = {
  Search,
  ClipboardList,
  PenTool,
  Rocket,
  TrendingUp,
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 } },
};

export default function ProcessNode({ step, align = "above" }) {
  const Icon = ICONS[step.icon];

  return (
    // Sized to the circle only — text is absolutely positioned around it so the
    // wrapper's centering translate (see ProcessPath) lands exactly on the icon,
    // keeping every node pinned to the connector line regardless of text height.
    <div className="group relative">
      <motion.div
        variants={circleVariants}
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white/70 text-gold shadow-[0_0_20px_rgba(201,161,74,0.25)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300 ease-luxury group-hover:scale-110 group-hover:border-gold group-hover:shadow-[0_0_35px_rgba(124,58,237,0.5)] sm:h-16 sm:w-16"
      >
        {Icon && (
          <Icon
            role="img"
            aria-label={`${step.title} process icon`}
            strokeWidth={1.75}
            className="h-7 w-7 transition-transform duration-300 ease-luxury group-hover:scale-105 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
          />
        )}
      </motion.div>

      <motion.div
        variants={textVariants}
        className={`absolute left-1/2 w-36 -translate-x-1/2 text-center sm:w-44 lg:w-48 ${
          align === "above" ? "bottom-full mb-4" : "top-full mt-4"
        }`}
      >
        <h3 className="font-display text-base text-ink transition-colors duration-300 ease-luxury group-hover:text-gold sm:text-lg lg:text-xl">
          {step.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium leading-relaxed text-black transition-colors duration-300 ease-luxury group-hover:text-ink/90 sm:text-base">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}
