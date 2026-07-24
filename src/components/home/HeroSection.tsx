import { Globe } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { easeOutExpo } from '@/lib/motion';

const HERO_DOT_COUNT = 70;
const HERO_GRADIENT_DURATION_SEC = 18;
const HERO_GRADIENT_COLORS = {
  c1: '#0c1a22',
  c2: '#1f4a61',
  c3: '#2f7393',
  c4: '#0c1a22',
};

type HeroParticle = {
  left: string;
  top: string;
  size: number;
  opacity: number;
  dx: number;
  duration: number;
  delay: number;
};

function HeroFloatingParticles() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo<HeroParticle[]>(
    () =>
      Array.from({ length: HERO_DOT_COUNT }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${50 + Math.random() * 50}%`,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
        dx: (Math.random() - 0.5) * 180,
        duration: 5 + Math.random() * 8,
        delay: -Math.random() * 8,
      })),
    [],
  );

  if (reduceMotion) return null;

  return (
    <div className="hero-particles" aria-hidden>
      {particles.map((p, i) => (
        <div
          key={i}
          className="hero-particle"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              '--dx': `${p.dx}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: '0px 0px -20% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative flex min-h-0 flex-1 flex-col overflow-hidden bg-biomonie-teal-dark px-[5%] pb-4 pt-[120px] min-[1180px]:pt-[124px] ${heroInView ? '' : 'hero-animations-paused'}`}
      style={
        {
          '--hero-grad-duration': `${HERO_GRADIENT_DURATION_SEC}s`,
          '--hero-grad-1': HERO_GRADIENT_COLORS.c1,
          '--hero-grad-2': HERO_GRADIENT_COLORS.c2,
          '--hero-grad-3': HERO_GRADIENT_COLORS.c3,
          '--hero-grad-4': HERO_GRADIENT_COLORS.c4,
        } as CSSProperties
      }
    >
      <div className="hero-mesh" aria-hidden />
      <div className="hero-grid-lines" aria-hidden />
      <HeroFloatingParticles />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(15,30,38,0.2)_0%,transparent_45%,rgba(15,30,38,0.35)_100%)]" />
      <div className="pointer-events-none absolute -right-[8%] -top-[15%] z-[1] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.09),transparent_72%)]" />
      <div className="pointer-events-none absolute -bottom-[20%] -left-[5%] z-[1] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(41,92,114,.45),transparent_70%)]" />

      <div className="relative z-[2] flex w-full flex-1 flex-col">
        <div className="-mt-4 mb-2 flex w-full flex-col items-center gap-3 min-[1180px]:mb-4 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:justify-between">
          <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-biomonie-lemon/40 bg-biomonie-lemon/[0.11] px-3 py-2 text-left text-[0.62rem] font-bold uppercase leading-snug tracking-[0.12em] text-biomonie-lemon shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-4 sm:text-[0.72rem] sm:tracking-[0.14em]">
            <Globe className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
            <p className="text-[1rem]">
              The First-Ever Global Biometric{' '}
              <span className="block">Cardless Payment Ecosystem</span>{' '}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {reduce ? (
            <h1 className="font-sans text-[clamp(2.75rem,10vw,7rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white">
              <span className="block">Coming</span>
              <span className="block text-biomonie-lemon drop-shadow-[0_0_48px_rgba(245,255,0,0.22)]">
                Soon!!!
              </span>
            </h1>
          ) : (
            <motion.h1
              className="font-sans text-[clamp(2.75rem,10vw,7rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, ease: easeOutExpo }}
            >
              <span className="block [-webkit-text-stroke:3px_white]">
                Coming
              </span>
              <span className="block text-biomonie-lemon drop-shadow-[0_0_48px_rgba(245,255,0,0.22)] [-webkit-text-stroke:3px_#f5ff00]">
                Soon!!!
              </span>
            </motion.h1>
          )}
        </div>
      </div>
    </section>
  );
}
