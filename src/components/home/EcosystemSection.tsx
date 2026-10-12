import { motion, useReducedMotion } from 'framer-motion';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import {
  Smartphone,
  Zap,
  Tv,
  Droplets,
  GraduationCap,
  Landmark,
  Shield,
  Dice5,
  Plus,
} from 'lucide-react';
import { easeOutExpo } from '@/lib/motion';
import { navigateToSection } from '@/lib/section-nav';
import HeroColumnScene from '@/components/home/HeroColumnScenes';

/** Stat tiles: 3 across on desktop hero; minmax(0,1fr) + min-w-0 cells prevents middle-column overlap.
 *  Equal min-height on desktop so shorter stat rows don’t steal flex space and push CTAs out of alignment. */
const heroStatGridClass =
  'mt-4 grid w-full min-w-0 grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 sm:gap-y-6 min-[1180px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] min-[1180px]:gap-x-2 min-[1180px]:gap-y-0 min-[1180px]:min-h-[9rem] xl:gap-x-3';
const heroStatTitleClass =
  'break-words font-mono text-[clamp(0.72rem,1.15vw,1.35rem)] font-bold leading-tight tracking-tight text-biomonie-lemon';
const heroStatDescClass =
  'mt-1.5 max-w-full break-words text-[0.8rem] leading-snug text-white/[0.68]';

