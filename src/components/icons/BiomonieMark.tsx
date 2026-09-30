import type { ReactNode } from 'react';
import { motion, type Transition } from 'framer-motion';

/** Mark artwork bounds in its own units (from the logo construction grid). */
export const MARK_X = 448;
export const MARK_Y = 481;
export const MARK_W = 338;
export const MARK_H = 440;

/**
 * Upper group (head + arms) rotates around the ring centre (572, 601).
 * Framer measures SVG origins against the fill-box, so the centre is given
 * as a fraction of the arms' bounding box (454→739, 483→768).
 */
const RING_ORIGIN = 118 / 285;

/** One jump, shared by every part so they stay in step:
 *  crouch → take off → peak → land (squash) → small rebound → rest. */
const JUMP_TIMES = [0, 0.16, 0.42, 0.66, 0.8, 1];
const JUMP_DURATION = 1;
const SCAN_DURATION = 0.8;

export type MarkLoop = {
  /** Seconds between the start of one jump and the next. */
  every: number;
  /** Seconds before the first jump. */
  delay?: number;
};

type MarkFigureProps = {
  /** Plays one jump each time this turns true. */
  play?: boolean;
  /** Jumps on a repeating schedule instead (takes precedence over `play`). */
  loop?: MarkLoop;
  /** Adds the fingerprint scan pulse from the head at the start of each jump. */
  scan?: boolean;
};

/**
 * The figure as SVG content (no <svg> wrapper), in mark units, so several can be
 * placed in one scene. Filled with currentColor.
 */
export function MarkFigure({ play = false, loop, scan = true }: MarkFigureProps) {
  const active = Boolean(loop) || play;
  const jump: Transition = loop
    ? {
        duration: JUMP_DURATION,
        times: JUMP_TIMES,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: loop.every - JUMP_DURATION,
        delay: loop.delay ?? 0,
      }
    : { duration: JUMP_DURATION, times: JUMP_TIMES, ease: 'easeInOut' };
  // Looping parts must start from their first keyframe; one-shot parts skip the mount animation.
  const initial = loop ? undefined : false;

  return (
    <motion.g
      initial={initial}
      animate={active ? { y: [0, 14, -92, 0, -18, 0] } : { y: 0 }}
      transition={jump}
    >
      {scan && active && (
        <motion.circle
          cx={572}
          cy={601}
          fill="none"
          stroke="currentColor"
          strokeWidth={14}
          initial={{ r: 45, opacity: 0.85 }}
          animate={{ r: 230, opacity: 0 }}
          transition={
            loop
              ? {
                  duration: SCAN_DURATION,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatDelay: loop.every - SCAN_DURATION,
                  delay: loop.delay ?? 0,
                }
              : { duration: SCAN_DURATION, ease: 'easeOut' }
          }
        />
      )}

      <motion.g
        style={{ originX: RING_ORIGIN, originY: RING_ORIGIN }}
        initial={initial}
        animate={active ? { rotate: [0, 4, -18, 6, -3, 0] } : { rotate: 0 }}
        transition={jump}
      >
        <path d="M690 483 A167 167 0 0 1 454 719 L509 664 A89 89 0 0 0 635 538 Z" />
        <motion.circle
          cx={572}
          cy={601}
          r={41}
          initial={initial}
          animate={active ? { y: [0, 6, -26, 4, -6, 0] } : { y: 0 }}
          transition={jump}
        />
      </motion.g>

      {/* Legs: squash on crouch and landing, tuck and narrow in the air */}
      <motion.path
        d="M450 918 A166.5 166.5 0 0 1 783 918 L711 918 A94.5 94.5 0 0 0 522 918 Z"
        style={{ originY: 1 }}
        initial={initial}
        animate={
          active
            ? {
                scaleY: [1, 0.82, 1.08, 0.86, 1.02, 1],
                scaleX: [1, 1.06, 0.94, 1.08, 1, 1],
              }
            : { scaleY: 1, scaleX: 1 }
        }
        transition={jump}
      />
    </motion.g>
  );
}

/** Places mark-unit content centred on (cx, cy) in a parent scene, at `scale`. */
export function PlacedMark({
  cx,
  cy,
  scale,
  children,
}: {
  cx: number;
  cy: number;
  scale: number;
  children: ReactNode;
}) {
  const x = cx - (MARK_W * scale) / 2;
  const y = cy - (MARK_H * scale) / 2;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(${-MARK_X} ${-MARK_Y})`}>
      {children}
    </g>
  );
}

type BiomonieMarkProps = {
  className?: string;
  /** When true, plays the "access" moment once: scan pulse, then a happy jump. */
  play?: boolean;
};

/**
 * Standalone Biomonie figure mark: head circle, half-ring arms cut on the 45°
 * diagonal, arch legs on the baseline. Colour it with a text class
 * (e.g. text-biomonie-lemon).
 */
export default function BiomonieMark({ className, play = false }: BiomonieMarkProps) {
  return (
    <svg
      viewBox={`${MARK_X} ${MARK_Y} ${MARK_W} ${MARK_H}`}
      overflow="visible"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <MarkFigure play={play} />
    </svg>
  );
}
