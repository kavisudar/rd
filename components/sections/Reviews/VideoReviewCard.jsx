"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";

export default function VideoReviewCard({ testimonial, disabled = false, onPlay, onPause }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (disabled) {
      videoRef.current?.pause();
    }
  }, [disabled]);

  function togglePlay() {
    if (disabled) return;
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function toggleMute(e) {
    e.stopPropagation();
    if (disabled) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  return (
    <div
      className={`group flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow,opacity] duration-500 ease-luxury ${
        disabled ? "opacity-40" : "hover:border-gold hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]"
      }`}
    >
      <button
        type="button"
        onClick={togglePlay}
        disabled={disabled}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        aria-disabled={disabled}
        className={`relative min-h-0 w-full flex-1 overflow-hidden bg-black/40 ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        <video
          ref={videoRef}
          src={testimonial.video}
          playsInline
          loop
          preload="metadata"
          className="h-full w-full object-cover"
          onPlay={() => {
            setIsPlaying(true);
            onPlay?.();
          }}
          onPause={() => {
            setIsPlaying(false);
            onPause?.();
          }}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ease-luxury ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-bg/70 text-gold backdrop-blur transition-transform duration-300 ease-luxury group-hover:scale-110">
            {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
          </span>
        </div>

        <span
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={toggleMute}
          onKeyDown={(e) => e.key === "Enter" && toggleMute(e)}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-bg/70 text-ink backdrop-blur transition-colors duration-300 ease-luxury ${
            disabled ? "pointer-events-none" : "hover:border-gold hover:text-gold"
          }`}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </span>

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/20 to-transparent px-4 pb-4 pt-10 text-left">
          <p className="font-display text-base text-white">{testimonial.name}</p>
          <p className="text-xs text-text-muted">{testimonial.designation}</p>
        </div>
      </button>

      <a
        href="https://share.google/vEoHFXbrUgw8pThTL"
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
        onClick={(e) => disabled && e.preventDefault()}
        className={`flex shrink-0 items-center justify-center gap-2 border-t border-border px-4 py-3 text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors duration-300 ease-luxury ${
          disabled ? "pointer-events-none" : "hover:border-gold hover:text-gold"
        }`}
      >
        View Google Review <ExternalLink size={13} />
      </a>
    </div>
  );
}
