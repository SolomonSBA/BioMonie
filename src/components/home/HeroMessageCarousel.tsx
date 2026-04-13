import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { easeOutExpo } from '@/lib/motion';

const INTERVAL_MS = 8000;

const SLIDER_FILENAMES = [
  'Screenshot 2026-04-11 133310.png',
  'shawn-fields-zsppCWsxJy0-unsplash 1.jpg',
  'Screenshot 2026-04-11 133207.png',
  'mubarak-showole-Ve7xjKImd28-unsplash.jpg',
  'Screenshot 2026-04-11 132619.png',
  'eye-for-ebony-3dqSZidOkvs-unsplash.jpg',
  'Screenshot 2026-04-11 132916.png',
];

const slideEase = [0.4, 0, 0.2, 1] as const;

type Slide = {
  id: string;
  eyebrow: string;
  headline: ReactNode;
  sub: ReactNode;
};

const slides: Slide[] = [
  {
    id: 'access',
    eyebrow: 'Your money, your way',
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">YOU</em> are the access
        to your money.
      </>
    ),
    sub: <>Flex, pay or spend and earn.</>,
  },
  {
    id: 'hard',
    eyebrow: 'Hard-earned. Easy spend.',
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">YOU</em> work hard for
        your money.
      </>
    ),
    sub: <>Spending it shouldn&apos;t be hard. Just flex, pay or spend.</>,
  },
  {
    id: 'show',
    eyebrow: 'Show up and earn',
    headline: (
      <>
        Show up, <em className="not-italic text-biomonie-lemon">flex</em> and
        earn.
      </>
    ),
    sub: <>Just transact and earn.</>,
  },
  {
    id: 'safety1',
    eyebrow: 'Secure by design',
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">YOU</em> are your money
        access.
      </>
    ),
    sub: <>Safety always on.</>,
  },
  {
    id: 'safety2',
    eyebrow: 'Zero-compromise security',
    headline: (
      <>
        With <em className="not-italic text-biomonie-lemon">YOU</em> being the
        money access.
      </>
    ),
    sub: <>Safety is always on.</>,
  },
  {
    id: 'netgain',
    eyebrow: 'Every transaction counts',
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">BIOMONIE</em>. Always a
        Net-Gain.
      </>
    ),
    sub: <>Built-in value every time you transact.</>,
  },
  {
    id: 'everywhere',
    eyebrow: 'For everyone, everywhere',
    headline: (
      <>
        The money access for{' '}
        <strong className="text-biomonie-lemon">everyone</strong> everywhere.
      </>
    ),
    sub: <>One ecosystem for customers, merchants and agents.</>,
  },
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

function SlideTextBlock({ slide, reduce }: { slide: Slide; reduce: boolean }) {
  if (reduce) {
    return (
      <>
        <p className="mb-1.5 font-sans text-[0.56rem] font-bold uppercase tracking-[0.17em] text-biomonie-lemon">
          {slide.eyebrow}
        </p>
        <h3 className="mb-2 max-w-[34ch] font-sans text-[clamp(1.05rem,1.9vw,1.5rem)] font-extrabold leading-[1.12] text-white">
          {slide.headline}
        </h3>
        <p className="max-w-[330px] text-[0.8rem] leading-[1.58] text-white/90">
          {slide.sub}
        </p>
      </>
    );
  }

  return (
    <>
      <motion.p
        className="mb-1.5 font-sans text-[0.56rem] font-bold uppercase tracking-[0.17em] text-biomonie-lemon"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: easeOutExpo }}
      >
        {slide.eyebrow}
      </motion.p>
      <motion.h3
        className="mb-2 max-w-[34ch] font-sans text-[clamp(1.05rem,1.9vw,1.5rem)] font-extrabold leading-[1.12] text-white"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: easeOutExpo }}
      >
        {slide.headline}
      </motion.h3>
      <motion.p
        className="max-w-[330px] text-[0.8rem] leading-[1.58] text-white/90"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32, ease: easeOutExpo }}
      >
        {slide.sub}
      </motion.p>
    </>
  );
}

export default function HeroMessageCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const imageSrc = sliderImageForSlide(index);

  useEffect(() => {
    // Preload all slider images to avoid blank frames during transitions.
    SLIDER_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, index]);

  return (
    <div
      className="relative left-1/2 z-[2] mb-10 w-screen max-w-[100vw] -translate-x-1/2 sm:mb-12 min-[1180px]:mb-14"
      role="region"
      aria-roledescription="carousel"
      aria-label="Key messages"
    >
      <div className="relative isolate min-h-[min(25vh,15rem)] overflow-hidden border-y border-white/[0.12] shadow-[0_12px_48px_rgba(15,30,38,0.45)] sm:min-h-[15rem] sm:rounded-xl sm:border sm:border-white/[0.12] lg:min-h-[15rem] xl:min-h-[15rem]">
        <div className="pointer-events-none absolute left-0 top-0 z-[6] h-0 w-0 border-r-[48px] border-t-[48px] border-r-transparent border-t-biomonie-lemon sm:border-r-[64px] sm:border-t-[64px]" />

        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0 flex flex-col-reverse md:flex-row"
            initial={reduce ? false : { opacity: 0.7, x: 38 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -34 }}
            transition={{ duration: 0.52, ease: slideEase }}
          >
            <div className="md:bg-[#050f14]/88 relative z-[2] flex w-full flex-col justify-center bg-[#050f14]/95 px-5 py-5 sm:px-6 md:min-w-[300px] md:max-w-[520px] md:flex-[0_0_46%] md:px-8 md:py-6 lg:px-10">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-[5px] bg-[linear-gradient(180deg,#E2FF02_0%,#295C72_65%,transparent_100%)]" />
              <div className="pointer-events-none absolute -right-5 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full border border-biomonie-lemon/15 md:block">
                <div className="absolute inset-[18px] rounded-full border border-[#C89B3C]/20" />
              </div>

              <div className="relative z-[4] pt-4 md:pt-2">
                <SlideTextBlock slide={slide} reduce={Boolean(reduce)} />
              </div>
            </div>

            <div className="relative min-h-[200px] flex-1 overflow-hidden sm:min-h-[220px] md:min-h-0">
              <img
                src={imageSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[52%] bg-gradient-to-r from-[#060f0a] to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mt-3 flex justify-center gap-1.5 sm:gap-2"
        role="tablist"
        aria-label="Choose message"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Message ${i + 1}`}
            className={`h-[3px] cursor-pointer rounded-sm transition-all duration-300 ${
              i === index
                ? 'w-9 bg-biomonie-lemon'
                : 'w-6 bg-white/20 hover:bg-white/35'
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
