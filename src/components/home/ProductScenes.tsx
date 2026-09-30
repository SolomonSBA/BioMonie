import { motion } from 'framer-motion';
import { MarkFigure, PlacedMark } from '@/components/icons/BiomonieMark';
import {
  Coin,
  SCENE_C as C,
  SCENE_INK,
  sceneSvgProps,
  useSceneActive,
  whenOn,
} from '@/components/home/scene-kit';

/**
 * Animated marks for the product cards (BIOMONIE Bills, BIOMONIE Reach & Collect),
 * told with the Biomonie figure. Each scene runs on one shared 6s timeline.
 */

const CYCLE = 6;
const loop = { duration: CYCLE, repeat: Infinity, ease: 'easeInOut' } as const;

/** A banknote centred on (cx, cy). */
function Note({ cx, cy, w, h }: { cx: number; cy: number; w: number; h: number }) {
  return (
    <>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h * 0.14} />
      <circle
        cx={cx}
        cy={cy}
        r={h * 0.24}
        fill="none"
        stroke={SCENE_INK}
        strokeWidth={Math.max(3, h * 0.07)}
      />
    </>
  );
}

/* ---------------------------------------------------------------------------
 * BIOMONIE Bills — "Everyday bills paid smarter with you always earning.
 * YOU also earn every time your downlines pay bills too."
 * You pay a bill (it flies off, a PAID check stamps in) and a coin comes back.
 * Then your downlines pay theirs, and their coins travel up to you as well.
 * ------------------------------------------------------------------------- */
const YOU = { cx: C, cy: 150, scale: 0.3 };
const BILL = { cx: 317, cy: 74, w: 112, h: 66 };
const DOWN_SCALE = 0.18;
const DOWNS = [
  { cx: 78, cy: 334, noteX: 110, toX: C - 28 },
  { cx: 322, cy: 334, noteX: 290, toX: C + 28 },
];
/** Fractions of the cycle. You get paid back at 1.4s, downline earnings land at 4.4s. */
const B = {
  payStart: 0.05, payEnd: 0.13,
  stampIn: 0.14, stampOut: 0.86,
  youCoinStart: 0.16, youCoinEnd: 0.233,
  downPayStart: 0.5, downPayEnd: 0.56,
  downCoinStart: 0.58, downCoinEnd: 0.733,
  resetAt: 0.88, backIn: 0.96,
};
/** Flies a bill off (paid), hides it, then fades it back in for the next cycle. */
const payAway = (dx: number, dy: number, start: number, end: number) => ({
  animate: {
    x: [0, 0, dx, dx, 0, 0, 0],
    y: [0, 0, dy, dy, 0, 0, 0],
    rotate: [0, 0, dx > 0 ? 18 : -18, 0, 0, 0, 0],
    opacity: [1, 1, 0, 0, 0, 1, 1],
  },
  times: [0, start, end, B.resetAt - 0.01, B.resetAt, B.backIn, 1],
});