/** Centered animated mark above column index (1 / 2 / 3): You · Ecosystem · Partner. */
function HeroColumnMark({ variant }: { variant: 1 | 2 | 3 }) {
  return (
    <div className="mb-3 flex w-full justify-center min-[1180px]:mb-4">
      <div
        className="flex h-[6.5rem] w-[6.5rem] items-center justify-center p-1 sm:h-[7.5rem] sm:w-[7.5rem] xl:h-[8.5rem] xl:w-[8.5rem]"
        aria-hidden
      >
        <HeroColumnScene variant={variant} />
      </div>
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.58, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

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

// Placeholder until the final bills photo is supplied.
const BILLS_IMAGE = encodeURI(
  '/imageforsection/Biomonie Bills Image.png',
);

export default function EcosystemSection() {
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
  const billsCategories = [
    { label: 'Airtime & Data', icon: Smartphone },
    { label: 'Electricity Prepaid / Postpaid', icon: Zap },
    { label: 'Cable TV & Internet', icon: Tv },
    { label: 'Water & Waste Management', icon: Droplets },
    { label: 'Govt Levies & Taxes', icon: Landmark },
    { label: 'Insurance Premiums', icon: Shield },
    { label: 'Betting Wallet Funding', icon: Dice5 },
    { label: 'School Fees & Exam Pins', icon: GraduationCap },
    { label: 'And more', icon: Plus },
  ] as const;

  const onSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateToSection(id);
  };

  return (
    <section
      ref={heroRef}
      className={`relative flex flex-col justify-center overflow-hidden bg-biomonie-teal-dark px-[5%] py-[90px] ${heroInView ? '' : 'hero-animations-paused'}`}
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

      <div className="relative z-[2] flex w-full flex-col">

        <div className="relative mx-auto grid w-full max-w-[1680px] grid-cols-1 items-stretch gap-y-14 min-[1180px]:grid-cols-3 min-[1180px]:gap-x-6 min-[1180px]:gap-y-0 xl:gap-x-8">
          {/* <div className="min-[1024px]:col-span-3">
          
        </div> */}
          {/* Push this panel toward the center divider: outer flex justify-end + inner max-width (not w-full on outer). */}
          <div className="w-full min-w-0 max-[1179px]:mx-auto max-[1179px]:max-w-xl lg:pr-10 min-[1180px]:flex min-[1180px]:h-full min-[1180px]:min-h-0 min-[1180px]:max-w-none min-[1180px]:flex-col min-[1180px]:items-start min-[1180px]:justify-start min-[1180px]:pr-6">
            <div className="flex w-full max-w-[540px] flex-col text-left max-[1179px]:mx-auto min-[1180px]:h-full min-[1180px]:min-h-0 min-[1180px]:flex-1">
              <HeroColumnMark variant={1} />
              <div className="flex min-h-0 flex-col min-[1180px]:flex-1">
                <div className="min-[1180px]:overflow-visible">
                  <FadeUp delay={0.08}>
                    <h2 className="mb-5 text-center text-[clamp(0.95rem,3.5vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white min-[1180px]:min-h-0">
                      <span className="block">Explore the </span>
                      <span className="block"> new form of</span>
                      <span className="block text-[0.94em] tracking-[-0.05em] sm:whitespace-nowrap">
                        Money Access
                      </span>
                      <em className="not-italic">
                        &quot;
                        <span className="text-biomonie-lemon drop-shadow-[0_0_40px_rgba(245,255,0,0.15)]">
                          YOU
                        </span>
                        &quot;
                      </em>
                    </h2>
                  </FadeUp>
                  <FadeUp delay={0.16}>
                    <p className="mb-5 mt-0 max-w-[540px] text-[0.8rem] leading-snug text-white/[0.88] min-[1180px]:min-h-[92px]">
                      <span className="block">
                        <span className="font-semibold text-biomonie-lemon">
                          BIOMONIE
                        </span>{' '}
                        makes you the money access for any and all your payment
                        and cash needs.
                      </span>
                      <span className="block">
                        No PIN, No password and Nothing else;
                      </span>

                      <span className="block">
                        Just{' '}
                        <strong className="font-bold text-biomonie-lemon">
                          YOU
                        </strong>
                        .
                      </span>
                    </p>
                  </FadeUp>
                </div>

                <FadeUp delay={0.22} className="w-full min-[1180px]:mt-0">
                  <div className="mb-6 flex w-full flex-shrink-0 flex-wrap justify-center gap-3 sm:gap-4 min-[1180px]:mb-3 min-[1180px]:justify-center">
                    <motion.a
                      href="/join"
                      onClick={(e) => onSectionClick(e, 'join')}
                      whileTap={{ scale: 0.98 }}
                      className="inline-block w-full self-start rounded-lg bg-biomonie-lemon px-6 py-3.5 text-center text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)] sm:w-auto sm:px-9"
                    >
                      Get Started — It&apos;s Free
                    </motion.a>
                  </div>
                </FadeUp>
              </div>

              <FadeUp delay={0.28}>
                <div className={heroStatGridClass}>
                  {[
                    { k: 'Net-Gain', l: 'To join and refer.' },
                    {
                      k: 'Payout',
                      l: 'Earned per activated Agent / Merchant referral.',
                    },
                    {
                      k: 'Low-cost',
                      l: 'Per transaction. Flat, simple and fair.',
                    },
                  ].map((s) => (
                    <div key={s.k} className="min-w-0 text-left">
                      <div className={heroStatTitleClass}>{s.k}</div>
                      <div className={heroStatDescClass}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>

          <motion.div
            className="relative w-full min-w-0 max-[1179px]:mx-auto max-[1179px]:max-w-xl min-[1180px]:mx-0 min-[1180px]:flex min-[1180px]:h-full min-[1180px]:min-h-0 min-[1180px]:max-w-none min-[1180px]:flex-col min-[1180px]:pl-6"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: easeOutExpo }}
          >
            <HeroColumnMark variant={2} />
            <div className="pointer-events-none absolute left-0 top-0 hidden h-[610px] w-px bg-white/[0.28] min-[1180px]:block" />
            <div className="flex min-h-0 flex-col min-[1180px]:flex-1">
              <div className="min-[1180px]:overflow-visible">
                <p className="mb-5 text-center text-[clamp(0.95rem,3.5vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white min-[1180px]:min-h-0">
                  <span className="block">Be part</span>
                  <span className="block">of the new</span>
                  <span className="block text-[0.94em] tracking-[-0.05em]">
                    <span className="text-biomonie-lemon">BIOMONIE</span>
                  </span>
                  <span className="block text-[0.94em] tracking-[-0.05em]">
                    Ecosystem
                  </span>
                </p>

                <p className="mb-5 mt-0 text-[0.8rem] leading-snug text-white/[0.88] min-[1180px]:min-h-[92px] min-[1180px]:max-w-[540px]">
                  <span className="font-semibold text-biomonie-lemon">
                    BIOMONIE
                  </span>{' '}
                  ecosystem allows Customers pay, Merchants receive payments and
                  Agents offer cash-in or cash-out services. All with the new
                  money access.{' '}
                  {/* <span className="font-semibold text-biomonie-lemon">YOU</span>. */}
                </p>
              </div>

              <div className="mb-6 flex w-full flex-shrink-0 flex-wrap justify-center gap-3 sm:gap-4 min-[1180px]:mb-3 min-[1180px]:mt-0 min-[1180px]:justify-center">
                <motion.a
                  href="/how"
                  onClick={(e) => onSectionClick(e, 'how')}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full rounded-lg border-2 border-white/40 bg-white/[0.04] px-6 py-3.5 text-center text-base font-semibold text-white no-underline backdrop-blur-[2px] transition duration-200 hover:border-biomonie-lemon hover:bg-white/[0.07] hover:text-biomonie-lemon sm:w-auto sm:px-9"
                >
                  Learn How It Works
                </motion.a>
              </div>
            </div>

            <div className={heroStatGridClass}>
              {[
                { k: 'Customers', l: ' can pay with a flex and earn.' },
                {
                  k: 'Merchants',
                  l: 'can receive payments with a flex and earn.',
                },
                {
                  k: 'Agents',
                  l: 'can provide agent banking services with a flex and earn.',
                },
              ].map((s) => (
                <div key={s.k} className="min-w-0 text-left">
                  <div className={heroStatTitleClass}>{s.k}</div>
                  <div className={heroStatDescClass}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative w-full min-w-0 max-[1179px]:mx-auto max-[1179px]:max-w-xl min-[1180px]:mx-0 min-[1180px]:flex min-[1180px]:h-full min-[1180px]:min-h-0 min-[1180px]:max-w-none min-[1180px]:flex-col min-[1180px]:pl-6"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: easeOutExpo }}
          >
            <HeroColumnMark variant={3} />
            <div className="pointer-events-none absolute left-0 top-0 hidden h-[610px] w-px bg-white/[0.28] min-[1180px]:block" />
            <div className="flex min-h-0 flex-col min-[1180px]:flex-1">
              <div className="min-[1180px]:overflow-visible">
                <p className="mb-5 text-center text-[clamp(0.95rem,3.5vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white min-[1180px]:min-h-0">
                  <span className="block">Join &amp; Earn</span>
                  <span className="block">as a</span>
                  <span className="block text-[0.94em] tracking-[-0.05em]">
                    <span className="text-biomonie-lemon">BIOMONIE</span>
                  </span>
                  <span className="block text-[0.94em] tracking-[-0.05em]">
                    Partner
                  </span>
                </p>

                <p className="mb-5 mt-0 text-[0.8rem] leading-snug text-white/[0.88] min-[1180px]:min-h-[92px] min-[1180px]:max-w-[540px]">
                  <span className="font-semibold text-biomonie-lemon">
                    BIOMONIE
                  </span>{' '}
                  Partners allows anyone and everyone to refer customers,
                  merchants or agents as Single Level Downline (SLD), earn
                  refferal fee and continoulsy earn on transactions they perform
                  within the ecosystem.{' '}
                  {/* <span className="font-semibold text-biomonie-lemon">YOU</span>. */}
                </p>
              </div>

              <div className="mb-6 flex w-full flex-shrink-0 flex-wrap justify-center gap-3 sm:gap-4 min-[1180px]:mb-3 min-[1180px]:mt-0 min-[1180px]:justify-center">
                <motion.a
                  href="/join"
                  onClick={(e) => onSectionClick(e, 'join')}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full self-start rounded-lg bg-biomonie-lemon px-6 py-3.5 text-center text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)] sm:w-auto sm:px-9"
                >
                  Join Now — It&apos;s Free
                </motion.a>
              </div>
            </div>

            <div className={heroStatGridClass}>
              {[
                {
                  k: 'Refer',
                  l: ' everyone and anyone; customers, agents or merchants.',
                },
                {
                  k: 'Earn',
                  l: 'everytime they perform transactions.',
                },
                {
                  k: 'Grow',
                  l: 'your downlines and earn perpetually.',
                },
              ].map((s) => (
                <div key={`third-${s.k}`} className="min-w-0 text-left">
                  <div className={heroStatTitleClass}>{s.k}</div>
                  <div className={heroStatDescClass}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <FadeUp
          delay={0.34}
          className="relative mx-auto mt-8 w-full max-w-[1680px]"
        >
          <div
            id="products"
            className="bg-biomonie-teal-dark/24 overflow-hidden rounded-2xl shadow-[0_12px_34px_rgba(3,32,46,0.2)]"
          >
            <div className="grid grid-cols-1 items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] min-[980px]:gap-12">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-xl border border-biomonie-teal-light/30 shadow-[0_12px_34px_rgba(3,32,46,0.25)] min-[980px]:mx-0 min-[980px]:max-w-none">
                <img
                  src={BILLS_IMAGE}
                  alt="Customer paying bills with BIOMONIE"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <div className="mx-auto w-full max-w-[640px] text-center">
                <h3 className="mb-5 font-sans text-[clamp(1.1rem,1.6vw,1.4rem)] font-extrabold leading-[1.3] text-white">
                  Everyday bills paid{' '}
                  <span className="text-biomonie-lemon">smarter</span> with you
                  always earning. YOU also earn everytime your downlines pay
                  bills too with{' '}
                  <span className="text-biomonie-lemon">BIOMONIE</span> Bills.
                </h3>
                <p className="mx-auto mb-7 max-w-[52ch] text-[1rem] font-semibold leading-relaxed text-white/100">
                  Pay bills with a flex. No friction. Nothing else.{' '}
                  <span className="font-semibold text-biomonie-lemon">YOU</span>{' '}
                  are the money access; every bills payment earns within the{' '}
                  <span className="font-semibold text-biomonie-lemon">
                    BIOMONIE
                  </span>{' '}
                  Ecosystem.
                </p>
                <button
                  type="button"
                  className="mb-8 inline-block w-full rounded-lg bg-biomonie-lemon px-6 py-3.5 text-center text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)] sm:w-auto sm:px-9"
                >
                  Get Started & PAY BILLS Now...
                </button>
                <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-3">
                  {billsCategories.map((item) => {
                    const BillIcon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex min-h-[64px] flex-col items-center justify-center rounded-md border border-biomonie-teal-light/30 bg-white/[0.03] px-2 py-3 text-center transition-colors duration-200 hover:border-biomonie-lemon/35 hover:bg-biomonie-lemon/[0.08]"
                      >
                        <BillIcon className="mb-1.5 h-3.5 w-3.5 text-biomonie-lemon/85" />
                        <span className="text-[0.72rem] font-medium leading-snug text-white/80">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
