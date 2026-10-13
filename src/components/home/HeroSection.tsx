import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import StoreBadges from '@/components/home/StoreBadges';
import LanguageTaglines from '@/components/LanguageTaglines';
import { easeOutExpo } from '@/lib/motion';

const INTERVAL_MS = 6000;

type Slide = {
  id: string;
  /** Background photo; placeholders until the final hero photos are supplied. */
  image: string;
  headline: ReactNode;
  sub: ReactNode;
};

const img = (name: string) => encodeURI(`/imageforslider/${name}`);

const slides: Slide[] = [
  {
    id: 'everywhere',
    image: img('Slide6.jpeg'),
    headline: <>The money access for everyone everywhere.</>,
    sub: (
      <>
        No card to carry, no PIN to remember, no password to forget. Just show
        up and pay with your finger or face.
      </>
    ),
  },
  {
    id: 'access',
    image: img(
      'slide1.png',
    ),
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
    image: img(
      'YOUworkhardforyourmoney.jpg',
    ),
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
    image: img(
      'Showupflexandearnimage.jpg',
    ),
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
    image: img('YOUareyourmoneyaccessimage.jpg'),
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
    image: img(
      'WithYoubeingtheMoneyAccess.jpg',
    ),
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
    image: img('BimoniealwaysaNetgain.jpg'),
    headline: (
      <>
        <em className="not-italic text-biomonie-lemon">BIOMONIE</em>. Always a
        Net-Gain.
      </>
    ),
    sub: <>Built-in value every time you transact.</>,
  },
];

function SlideText({ slide, reduce }: { slide: Slide; reduce: boolean }) {
  const enter = (delay: number, y: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
          transition: { duration: 0.6, delay, ease: easeOutExpo },
        };

  return (
    <div>
      <motion.h1
        {...enter(0.1, 22)}
        className="mb-5 max-w-[13ch] font-sans text-[clamp(2.5rem,6.4vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
      >
        {slide.headline}
      </motion.h1>
      <motion.p
        {...enter(0.22, 14)}
        className="max-w-[44ch] text-[clamp(0.98rem,1.4vw,1.15rem)] leading-relaxed text-white/90"
      >
        {slide.sub}
      </motion.p>
    </div>
  );
}

export default function HeroSection() {
  const reduce = Boolean(useReducedMotion());
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    // Preload every photo so slides never flash blank.
    slides.forEach((s) => {
      const image = new Image();
      image.src = s.image;
    });
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => window.clearTimeout(id);
  }, [reduce, index]);

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-biomonie-teal-dark"
      aria-roledescription="carousel"
      aria-label="BIOMONIE highlights"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0 -z-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          <motion.img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover object-[65%_20%] sm:object-[center_25%]"
            initial={reduce ? false : { scale: 1.08 }}
            animate={reduce ? undefined : { scale: 1 }}
            transition={{ duration: INTERVAL_MS / 1000 + 1.2, ease: 'linear' }}
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        </motion.div>
      </AnimatePresence>

      {/* Darken the left for legible text, and the top behind the fixed header. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,22,28,0.88)_0%,rgba(10,22,28,0.62)_45%,rgba(10,22,28,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(180deg,rgba(10,22,28,0.7),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(0deg,rgba(10,22,28,0.75),transparent)]" />

      <div className="relative mx-auto w-full max-w-[1280px] px-[5%] pb-24 pt-[140px] sm:pt-[160px] xl:px-[4%]">
        <p className="mb-5 max-w-[30ch] font-sans text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold italic leading-snug text-biomonie-lemon">
          The First-Ever Global Biometric Cardless Payment Ecosystem
        </p>

        <div className="min-h-[clamp(15rem,34vw,22rem)]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <SlideText key={slide.id} slide={slide} reduce={reduce} />
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <StoreBadges />
          <LanguageTaglines className="shrink-0" />
        </div>
      </div>

      <div
        className="absolute bottom-8 left-[5%] flex gap-2 xl:left-[max(4%,calc((100vw-1280px)/2+4%))]"
        role="tablist"
        aria-label="Choose slide"
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="group relative h-6 cursor-pointer"
          >
            <span
              className={`block h-[3px] rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-10 bg-biomonie-lemon'
                  : 'w-6 bg-white/35 group-hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
