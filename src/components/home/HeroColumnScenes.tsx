import { motion } from 'framer-motion';
import { MarkFigure, PlacedMark } from '@/components/icons/BiomonieMark';
import {
  Coin,
  SCENE_BOX,
  SCENE_C as C,
  sceneSvgProps,
  useSceneActive,
  whenOn,
} from '@/components/home/scene-kit';

/**
 * Animated marks above the three hero columns, each telling its column's message
 * with the Biomonie figure.
 */

/* ---------------------------------------------------------------------------
 * 1 · "Explore the new form of Money Access — YOU"
 * You are the access: one figure, fingerprint rings rippling out from it and a
 * scanner ring turning around it; each cycle it jumps — access granted.
 * ------------------------------------------------------------------------- */
const YOU_CYCLE = 3.6;

function YouAccessScene() {
  const { ref, on } = useSceneActive();
  return (
    <svg ref={ref} {...sceneSvgProps}>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={C}
          cy={C}
          r={150}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          style={{ originX: 0.5, originY: 0.5 }}
          initial={false}
          animate={
            on
              ? { scale: [0.55, 1.25], opacity: [0, 0.55, 0] }
              : { scale: 0.85, opacity: i === 0 ? 0.3 : 0 }
          }
          transition={whenOn(on, {
            duration: YOU_CYCLE,
            ease: 'easeOut',
            repeat: Infinity,
            delay: (i * YOU_CYCLE) / 3,
          })}
        />
      ))}

      <motion.circle
        cx={C}
        cy={C}
        r={178}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeWidth={4}
        strokeDasharray="16 22"
        strokeLinecap="round"
        style={{ originX: 0.5, originY: 0.5 }}
        initial={false}
        animate={on ? { rotate: 360 } : { rotate: 0 }}
        transition={whenOn(on, { duration: 24, ease: 'linear', repeat: Infinity })}
      />

      <PlacedMark cx={C} cy={C + 6} scale={0.46}>
        <MarkFigure loop={on ? { every: YOU_CYCLE, delay: 0.4 } : undefined} />
      </PlacedMark>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * 2 · "Be part of the new BIOMONIE Ecosystem"
 * Customers, Merchants and Agents on one orbit around a BIOMONIE hub. The orbit
 * turns (figures stay upright), money flows along the spokes, and each member
 * jumps in turn as their spoke lights up.
 * ------------------------------------------------------------------------- */
const ORBIT_R = 145;
const ORBIT_SPIN = 36;
const MEMBER_TURN = 1.2;
const ECO_CYCLE = MEMBER_TURN * 3;
const MEMBER_ANGLES = [-90, 30, 150];
const MEMBER_SCALE = 0.26;