function BillsScene() {
  const { ref, on } = useSceneActive();
  const youPay = payAway(70, -46, B.payStart, B.payEnd);

  return (
    <svg ref={ref} {...sceneSvgProps}>
      {/* Links from your downlines up to you */}
      {DOWNS.map((d) => (
        <motion.path
          key={`link-${d.cx}`}
          d={`M${d.cx} ${d.cy - 50} L${d.toX} 214`}
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="4 14"
          initial={false}
          animate={
            on
              ? { strokeOpacity: [0.3, 0.3, 1, 1, 0.3, 0.3] }
              : { strokeOpacity: 0.45 }
          }
          transition={whenOn(on, {
            ...loop,
            times: [0, B.downPayEnd, B.downCoinStart, B.downCoinEnd, B.downCoinEnd + 0.05, 1],
          })}
        />
      ))}

      {/* Your bill: paid with a flex, flies off */}
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        initial={false}
        animate={on ? youPay.animate : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={whenOn(on, { ...loop, times: youPay.times })}
      >
        <Note {...BILL} />
      </motion.g>

      {/* PAID stamp where the bill was */}
      {on && (
        <motion.g
          style={{ originX: 0.5, originY: 0.5 }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.4, 0.4, 1, 1, 0.8, 0.8] }}
          transition={{ ...loop, times: [0, B.stampIn - 0.01, B.stampIn + 0.04, B.stampOut, B.resetAt - 0.02, 1] }}
        >
          <circle cx={BILL.cx} cy={BILL.cy} r={32} fill="none" stroke="currentColor" strokeWidth={7} />
          <motion.path
            d={`M${BILL.cx - 14} ${BILL.cy + 1} l10 10 l19 -21`}
            fill="none"
            stroke="currentColor"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 0, 1, 1] }}
            transition={{ ...loop, times: [0, B.stampIn + 0.02, B.stampIn + 0.08, 1] }}
          />
        </motion.g>
      )}

      {/* Your earning comes straight back to you */}
      {on && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            x: [0, 0, 0, C + 22 - BILL.cx, C + 22 - BILL.cx, C + 22 - BILL.cx],
            y: [0, 0, 0, 104 - BILL.cy, 104 - BILL.cy, 104 - BILL.cy],
            opacity: [0, 0, 1, 1, 0, 0],
          }}
          transition={{
            ...loop,
            ease: 'linear',
            times: [0, B.youCoinStart - 0.01, B.youCoinStart, B.youCoinEnd, B.youCoinEnd + 0.01, 1],
          }}
        >
          <Coin cx={BILL.cx} cy={BILL.cy} />
        </motion.g>
      )}

      {/* Your downlines, each paying a bill of their own */}
      {DOWNS.map((d, k) => {
        const away = payAway(k === 0 ? -30 : 30, -34, B.downPayStart, B.downPayEnd);
        return (
          <g key={`down-${d.cx}`}>
            <PlacedMark cx={d.cx} cy={d.cy} scale={DOWN_SCALE}>
              <MarkFigure
                scan={false}
                loop={on ? { every: CYCLE, delay: B.downPayStart * CYCLE - 0.2 } : undefined}
              />
            </PlacedMark>
            <motion.g
              style={{ originX: 0.5, originY: 0.5 }}
              initial={false}
              animate={on ? away.animate : { x: 0, y: 0, rotate: 0, opacity: 1 }}
              transition={whenOn(on, { ...loop, times: away.times })}
            >
              <Note cx={d.noteX} cy={d.cy - 70} w={50} h={30} />
            </motion.g>
            {on && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{
                  x: [0, 0, 0, d.toX - d.noteX, d.toX - d.noteX, d.toX - d.noteX],
                  y: [0, 0, 0, 214 - (d.cy - 70), 214 - (d.cy - 70), 214 - (d.cy - 70)],
                  opacity: [0, 0, 1, 1, 0, 0],
                }}
                transition={{
                  ...loop,
                  ease: 'linear',
                  times: [0, B.downCoinStart - 0.01, B.downCoinStart, B.downCoinEnd, B.downCoinEnd + 0.01, 1],
                }}
              >
                <Coin cx={d.noteX} cy={d.cy - 70} r={12} />
              </motion.g>
            )}
          </g>
        );
      })}

      {/* You: jump each time an earning lands (your bill, then your downlines') */}
      <PlacedMark cx={YOU.cx} cy={YOU.cy} scale={YOU.scale}>
        <MarkFigure loop={on ? { every: CYCLE / 2, delay: B.youCoinEnd * CYCLE - 0.05 } : undefined} />
      </PlacedMark>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * BIOMONIE Reach & Collect — "Intervention that reaches the right people, and
 * collects evidence they were there."
 * A sponsor sends value down to each person in turn, held in open hands. On
 * arrival their fingerprint scan verifies them, a check pin pops (evidence), and
 * the proof travels back up to the sponsor.
 * ------------------------------------------------------------------------- */
const SPONSOR = { cx: C, cy: 66 };
const PEOPLE = [78, C, 322];
const PERSON_Y = 262;
const PERSON_SCALE = 0.19;
const HEAD_Y = PERSON_Y - 40;

