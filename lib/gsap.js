import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/**
 * Reverts (unpins/un-spacers) and kills every active ScrollTrigger.
 *
 * Call this from a Link's `onNavigate` before a client-side route change
 * commits. Pinned ScrollTriggers (e.g. ServicesSection) restructure the live
 * DOM outside React's knowledge (wrapping the pinned element in a
 * `.pin-spacer` div); if that wrapper still exists when React later tries to
 * remove the pinned element from its recorded parent during the route's
 * unmount, `removeChild` fails ("the node to be removed is not a child of
 * this node") because the live parent no longer matches. Reverting eagerly,
 * before the unmount ever starts, keeps the DOM in the shape React expects.
 */
export function revertScrollTriggers() {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
}

export { gsap, ScrollTrigger, MotionPathPlugin };
