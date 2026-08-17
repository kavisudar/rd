"use client";

import { motion } from "framer-motion";
import ProcessNode from "./ProcessNode";

const HEAD_LEN = 32;
const HEAD_SPREAD = (26 * Math.PI) / 180;

function arrowHead(from, tip) {
  const angle = Math.atan2(tip.y - from.y, tip.x - from.x);
  const barb = (sign) => ({
    x: tip.x - HEAD_LEN * Math.cos(angle + sign * HEAD_SPREAD),
    y: tip.y - HEAD_LEN * Math.sin(angle + sign * HEAD_SPREAD),
  });
  const a = barb(1);
  const b = barb(-1);
  return `M${a.x},${a.y} L${tip.x},${tip.y} L${b.x},${b.y}`;
}

const H_VIEW_W = 1480;
const H_VIEW_H = 360;
const H_NODE_START_X = 120;
const H_NODE_END_X = 1080;
const H_PEAK_Y = 110;
const H_VALLEY_Y = 250;
const H_ARROW_RUNWAY = 230;
const H_ARROW_RUN = 330;
const H_ARROW_RISE = 90;

function buildHorizontalTimeline(count) {
  const spacing = count > 1 ? (H_NODE_END_X - H_NODE_START_X) / (count - 1) : 0;
  const points = Array.from({ length: count }, (_, i) => ({
    x: H_NODE_START_X + i * spacing,
    y: i % 2 === 0 ? H_PEAK_Y : H_VALLEY_Y,
    align: i % 2 === 0 ? "above" : "below",
  }));

  const mainPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const last = points[points.length - 1];
  // A flat runway before the climb keeps the arrow clear of the last node's
  // text (which sits directly above/below it) instead of cutting through it.
  const runway = { x: last.x + H_ARROW_RUNWAY, y: last.y };
  const tip = { x: last.x + H_ARROW_RUN, y: last.y - H_ARROW_RISE };

  return {
    points,
    mainPath,
    shaftPath: `M${last.x},${last.y} L${runway.x},${runway.y} L${tip.x},${tip.y}`,
    headPath: arrowHead(runway, tip),
    tip,
    viewW: H_VIEW_W,
    viewH: H_VIEW_H,
  };
}

const V_VIEW_W = 340;
const V_MARGIN_Y = 90;
const V_STEP_Y = 210;
const V_LEFT_X = 100;
const V_RIGHT_X = 240;
const V_ARROW_RUN = 100;
const V_ARROW_RISE = 130;

function buildVerticalTimeline(count) {
  const points = Array.from({ length: count }, (_, i) => ({
    x: i % 2 === 0 ? V_LEFT_X : V_RIGHT_X,
    y: V_MARGIN_Y + i * V_STEP_Y,
  }));

  const mainPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const last = points[points.length - 1];
  const tip = { x: last.x + V_ARROW_RUN, y: last.y - V_ARROW_RISE };

  return {
    points,
    mainPath,
    shaftPath: `M${last.x},${last.y} L${tip.x},${tip.y}`,
    headPath: arrowHead(last, tip),
    tip,
    viewW: V_VIEW_W,
    viewH: V_MARGIN_Y * 2 + (count - 1) * V_STEP_Y + 170,
  };
}

const MAIN_DURATION = 1.3;
const SHAFT_DURATION = 0.4;
const HEAD_DURATION = 0.3;

const nodesContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: MAIN_DURATION / 6, delayChildren: 0.2 } },
};

const nodeWrapperVariants = { hidden: {}, visible: {} };

const glowPulseVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: [0, 0.9, 0],
    scale: [0.6, 1.8, 2.4],
    transition: { duration: 0.9, delay: MAIN_DURATION + SHAFT_DURATION + HEAD_DURATION, ease: "easeOut" },
  },
};

function PathDefs({ gradientId, glowId }) {
  return (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--color-gold-light)" stopOpacity="0.4" />
        <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="1" />
        <stop offset="100%" stopColor="var(--color-gold-bright)" stopOpacity="1" />
      </linearGradient>
      <radialGradient id={glowId}>
        <stop offset="0%" stopColor="var(--color-gold-bright)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="var(--color-gold-bright)" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function TimelineSvg({ timeline, gradientId, glowId, className }) {
  const { mainPath, shaftPath, headPath, tip, viewW, viewH } = timeline;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <PathDefs gradientId={gradientId} glowId={glowId} />

      {/* Ambient glow layer — subtly brighter on hover */}
      <motion.path
        d={mainPath}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-30 blur-[6px] transition-opacity duration-500 ease-luxury group-hover:opacity-60"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: MAIN_DURATION, ease: "easeInOut" } } }}
      />
      <motion.path
        d={mainPath}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: MAIN_DURATION, ease: "easeInOut" } } }}
      />

      <motion.path
        d={shaftPath}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={10}
        strokeLinecap="round"
        className="opacity-30 blur-[6px] transition-opacity duration-500 ease-luxury group-hover:opacity-60"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: SHAFT_DURATION, delay: MAIN_DURATION, ease: "easeOut" } },
        }}
      />
      <motion.path
        d={shaftPath}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: SHAFT_DURATION, delay: MAIN_DURATION, ease: "easeOut" } },
        }}
      />

      <motion.path
        d={headPath}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: HEAD_DURATION, delay: MAIN_DURATION + SHAFT_DURATION, ease: "easeOut" },
          },
        }}
      />

      {/* Growth glow pulse once the arrow completes */}
      <motion.circle cx={tip.x} cy={tip.y} r={26} fill={`url(#${glowId})`} variants={glowPulseVariants} />
    </svg>
  );
}

export default function ProcessPath({ steps }) {
  const horizontal = buildHorizontalTimeline(steps.length);
  const vertical = buildVerticalTimeline(steps.length);

  return (
    <div className="group">
      {/* Desktop / tablet — horizontal zig-zag */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative hidden w-full sm:block"
        style={{ aspectRatio: `${horizontal.viewW} / ${horizontal.viewH}` }}
      >
        <TimelineSvg
          timeline={horizontal}
          gradientId="process-line-h"
          glowId="process-glow-h"
          className="absolute inset-0 h-full w-full"
        />

        <motion.div variants={nodesContainerVariants} className="absolute inset-0">
          {steps.map((step, i) => {
            const point = horizontal.points[i];
            return (
              <motion.div
                key={step.id}
                variants={nodeWrapperVariants}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(point.x / horizontal.viewW) * 100}%`, top: `${(point.y / horizontal.viewH) * 100}%` }}
              >
                <ProcessNode step={step} align={point.align} />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Mobile — vertical zig-zag, alternating left/right */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative w-full sm:hidden"
        style={{ aspectRatio: `${vertical.viewW} / ${vertical.viewH}` }}
      >
        <TimelineSvg
          timeline={vertical}
          gradientId="process-line-v"
          glowId="process-glow-v"
          className="absolute inset-0 h-full w-full"
        />

        <motion.div variants={nodesContainerVariants} className="absolute inset-0">
          {steps.map((step, i) => {
            const point = vertical.points[i];
            return (
              <motion.div
                key={step.id}
                variants={nodeWrapperVariants}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(point.x / vertical.viewW) * 100}%`, top: `${(point.y / vertical.viewH) * 100}%` }}
              >
                <ProcessNode step={step} align="below" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
