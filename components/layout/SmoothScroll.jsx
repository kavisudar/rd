"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LenisContext } from "@/lib/lenis-context";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      autoRaf: false,
    });

    const onTick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    instance.on("scroll", ScrollTrigger.update);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
