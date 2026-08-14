/**
 * Shared 0-100 coordinate space (matches the SVG `viewBox="0 0 100 100"` in
 * MountainScene.jsx) for the 8 checkpoints along the ascent path. Both the
 * drawn trail (`d` string below) and the HTML checkpoint markers
 * (positioned via `left: {x}% top: {y}%` in JourneySection) read from this
 * single source so they can never drift out of sync.
 */
export const CHECKPOINT_POINTS = [
  { x: 9, y: 92 },
  { x: 25, y: 78 },
  { x: 14, y: 60 },
  { x: 33, y: 50 },
  { x: 22, y: 32 },
  { x: 46, y: 24 },
  { x: 34, y: 9 },
  { x: 60, y: 6 },
];

export function buildAscentPathD(points = CHECKPOINT_POINTS) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

/**
 * Cumulative length fraction (0-1) of each vertex along the polyline, in
 * the path's own `d`-attribute coordinate space. Since the trail is built
 * from straight "L" segments between these exact same points, plain
 * Euclidean distance gives an EXACT fraction - no runtime DOM sampling
 * needed - and because GSAP's MotionPathPlugin/getTotalLength() also work
 * in that same intrinsic user-space, these fractions line up with the
 * rendered path regardless of how the SVG is later scaled on screen.
 */
export function getCumulativeFractions(points = CHECKPOINT_POINTS) {
  const segmentLengths = [];
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segmentLengths.push(len);
    total += len;
  }

  const fractions = [0];
  let running = 0;
  segmentLengths.forEach((len) => {
    running += len;
    fractions.push(running / total);
  });

  return fractions;
}
