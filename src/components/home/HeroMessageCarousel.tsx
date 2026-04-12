import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Building2,
  Globe,
  KeyRound,
  Network,
  Shield,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';
import { easeOutExpo } from '@/lib/motion';

const INTERVAL_MS = 8000;

/** Carousel motion — tuned for clarity (no bouncy springs on hero copy). */
const easeSnap = [0.4, 0, 1, 1] as const;
const tImage = { duration: 0.68, ease: easeOutExpo };
const tTextIn = { duration: 0.52, ease: easeOutExpo };
const tTextOut = { duration: 0.3, ease: easeSnap };
const tStagger = 0.09;
const tHeader = { duration: 0.38, ease: easeOutExpo };

/** Local assets in /public/imageforslider — order matches slide index (cycles after 7). */
const SLIDER_FILENAMES = [
  'Screenshot 2026-04-11 133310.png',
  'shawn-fields-zsppCWsxJy0-unsplash 1.jpg',
  'Screenshot 2026-04-11 133207.png',
  'mubarak-showole-Ve7xjKImd28-unsplash.jpg',
  'Screenshot 2026-04-11 132619.png',
  'eye-for-ebony-3dqSZidOkvs-unsplash.jpg',
  'Screenshot 2026-04-11 132916.png',
];

function publicSliderImageUrl(filename: string) {
  const base = import.meta.env.BASE_URL ?? '/';
  const root = base === '/' ? '' : base.replace(/\/$/, '');
  return `${root}/imageforslider/${encodeURIComponent(filename)}`.replace(
    /\/+/g,
    '/',
  );
}

const SLIDER_IMAGES = SLIDER_FILENAMES.map(publicSliderImageUrl);

function sliderImageForSlide(slideIndex: number) {
  return SLIDER_IMAGES[slideIndex % SLIDER_IMAGES.length];
}

/** Primary line — light shadow; left teal overlay carries most contrast. */
const linePrimary =
  'font-sans font-black tracking-[-0.035em] text-white text-[clamp(1.4rem,4.2vw,2.35rem)] leading-[1.08] sm:leading-[1.1] [text-shadow:0_2px_10px_rgba(0,0,0,0.55),0_1px_2px_rgba(0,0,0,0.65)]';

/** Supporting line (split slides). */
const lineSupporting =
  'font-serif font-bold text-[clamp(1.12rem,2.65vw,1.5rem)] leading-[1.5] text-white/[0.96] [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]';

type SlideSimple = {
  id: string;
  icon: typeof Wallet;
  format: 'simple';
  text: ReactNode;
};

type SlideSplit = {
  id: string;
  icon: typeof Wallet;
  format: 'split';
  emphasis: ReactNode;
  detail: ReactNode;
};

type Slide = SlideSimple | SlideSplit;

const slides: Slide[] = [
  {
    id: 'access',
    format: 'simple',
    icon: KeyRound,
    text: (
      <>
        <span className="font-black text-biomonie-lemon">YOU</span> are the
        access to your money; Flex, pay or spend and earn…
      </>
    ),
  },
  {
    id: 'hard',
    format: 'simple',
    icon: Wallet,
    text: (
      <>
        <span className="font-black text-biomonie-lemon">YOU</span> work hard
        for your money; spending it shouldn&apos;t be hard. Just flex; Pay or
        Spend…
      </>
    ),
  },
  {
    id: 'show',
    format: 'simple',
    icon: Zap,
    text: <>Show up, flex and Just transact and earn…</>,
  },
  {
    id: 'safety1',
    format: 'simple',
    icon: Shield,
    text: (
      <>
        <span className="font-black text-biomonie-lemon">YOU</span> are your
        money access; Safety always on…
      </>
    ),
  },
  {
    id: 'safety2',
    format: 'simple',
    icon: ShieldCheck,
    text: (
      <>
        With <span className="font-black text-biomonie-lemon">YOU</span> being
        the money access; Safety is always on…
      </>
    ),
  },
  {
    id: 'netgain',
    format: 'simple',
    icon: TrendingUp,
    text: (
      <>
        <span className="font-black text-biomonie-lemon">BIOMONIE</span>; always
        a Net-Gain…
      </>
    ),
  },
  {
    id: 'everywhere',
    format: 'simple',
    icon: Globe,
    text: <>The money access for everyone everywhere…</>,
  },
  {
    id: 'ecosystem',
    format: 'split',
    icon: Network,
    emphasis: (
      <>
        &quot;Biomonie&apos;s silver bullet is the ecosystem powered by Biomonie
        affiliates and the ARMs…&quot;
      </>
    ),
    detail: (
      <>
        The key ingredient for the platform&apos;s relevance, impact and
        success.
      </>
    ),
  },
  {
    id: 'global',
    format: 'split',
    icon: Building2,
    emphasis: (
      <>
        <span className="font-black text-biomonie-lemon">BIOMONIE</span> is a
        global payment ecosystem offering individuals and businesses a new form
        of money access
      </>
    ),
    detail: (
      <>
        for everyday payments, credit or cash needs either local or
        cross-border.
      </>
    ),
  },
];

function SlideTypography({ slide }: { slide: Slide }) {
  const measure = 'w-full max-w-[min(100%,40rem)] text-left xl:max-w-[48rem]';

  if (slide.format === 'split') {
    return (
      <div className={`${measure} space-y-0`}>
        <p className={`${linePrimary} text-pretty`}>{slide.emphasis}</p>
        <p
          className={`${lineSupporting} mt-4 border-l-[5px] border-biomonie-lemon/55 pl-4 sm:mt-5 sm:pl-6`}
        >
          {slide.detail}
        </p>
      </div>
    );
  }

  return (
    <p className={`${linePrimary} ${measure} text-pretty`}>{slide.text}</p>
  );
}

