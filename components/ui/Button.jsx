"use client";

import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/animations/Magnetic";

const VARIANTS = {
  solid:
    "bg-linear-to-r from-gold via-gold to-gold-light text-white shadow-[0_8px_24px_rgba(79,70,229,0.28)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.4)] hover:-translate-y-0.5",
  outline: "glass hover:bg-white/50 hover:border-gold/40",
  ghost: "hover:text-gold",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "solid",
  icon = true,
  magnetic = true,
  className = "",
  ...props
}) {
  const classes = `group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 ease-luxury ${
    VARIANTS[variant] ?? VARIANTS.solid
  } ${className}`;

  const Tag = href ? "a" : "button";

  const inner = (
    <Tag href={href} onClick={onClick} className={classes} {...props}>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 ease-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Tag>
  );

  return magnetic ? <Magnetic className="inline-block w-fit">{inner}</Magnetic> : inner;
}
