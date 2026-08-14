"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export default function PortfolioImage({ src, alt, sizes, className }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    if (!src && process.env.NODE_ENV !== "production") {
      console.warn(`[Portfolio] Missing image path for "${alt}"`);
    }
  }, [src, alt]);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center glass text-text-secondary">
        <ImageOff size={28} strokeWidth={1.5} />
        <span className="sr-only">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[Portfolio] Failed to load image: ${src}`);
        }
        setFailed(true);
      }}
    />
  );
}
