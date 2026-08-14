"use client";

import { buildAscentPathD } from "./journeyPoints";

/**
 * Pure decorative SVG layer: layered low-poly mountain facets (gradients
 * instead of a realistic illustration), the ascent trail the checkpoints
 * sit on, a rotating sunrise behind the summit, and the summit flag.
 *
 * Every element hooks/useJourneyAnimation.js touches carries a
 * `data-journey-*` attribute; nothing here plays on its own except the
 * always-on CSS ray rotation (`animate-[journey-ray-rotate_ ...]`), which
 * is ambient and intentionally independent of the scroll-triggered GSAP
 * timeline. `overflow-visible` on the root <svg> lets the flagpole rise
 * above the nominal 0-100 viewBox without being clipped.
 */
export default function MountainScene() {
  const pathD = buildAscentPathD();

  return (
    <svg
      data-journey-mountain
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mtn-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5f3ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mtn-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#eef2ff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="mtn-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="journey-trail" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient id="journey-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#fcd34d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="journey-golden-wash" cx="60%" cy="10%" r="75%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#f472b6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <filter id="journey-glow-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* Sunrise, behind everything */}
      <g data-journey-sun transform="translate(60 7)" opacity="0.5">
        <g data-journey-rays className="origin-center animate-[journey-ray-rotate_40s_linear_infinite]">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="-0.5"
              y="-32"
              width="1"
              height="14"
              fill="#fde68a"
              opacity="0.35"
              transform={`rotate(${i * 30})`}
            />
          ))}
        </g>
        <circle r="16" fill="url(#journey-sun)" />
      </g>

      {/* Distant hazy silhouettes */}
      <path
        d="M0,100 L0,88 L14,82 L30,86 L48,79 L66,84 L82,77 L100,82 L100,100 Z"
        fill="url(#mtn-back)"
      />
      <path
        d="M0,100 L0,82 L12,68 L24,74 L40,58 L52,66 L66,52 L80,60 L92,48 L100,55 L100,100 Z"
        fill="url(#mtn-mid)"
      />

      {/* Main mountain the trail climbs */}
      <path
        d="M0,100 L0,80 L14,58 L26,66 L38,40 L48,50 L60,7 L74,34 L88,18 L100,42 L100,100 Z"
        fill="url(#mtn-front)"
      />
      <path
        d="M14,58 L26,66 L38,40 L48,50 L60,7 L74,34 L88,18"
        fill="none"
        stroke="#22d3ee"
        strokeOpacity="0.5"
        strokeWidth="0.4"
      />

      {/* Golden wash - hidden until the summit activates */}
      <rect data-journey-golden-wash x="0" y="0" width="100" height="100" fill="url(#journey-golden-wash)" opacity="0" />

      {/* Ascent trail - drawn on via stroke-dashoffset */}
      <path
        data-journey-path
        d={pathD}
        fill="none"
        stroke="url(#journey-trail)"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        data-journey-path-glow
        d={pathD}
        fill="none"
        stroke="#67e8f9"
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#journey-glow-blur)"
      />

      {/* Bright sub-range revealed on checkpoint hover - see useJourneyAnimation */}
      <path
        data-journey-path-highlight
        d={pathD}
        fill="none"
        stroke="#fcd34d"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0"
        filter="url(#journey-glow-blur)"
      />

      {/* Traveling light that leads from checkpoint to checkpoint */}
      <circle data-journey-travel-dot r="1.1" fill="#f59e0b" opacity="0" filter="url(#journey-glow-blur)" />

      {/* Summit flag */}
      <g data-journey-flag transform="translate(60 7)" opacity="0" style={{ transformOrigin: "0px 0px" }}>
        <rect x="-0.15" y="-16" width="0.3" height="16" fill="#4b5563" />
        <path
          data-journey-flag-cloth
          d="M0,-16 L7,-13.5 L0,-11 Z"
          fill="#fbbf24"
          style={{ transformOrigin: "0px -13.5px" }}
        />
      </g>
    </svg>
  );
}