const copyMeasure =
  'w-full max-w-[min(100%,40rem)] text-left xl:max-w-[48rem]';

export default function HeroMessageCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, index]);

  const slide = slides[index];
  const Icon = slide.icon;
  const isSplit = slide.format === 'split';
  const imageSrc = sliderImageForSlide(index);

  return (
    <div
      className="relative z-[2] mb-10 w-screen max-w-[100vw] -translate-x-1/2 left-1/2 sm:mb-12 min-[1180px]:mb-14"
      role="region"
      aria-roledescription="carousel"
      aria-label="Key messages"
    >
      <div className="relative isolate min-h-[min(70vh,30rem)] overflow-hidden border-y border-white/[0.12] shadow-[0_12px_48px_rgba(15,30,38,0.45)] sm:min-h-[27rem] sm:rounded-xl sm:border sm:border-white/[0.12] lg:min-h-[30rem] xl:min-h-[32rem]">
        {/* Full-bleed photo — crossfade + subtle scale for depth */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-biomonie-teal-dark/40">
          {reduce ? (
            <img
              src={imageSrc}
              alt=""
              className="h-full w-full object-cover object-top"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          ) : (
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={slide.id}
                className="absolute inset-0 h-full w-full"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={tImage}
              >
                <img
                  src={imageSrc}
                  alt=""
                  className="h-full w-full object-cover object-top"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Brand teal wash — strongest on the left (where type sits), photo stays clear on the right */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-biomonie-teal-dark/[0.88] from-[0%] via-[#173848]/55 via-[42%] to-transparent to-[100%]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0a1419]/35 via-transparent to-transparent"
          aria-hidden
        />

        <div
          className={`relative z-[2] grid min-h-[min(70vh,30rem)] w-full grid-rows-[auto_1fr] px-[5%] pb-8 pt-7 text-left sm:min-h-[27rem] sm:px-8 sm:pb-10 sm:pt-9 lg:min-h-[30rem] lg:px-12 lg:pb-12 lg:pt-11 xl:min-h-[32rem] xl:px-14 ${
            isSplit ? '' : ''
          }`}
        >
          {/* Top left: icon + label — subtle refresh on slide change */}
          {reduce ? (
            <div className="flex items-center justify-start gap-3 sm:gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-biomonie-lemon/[0.14] text-biomonie-lemon ring-1 ring-biomonie-lemon/30 sm:h-11 sm:w-11">
                <Icon className="h-[1.05rem] w-[1.05rem] sm:h-5 sm:w-5" strokeWidth={2} />
              </span>
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)] sm:text-[0.68rem]">
                Spotlight
              </span>
            </div>
          ) : (
            <motion.div
              key={slide.id}
              className="flex items-center justify-start gap-3 sm:gap-3.5"
              initial={{ opacity: 0.85, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={tHeader}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-biomonie-lemon/[0.14] text-biomonie-lemon ring-1 ring-biomonie-lemon/30 sm:h-11 sm:w-11">
                <Icon className="h-[1.05rem] w-[1.05rem] sm:h-5 sm:w-5" strokeWidth={2} />
              </span>
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)] sm:text-[0.68rem]">
                Spotlight
              </span>
            </motion.div>
          )}

          {/* Middle left: copy vertically centered in remaining height */}
          <div className="flex min-h-0 items-center justify-start pt-2 sm:pt-3">
            <div
              className={`relative w-full min-w-0 max-w-[min(100%,44rem)] text-left xl:max-w-[48rem] ${
                isSplit ? 'min-h-[6rem] sm:min-h-[7rem]' : 'min-h-[4rem]'
              }`}
            >
              {reduce ? (
                <SlideTypography slide={slide} />
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  {slide.format === 'split' ? (
                    <motion.div
                      key={slide.id}
                      className={`${copyMeasure} space-y-0`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={tTextOut}
                    >
                      <motion.p
                        className={`${linePrimary} text-pretty`}
                        initial={{ opacity: 0, y: 20, x: -14 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={tTextIn}
                      >
                        {slide.emphasis}
                      </motion.p>
                      <motion.p
                        className={`${lineSupporting} mt-4 border-l-[5px] border-biomonie-lemon/55 pl-4 sm:mt-5 sm:pl-6`}
                        initial={{ opacity: 0, y: 16, x: -10 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ ...tTextIn, delay: tStagger }}
                      >
                        {slide.detail}
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={slide.id}
                      className={copyMeasure}
                      initial={{ opacity: 0, y: 22, x: -14 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: -12, x: 10 }}
                      transition={tTextIn}
                    >
                      <p className={`${linePrimary} text-pretty`}>
                        {slide.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-3 flex justify-center gap-1.5 sm:gap-2"
        role="tablist"
        aria-label="Choose message"
      >
        {slides.map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Message ${i + 1}`}
            className={`h-1.5 cursor-pointer rounded-full transition-[width,background-color,opacity] duration-300 ease-out ${
              i === index
                ? 'w-6 bg-biomonie-lemon sm:w-8'
                : 'w-1.5 bg-white/25 hover:bg-white/45'
            }`}
            onClick={() => setIndex(i)}
            whileHover={reduce ? undefined : { scale: 1.12 }}
            whileTap={reduce ? undefined : { scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 440, damping: 30 }}
          />
        ))}
      </div>
    </div>
  );
}