/** Location pin with a check, tip at (0, 0). */
function EvidencePin() {
  return (
    <>
      <path d="M0 0 C-5 -10 -17 -19 -17 -32 A17 17 0 1 1 17 -32 C17 -19 5 -10 0 0 Z" />
      <path
        d="M-7 -32 l5 5 l9 -10"
        fill="none"
        stroke={SCENE_INK}
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function ReachCollectScene() {
  const { ref, on } = useSceneActive();

  return (
    <svg ref={ref} {...sceneSvgProps}>
      {/* Open hands holding the people up */}
      <g fill="none" stroke="currentColor" strokeWidth={12} strokeLinecap="round">
        <path d="M20 262 Q40 376 192 368" />
        <path d="M380 262 Q360 376 208 368" />
      </g>

      {/* Sponsor */}
      <motion.circle
        cx={SPONSOR.cx}
        cy={SPONSOR.cy}
        r={30}
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        style={{ originX: 0.5, originY: 0.5 }}
        initial={false}
        animate={on ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.6 }}
        transition={whenOn(on, { duration: CYCLE / 3, ease: 'easeInOut', repeat: Infinity })}
      />
      <circle cx={SPONSOR.cx} cy={SPONSOR.cy} r={15} />

      {PEOPLE.map((x, k) => {
        const s = k / 3 + 0.02;
        const arrive = s + 0.1;
        return (
          <g key={`person-${x}`}>
            {/* Reach: value travels down to the right person */}
            {on && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{
                  x: [0, 0, 0, x - SPONSOR.cx, x - SPONSOR.cx, x - SPONSOR.cx],
                  y: [0, 0, 0, HEAD_Y - SPONSOR.cy, HEAD_Y - SPONSOR.cy, HEAD_Y - SPONSOR.cy],
                  opacity: [0, 0, 1, 1, 0, 0],
                }}
                transition={{ ...loop, ease: 'easeIn', times: [0, s - 0.01, s, arrive, arrive + 0.01, 1] }}
              >
                <Coin cx={SPONSOR.cx} cy={SPONSOR.cy} r={12} />
              </motion.g>
            )}

            {/* Verified: fingerprint scan + jump on arrival */}
            <PlacedMark cx={x} cy={PERSON_Y} scale={PERSON_SCALE}>
              <MarkFigure loop={on ? { every: CYCLE, delay: arrive * CYCLE } : undefined} />
            </PlacedMark>

            {/* Collect: evidence pin pops and stays for the rest of the round */}
            <g transform={`translate(${x + 34} ${PERSON_Y - 40})`}>
              <motion.g
                style={{ originX: 0.5, originY: 1 }}
                initial={false}
                animate={on ? { scale: [0, 0, 1, 1, 0, 0] } : { scale: 1 }}
                transition={whenOn(on, {
                  ...loop,
                  times: [0, arrive + 0.05, arrive + 0.1, 0.9, 0.96, 1],
                })}
              >
                <EvidencePin />
              </motion.g>
            </g>

            {/* Proof travels back up to the sponsor */}
            {on && (
              <motion.circle
                cx={x + 34}
                cy={PERSON_Y - 72}
                r={7}
                initial={{ opacity: 0 }}
                animate={{
                  x: [0, 0, 0, SPONSOR.cx - (x + 34), SPONSOR.cx - (x + 34)],
                  y: [0, 0, 0, SPONSOR.cy - (PERSON_Y - 72), SPONSOR.cy - (PERSON_Y - 72)],
                  opacity: [0, 0, 1, 0, 0],
                }}
                transition={{
                  ...loop,
                  ease: 'easeOut',
                  times: [0, arrive + 0.11, arrive + 0.12, arrive + 0.2, 1],
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

const SCENES = { bills: BillsScene, reach: ReachCollectScene } as const;

export default function ProductScene({ variant }: { variant: keyof typeof SCENES }) {
  const Scene = SCENES[variant];
  return <Scene />;
}
