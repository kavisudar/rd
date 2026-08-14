"use client";

export default function Marquee({ children, speed = 40, direction = "left", className = "", pauseOnHover = true }) {
  const animationName = direction === "left" ? "marquee-scroll" : "marquee-scroll-reverse";
  const trackClass = `flex w-max shrink-0 items-center gap-8 ${
    pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
  }`;
  const trackStyle = { animation: `${animationName} ${speed}s linear infinite` };

  return (
    <div className={`group relative flex w-full gap-8 overflow-hidden ${className}`}>
      <div className={trackClass} style={trackStyle}>
        {children}
      </div>
      <div aria-hidden="true" className={trackClass} style={trackStyle}>
        {children}
      </div>
    </div>
  );
}
