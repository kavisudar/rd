"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFooterSlot } from "./scrollContext";
import { useCaseStudyModal } from "@/components/sections/CaseStudy/CaseStudyModalContext";

export default function OverlayFooter({ previousCaseStudy, nextCaseStudy, index, total }) {
  const footerSlotRef = useFooterSlot();
  const { navigate } = useCaseStudyModal();
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    setSlot(footerSlotRef?.current ?? null);
  }, [footerSlotRef]);

  if (!slot) return null;

  return createPortal(
    <div className="flex items-center justify-between gap-3 border-t border-border bg-card/70 px-5 py-3.5 backdrop-blur-xl sm:px-6 lg:px-10 xl:px-12">
      {previousCaseStudy ? (
        <button
          type="button"
          onClick={() => navigate(previousCaseStudy.slug)}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest text-text-secondary transition-all duration-300 ease-luxury hover:border-gold/40 hover:text-ink sm:px-4 sm:text-xs"
        >
          <ArrowLeft size={13} className="transition-transform duration-300 ease-luxury group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Previous Project</span>
          <span className="sm:hidden">Prev</span>
        </button>
      ) : (
        <span />
      )}

      {total > 0 && (
        <span className="shrink-0 text-[11px] font-medium tracking-widest text-text-muted sm:text-xs">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      )}

      {nextCaseStudy ? (
        <button
          type="button"
          onClick={() => navigate(nextCaseStudy.slug)}
          className="group inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-gold via-gold to-gold-light px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest text-white shadow-[0_6px_18px_rgba(79,70,229,0.28)] transition-all duration-300 ease-luxury hover:shadow-[0_10px_26px_rgba(124,58,237,0.4)] sm:px-4 sm:text-xs"
        >
          <span className="hidden sm:inline">Next Project</span>
          <span className="sm:hidden">Next</span>
          <ArrowRight size={13} className="transition-transform duration-300 ease-luxury group-hover:translate-x-0.5" />
        </button>
      ) : (
        <span />
      )}
    </div>,
    slot,
  );
}
