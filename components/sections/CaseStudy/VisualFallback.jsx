import Image from "next/image";

export default function VisualFallback({ logo, companyName, industry, compact = false, className = "" }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-gold/10 via-card to-bg-secondary/60 ${compact ? "gap-1.5" : "gap-3"} ${className}`}
    >
      <div
        className={`relative shrink-0 rounded-2xl border border-border bg-bg shadow-card ${
          compact ? "h-7 w-7 p-1.5" : "h-14 w-14 p-2.5 sm:h-16 sm:w-16"
        }`}
      >
        <Image src={logo} alt={`${companyName} logo`} fill sizes={compact ? "28px" : "64px"} className="object-contain p-1" />
      </div>
      {!compact && (
        <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">{industry}</span>
      )}
    </div>
  );
}