function EcosystemScene() {
  const { ref, on } = useSceneActive();
  const spin = whenOn(on, { duration: ORBIT_SPIN, ease: 'linear', repeat: Infinity } as const);

  return (
    <svg ref={ref} {...sceneSvgProps}>
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        initial={false}
        animate={on ? { rotate: 360 } : { rotate: 0 }}
        transition={spin}
      >
        {/* Keeps the group's box centred on the scene so it spins on the hub. */}
        <rect x={-60} y={-60} width={SCENE_BOX + 120} height={SCENE_BOX + 120} fill="none" />
        <circle
          cx={C}
          cy={C}
          r={ORBIT_R}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.45}
          strokeWidth={4}
        />

        {MEMBER_ANGLES.map((deg, k) => {
          const rad = (deg * Math.PI) / 180;
          const x = C + ORBIT_R * Math.cos(rad);
          const y = C + ORBIT_R * Math.sin(rad);
          const turnDelay = k * MEMBER_TURN;
          return (
            <g key={deg}>
              <motion.line
                x1={C}
                y1={C}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth={5}
                strokeLinecap="round"
                strokeDasharray="4 14"
                initial={false}
                animate={
                  on
                    ? { strokeDashoffset: [0, -36], strokeOpacity: [0.25, 1, 0.25] }
                    : { strokeDashoffset: 0, strokeOpacity: 0.45 }
                }
                transition={whenOn(on, {
                  strokeDashoffset: { duration: 0.8, ease: 'linear', repeat: Infinity },
                  strokeOpacity: {
                    duration: MEMBER_TURN,
                    repeat: Infinity,
                    repeatDelay: ECO_CYCLE - MEMBER_TURN,
                    delay: turnDelay,
                  },
                })}
              />
              {/* Counter-spin keeps each member upright while the orbit turns. */}
              <motion.g
                style={{ originX: 0.5, originY: 0.5 }}
                initial={false}
                animate={on ? { rotate: -360 } : { rotate: 0 }}
                transition={spin}
              >
                <rect x={x - 70} y={y - 70} width={140} height={140} fill="none" />
                <PlacedMark cx={x} cy={y} scale={MEMBER_SCALE}>
                  <MarkFigure
                    scan={false}
                    loop={on ? { every: ECO_CYCLE, delay: turnDelay } : undefined}
                  />
                </PlacedMark>
              </motion.g>
            </g>
          );
        })}
      </motion.g>

      {/* BIOMONIE hub */}
      <motion.circle
        cx={C}
        cy={C}
        r={26}
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        style={{ originX: 0.5, originY: 0.5 }}
        initial={false}
        animate={on ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={whenOn(on, { duration: MEMBER_TURN, ease: 'easeInOut', repeat: Infinity })}
      />
      <circle cx={C} cy={C} r={11} />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * 3 · "Join & Earn as a BIOMONIE Partner"
 * Refer → Earn → Grow: referral lines draw down to three new downlines, coins
 * travel back up to you, you jump. One shared 6s timeline drives every part.
 * ------------------------------------------------------------------------- */
const AFF_CYCLE = 6;
const TOP = { cx: C, cy: 96, scale: 0.34 };
const DOWN_Y = 322;
const DOWN_SCALE = 0.2;
const BRANCH_Y = 214;
const DOWNLINES = [70, C, SCENE_BOX - 70];
/** Fractions of the cycle: refer, pop in, earn, reset. */
const T = { drawEnd: 0.14, popStart: 0.16, coinStart: 0.36, coinEnd: 0.58, fadeStart: 0.86, fadeEnd: 0.96 };

function PartnerScene() {
  const { ref, on } = useSceneActive();
  const loop = { duration: AFF_CYCLE, repeat: Infinity, ease: 'easeInOut' } as const;
  const arriveAt = T.coinEnd * AFF_CYCLE;

  return (
    <svg ref={ref} {...sceneSvgProps}>
      {/* Refer: branches draw from you to each downline */}
      {DOWNLINES.map((x) => (
        <motion.path
          key={`branch-${x}`}
          d={`M${C} 178 V${BRANCH_Y} H${x} V262`}
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={
            on
              ? { pathLength: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }
              : { pathLength: 1, opacity: 0.6 }
          }
          transition={whenOn(on, { ...loop, times: [0, T.drawEnd, T.fadeStart, T.fadeEnd] })}
        />
      ))}

      {/* Grow: downlines pop in and each does a little jump of their own */}
      {DOWNLINES.map((x, k) => {
        const pop = T.popStart + k * 0.04;
        return (
          <motion.g
            key={`down-${x}`}
            style={{ originX: 0.5, originY: 0.5 }}
            initial={false}
            animate={on ? { scale: [0, 0, 1, 1, 0] } : { scale: 1 }}
            transition={whenOn(on, { ...loop, times: [0, pop, pop + 0.08, T.fadeStart, T.fadeEnd] })}
          >
            <rect x={x - 60} y={DOWN_Y - 90} width={120} height={160} fill="none" />
            <PlacedMark cx={x} cy={DOWN_Y} scale={DOWN_SCALE}>
              <MarkFigure
                scan={false}
                loop={on ? { every: AFF_CYCLE, delay: (pop + 0.08) * AFF_CYCLE } : undefined}
              />
            </PlacedMark>
          </motion.g>
        );
      })}

      {/* Earn: a coin rides each branch back up to you */}
      {on &&
        DOWNLINES.map((x, k) => {
          const start = T.coinStart + k * 0.04;
          const end = T.coinEnd;
          const mid1 = start + (end - start) * 0.35;
          const mid2 = start + (end - start) * 0.7;
          return (
            <motion.g
              key={`coin-${x}`}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, 0, 0, 0, C - x, C - x, C - x],
                y: [0, 0, 0, BRANCH_Y - 262, BRANCH_Y - 262, 178 - 262, 178 - 262],
                opacity: [0, 0, 1, 1, 1, 0, 0],
              }}
              transition={{
                ...loop,
                ease: 'linear',
                times: [0, start - 0.02, start, mid1, mid2, end, 1],
              }}
            >
              <Coin cx={x} cy={262} />
            </motion.g>
          );
        })}

      {/* You: jump as the coins arrive */}
      <PlacedMark cx={TOP.cx} cy={TOP.cy} scale={TOP.scale}>
        <MarkFigure loop={on ? { every: AFF_CYCLE, delay: arriveAt - 0.1 } : undefined} />
      </PlacedMark>
    </svg>
  );
}

const SCENES = { 1: YouAccessScene, 2: EcosystemScene, 3: PartnerScene } as const;

export default function HeroColumnScene({ variant }: { variant: 1 | 2 | 3 }) {
  const Scene = SCENES[variant];
  return <Scene />;
}
