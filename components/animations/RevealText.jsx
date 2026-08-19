"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: (stagger) => ({
    transition: { staggerChildren: stagger },
  }),
};

const word = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// Sweeps a highlight band across a gold-gradient segment once, in sync with
// the word reveal above it - inherits the "hidden"/"visible" state from the
// same whileInView trigger since it's nested under it with no animation
// controls of its own.
const shineSweep = {
  hidden: { backgroundPosition: "0% 0%" },
  visible: { backgroundPosition: "100% 0%", transition: { duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Splits `text` (or each segment's text, when `segments` is given) into
 * words, each masked behind an overflow-hidden strip, and reveals them with
 * a translateY stagger when scrolled into view. `segments` lets different
 * runs of words carry different classNames (e.g. a gold-highlighted phrase)
 * while staying part of the same continuous reveal animation.
 */
export default function RevealText({
  text,
  segments,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
  amount = 0.6,
  inView = true,
  ...rest
}) {
  const segs = segments ?? [{ text, className: undefined }];
  const wordGroups = segs.map((seg) => seg.text.split(" "));
  const totalWords = wordGroups.reduce((n, g) => n + g.length, 0);
  const offsets = wordGroups.reduce((acc, g) => {
    acc.push((acc.at(-1) ?? 0) + g.length);
    return acc;
  }, []);

  // Above-the-fold text (e.g. the Hero headline) is visible on first paint,
  // so it should just play once on mount rather than being gated behind a
  // whileInView/IntersectionObserver trigger - scroll-linked libraries and
  // browser repaint quirks can otherwise leave a whileInView element stuck
  // showing its "hidden" state after scrolling away and back.
  const triggerProps = inView
    ? { whileInView: "visible", viewport: { once, amount } }
    : { animate: "visible" };

  return (
    <Tag className={className} {...rest}>
      <motion.span
        initial="hidden"
        {...triggerProps}
        variants={container}
        custom={stagger}
        transition={{ delayChildren: delay }}
        className="inline"
      >
        {segs.map((seg, si) => {
          const startIndex = si === 0 ? 0 : offsets[si - 1];
          const SegTag = seg.shine ? motion.span : "span";
          return (
            <SegTag
              key={si}
              {...(seg.shine ? { variants: shineSweep } : {})}
              className={seg.className}
            >
              {wordGroups[si].map((w, wi) => {
                const isLast = startIndex + wi === totalWords - 1;
                return (
                  // The space is a plain sibling text node, not part of the masked
                  // inline-block: a trailing space inside an overflow-hidden
                  // inline-block sits at the end of that box's own internal line
                  // and gets collapsed away by the browser, so it has to live outside.
                  <Fragment key={wi}>
                    <span className="inline-block overflow-hidden pb-[0.15em] align-bottom">
                      <motion.span variants={word} className="inline-block">
                        {w}
                      </motion.span>
                    </span>
                    {!isLast && " "}
                  </Fragment>
                );
              })}
            </SegTag>
          );
        })}
      </motion.span>
    </Tag>
  );
}
