import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import BiomonieMark from '@/components/icons/BiomonieMark';
import { easeOutExpo } from '@/lib/motion';

const TAGLINES = [
  { top: 'Finger', bottom: 'Na Money!' },
  { top: 'Tẹ̀ka', bottom: 'Gbowó.' },
  { top: 'Yatsan', bottom: 'Kuɗi.' },
  { top: 'Ákà', bottom: 'Ègò.' },
] as const;

const CYCLE_MS = 4000;

const wordRevealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.38 } },
};

const wordRevealChild: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
};

const topClass =
  'whitespace-nowrap font-sans text-[0.95rem] font-extrabold leading-none text-white xl:text-[1.05rem]';
const bottomClass =
  'mt-1 whitespace-nowrap text-[0.72rem] font-extrabold leading-none xl:text-[0.8rem]';

function Tagline({
  item,
  active,
  playKey,
  reduce,
}: {
  item: (typeof TAGLINES)[number];
  active: boolean;
  playKey: number;
  reduce: boolean;
}) {
  const tokens = item.bottom.split(/(\s+)/).filter((t) => t.length > 0);
  return (
    <div
      role="listitem"
      className="inline-grid min-w-0 grid-cols-[auto_1fr] grid-rows-2 items-center justify-items-start gap-x-1.5 text-left"
    >
      <BiomonieMark
        play={active && !reduce}
        className="row-span-2 h-8 w-8 shrink-0 self-center text-biomonie-lemon xl:h-9 xl:w-9"
      />
      <span className={topClass}>{item.top}</span>
      {active && !reduce ? (
        <motion.span
          key={playKey}
          className={`${bottomClass} flex gap-x-1 text-biomonie-lemon`}
          initial="hidden"
          animate="visible"
          variants={wordRevealContainer}
        >
          {tokens.map((token, wi) => (
            <motion.span
              key={`${wi}-${token}`}
              variants={wordRevealChild}
              className="inline-block whitespace-pre"
            >
              {token}
            </motion.span>
          ))}
        </motion.span>
      ) : (
        <span className={`${bottomClass} text-white`}>{item.bottom}</span>
      )}
    </div>
  );
}

/**
 * The four language taglines. Large screens show all four with the active one
 * highlighted; smaller screens show one at a time, rotating.
 */
export default function LanguageTaglines({
  className = '',
}: {
  className?: string;
}) {
  const reduce = Boolean(useReducedMotion());
  const [activeIdx, setActiveIdx] = useState(0);
  const [playKeys, setPlayKeys] = useState(() => [0, 0, 0, 0]);
  const prevIdx = useRef(activeIdx);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % TAGLINES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (prevIdx.current === activeIdx) return;
    prevIdx.current = activeIdx;
    setPlayKeys((prev) => {
      const next = [...prev];
      next[activeIdx] += 1;
      return next;
    });
  }, [activeIdx]);

  return (
    <div className={className} aria-label="Taglines in multiple languages">
      <div role="list" className="hidden items-center gap-x-5 lg:flex xl:gap-x-6">
        {TAGLINES.map((item, idx) => (
          <Tagline
            key={item.top}
            item={item}
            active={activeIdx === idx}
            playKey={playKeys[idx]}
            reduce={reduce}
          />
        ))}
      </div>

      <div role="list" className="relative h-9 lg:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIdx}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <Tagline
              item={TAGLINES[activeIdx]}
              active
              playKey={playKeys[activeIdx]}
              reduce={reduce}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
