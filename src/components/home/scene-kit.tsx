import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Shared pieces for the animated Biomonie scenes. Scenes are 400×400 SVGs that
 * animate only transform/opacity/stroke values, loop declaratively (no React
 * re-renders), and pause off-screen or under reduced motion.
 */

export const SCENE_BOX = 400;
export const SCENE_C = SCENE_BOX / 2;

/** Dark ink used on lemon shapes (coin rims, check marks). */
export const SCENE_INK = '#0f1e26';

/** Loops only while the scene is on screen and motion is allowed. */
export function useSceneActive() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px' });
  const reduce = useReducedMotion();
  return { ref, on: inView && !reduce };
}

/** Loop timing while on; otherwise snap straight to rest so nothing runs off-screen. */
const STILL = { duration: 0 } as const;
export const whenOn = <T,>(on: boolean, t: T) => (on ? t : STILL);

export const sceneSvgProps = {
  viewBox: `0 0 ${SCENE_BOX} ${SCENE_BOX}`,
  overflow: 'visible',
  fill: 'currentColor',
  className: 'h-full w-full text-biomonie-lemon',
  'aria-hidden': true,
} as const;

/** A lemon coin centred on (cx, cy). */
export function Coin({ cx, cy, r = 14 }: { cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r / 2} fill="none" stroke={SCENE_INK} strokeWidth={3} />
    </>
  );
}
