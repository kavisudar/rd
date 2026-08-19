const PARTICLES = [
  { top: "12%", left: "8%", size: 10, duration: 14, delay: 0, driftX: 16, driftY: -22, hue: "gold" },
  { top: "22%", left: "82%", size: 7, duration: 18, delay: 1.5, driftX: -14, driftY: 20, hue: "bright" },
  { top: "38%", left: "45%", size: 6, duration: 16, delay: 0.8, driftX: 10, driftY: 18, hue: "light" },
  { top: "58%", left: "18%", size: 12, duration: 20, delay: 2.2, driftX: -18, driftY: -16, hue: "gold" },
  { top: "68%", left: "70%", size: 8, duration: 15, delay: 0.4, driftX: 12, driftY: 24, hue: "bright" },
  { top: "82%", left: "35%", size: 9, duration: 19, delay: 1.1, driftX: -12, driftY: -20, hue: "light" },
  { top: "45%", left: "92%", size: 7, duration: 17, delay: 2.6, driftX: -16, driftY: 14, hue: "gold" },
  { top: "90%", left: "60%", size: 8, duration: 13, delay: 0.6, driftX: 14, driftY: -18, hue: "light" },
];

const HUE_CLASS = {
  gold: "bg-gold/25 shadow-[0_0_16px_rgba(201,161,74,0.35)]",
  light: "bg-gold-light/25 shadow-[0_0_16px_rgba(124,58,237,0.35)]",
  bright: "bg-gold-bright/25 shadow-[0_0_16px_rgba(6,182,212,0.35)]",
};

/**
 * A handful of fixed, low-opacity glass orbs with a slow CSS drift - a cheap
 * ambient-motion layer shared across the whole page rather than mounted per
 * section, so the DOM/animation cost stays constant regardless of scroll
 * depth.
 */
export default function FloatingParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full border border-white/50 backdrop-blur-sm motion-safe:animate-[float-drift_ease-in-out_infinite] ${HUE_CLASS[p.hue]}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--drift-x": `${p.driftX}px`,
            "--drift-y": `${p.driftY}px`,
          }}
        />
      ))}
    </div>
  );
}
