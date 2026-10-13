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

const heroStatTitleClass =
  'break-words font-mono text-[0.78rem] font-bold leading-tight tracking-tight text-biomonie-lemon sm:text-[0.9rem] min-[1180px]:text-[clamp(0.8rem,1.05vw,0.95rem)]';
const heroStatDescClass =
  'mt-1.5 max-w-full break-words text-[0.8rem] leading-snug text-white/[0.68]';

/** Centered animated mark above column index (1 / 2 / 3): You · Ecosystem · Partner. */
function HeroColumnMark({ variant }: { variant: 1 | 2 | 3 }) {
  return (
    <div className="mb-2 flex w-full justify-center">
      <div
        className="flex h-[5.5rem] w-[5.5rem] items-center justify-center p-1 sm:h-[6.5rem] sm:w-[6.5rem] xl:h-[7rem] xl:w-[7rem]"
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

function HeroFloatingParticles({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const reduceMotion = useReducedMotion();
  const light = tone === 'light';
  const particles = useMemo<HeroParticle[]>(
    () =>
      Array.from({ length: HERO_DOT_COUNT }, () => ({
        left: `${Math.random() * 100}%`,
        top: light ? `${10 + Math.random() * 90}%` : `${50 + Math.random() * 50}%`,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
        dx: (Math.random() - 0.5) * 180,
        duration: 5 + Math.random() * 8,
        delay: -Math.random() * 8,
      })),
    [light],
  );

  if (reduceMotion) return null;

  return (
    <div
      className={`hero-particles ${light ? 'hero-particles--light' : ''}`}
      aria-hidden
    >
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

/** Pauses the CSS background animations while a section is off screen. */
function useSectionInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: '0px 0px -20% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

type Stat = { k: string; l: string };

/** One of the three teal cards: icon, heading, copy, then CTA and stats pinned to the bottom so they line up across cards. */
function EcosystemCard({
  variant,
  delay,
  heading,
  body,
  cta,
  stats,
}: {
  variant: 1 | 2 | 3;
  delay: number;
  heading: React.ReactNode;
  body: React.ReactNode;
  cta: React.ReactNode;
  stats: Stat[];
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className="group relative mx-auto flex h-full w-full max-w-xl flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(165deg,#336f89_0%,#295C72_42%,#1d4557_100%)] px-6 pb-6 pt-4 shadow-[0_28px_60px_-24px_rgba(15,30,38,0.55),0_2px_6px_rgba(15,30,38,0.08)] ring-1 ring-white/10 transition-shadow duration-300 hover:shadow-[0_36px_70px_-24px_rgba(15,30,38,0.6),0_0_0_1px_rgba(245,255,0,0.25)] sm:px-8 min-[1180px]:max-w-none"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -6 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: easeOutExpo }}
    >
      {/* Card decoration: top sheen and a lemon glow behind the icon. */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,255,0,0.14),transparent_68%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col">
        <HeroColumnMark variant={variant} />
        {heading}
        {body}
        <div className="mb-5 mt-auto flex w-full justify-center">{cta}</div>
        <div className="grid grid-cols-3 gap-x-3 border-t border-white/[0.12] pt-4 sm:gap-x-4 min-[1180px]:min-h-[8.25rem]">
          {stats.map((s) => (
            <div key={s.k} className="min-w-0 text-left">
              <div className={heroStatTitleClass}>{s.k}</div>
              <div className={heroStatDescClass}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

const cardHeadingClass =
  'mb-4 text-center text-[clamp(1.85rem,7.5vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white min-[1180px]:text-[clamp(1.9rem,2.55vw,2.6rem)]';
const cardBodyClass = 'mb-5 mt-0 text-[0.85rem] leading-snug text-white/[0.88]';
const primaryCtaClass =
  'inline-block w-full rounded-lg bg-biomonie-lemon px-6 py-3.5 text-center text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)] sm:w-auto sm:px-9';

export default function EcosystemSection() {
  const [cardsRef, cardsInView] = useSectionInView<HTMLElement>();
  const [billsRef, billsInView] = useSectionInView<HTMLElement>();

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

  const darkBackgroundStyle = {
    '--hero-grad-duration': `${HERO_GRADIENT_DURATION_SEC}s`,
    '--hero-grad-1': HERO_GRADIENT_COLORS.c1,
    '--hero-grad-2': HERO_GRADIENT_COLORS.c2,
    '--hero-grad-3': HERO_GRADIENT_COLORS.c3,
    '--hero-grad-4': HERO_GRADIENT_COLORS.c4,
  } as CSSProperties;

  return (
    <>
      <section
        ref={cardsRef}
        className={`relative overflow-hidden bg-biomonie-pale px-[5%] py-6 sm:py-8 ${cardsInView ? '' : 'hero-animations-paused'}`}
      >
        <HeroFloatingParticles tone="light" />
        <div className="pointer-events-none absolute -right-[10%] -top-[20%] z-[1] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(226,255,2,0.28),transparent_68%)]" />
        <div className="pointer-events-none absolute -bottom-[25%] -left-[10%] z-[1] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(41,92,114,0.16),transparent_70%)]" />

        <div className="relative z-[3] mx-auto grid w-full max-w-[1240px] grid-cols-1 items-stretch gap-8 min-[1180px]:grid-cols-3 min-[1180px]:gap-6 xl:gap-8">
          <EcosystemCard
            variant={1}
            delay={0.05}
            heading={
              <h2 className={cardHeadingClass}>
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
            }
            body={
              <p className={cardBodyClass}>
                <span className="block">
                  <span className="font-semibold text-biomonie-lemon">
                    BIOMONIE
                  </span>{' '}
                  makes you the money access for any and all your payment and
                  cash needs.
                </span>
                <span className="block">
                  No PIN, No password and Nothing else;
                </span>
                <span className="block">
                  Just{' '}
                  <strong className="font-bold text-biomonie-lemon">YOU</strong>
                  .
                </span>
              </p>
            }
            cta={
              <motion.a
                href="/join"
                onClick={(e) => onSectionClick(e, 'join')}
                whileTap={{ scale: 0.98 }}
                className={primaryCtaClass}
              >
                Get Started — It&apos;s Free
              </motion.a>
            }
            stats={[
              { k: 'Net-Gain', l: 'To join and refer.' },
              {
                k: 'Payout',
                l: 'Earned per activated Agent / Merchant referral.',
              },
              { k: 'Low-cost', l: 'Per transaction. Flat, simple and fair.' },
            ]}
          />

          <EcosystemCard
            variant={2}
            delay={0.15}
            heading={
              <p className={cardHeadingClass}>
                <span className="block">Be part</span>
                <span className="block">of the new</span>
                <span className="block text-[0.94em] tracking-[-0.05em]">
                  <span className="text-biomonie-lemon">BIOMONIE</span>
                </span>
                <span className="block text-[0.94em] tracking-[-0.05em]">
                  Ecosystem
                </span>
              </p>
            }
            body={
              <p className={cardBodyClass}>
                <span className="font-semibold text-biomonie-lemon">
                  BIOMONIE
                </span>{' '}
                ecosystem allows Customers pay, Merchants receive payments and
                Agents offer cash-in or cash-out services. All with the new
                money access.
              </p>
            }
            cta={
              <motion.a
                href="/how"
                onClick={(e) => onSectionClick(e, 'how')}
                whileTap={{ scale: 0.98 }}
                className="inline-block w-full rounded-lg border-2 border-white/40 bg-white/[0.04] px-6 py-3 text-center text-base font-semibold text-white no-underline backdrop-blur-[2px] transition duration-200 hover:border-biomonie-lemon hover:bg-white/[0.07] hover:text-biomonie-lemon sm:w-auto sm:px-9"
              >
                Learn How It Works
              </motion.a>
            }
            stats={[
              { k: 'Customers', l: ' can pay with a flex and earn.' },
              {
                k: 'Merchants',
                l: 'can receive payments with a flex and earn.',
              },
              {
                k: 'Agents',
                l: 'can provide agent banking services with a flex and earn.',
              },
            ]}
          />

          <EcosystemCard
            variant={3}
            delay={0.25}
            heading={
              <p className={cardHeadingClass}>
                <span className="block">Join &amp; Earn</span>
                <span className="block">as a</span>
                <span className="block text-[0.94em] tracking-[-0.05em]">
                  <span className="text-biomonie-lemon">BIOMONIE</span>
                </span>
                <span className="block text-[0.94em] tracking-[-0.05em]">
                  Partner
                </span>
              </p>
            }
            body={
              <p className={cardBodyClass}>
                <span className="font-semibold text-biomonie-lemon">
                  BIOMONIE
                </span>{' '}
                Partners allows anyone and everyone to refer customers,
                merchants or agents as Single Level Downline (SLD), earn
                refferal fee and continoulsy earn on transactions they perform
                within the ecosystem.
              </p>
            }
            cta={
              <motion.a
                href="/join"
                onClick={(e) => onSectionClick(e, 'join')}
                whileTap={{ scale: 0.98 }}
                className={primaryCtaClass}
              >
                Join Now — It&apos;s Free
              </motion.a>
            }
            stats={[
              {
                k: 'Refer',
                l: ' everyone and anyone; customers, agents or merchants.',
              },
              { k: 'Earn', l: 'everytime they perform transactions.' },
              { k: 'Grow', l: 'your downlines and earn perpetually.' },
            ]}
          />
        </div>
      </section>

      <section
        ref={billsRef}
        className={`relative overflow-hidden bg-biomonie-teal-dark px-[5%] py-10 sm:py-14 ${billsInView ? '' : 'hero-animations-paused'}`}
        style={darkBackgroundStyle}
      >
        <div className="hero-mesh" aria-hidden />
        <HeroFloatingParticles />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(15,30,38,0.2)_0%,transparent_45%,rgba(15,30,38,0.35)_100%)]" />
        <div className="pointer-events-none absolute -right-[8%] -top-[15%] z-[1] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.09),transparent_72%)]" />
        <div className="pointer-events-none absolute -bottom-[20%] -left-[5%] z-[1] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(41,92,114,.45),transparent_70%)]" />

        <FadeUp
          delay={0.1}
          className="relative z-[3] mx-auto w-full max-w-[1240px]"
        >
          <div id="products">
            {/* Photo and copy sit in two separate cards; on wide screens the photo stretches to the card's height. */}
            <div className="grid grid-cols-1 gap-6 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)] min-[980px]:gap-8">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-2xl shadow-[0_12px_34px_rgba(3,32,46,0.25)] min-[980px]:mx-0 min-[980px]:aspect-auto min-[980px]:h-full min-[980px]:min-h-[380px] min-[980px]:max-w-none">
                <img
                  src={BILLS_IMAGE}
                  alt="Customer paying bills with BIOMONIE"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-biomonie-teal-dark/24 px-5 py-8 text-center shadow-[0_12px_34px_rgba(3,32,46,0.2)] sm:px-10 sm:py-12">
                <h3 className="mb-5 font-sans text-[clamp(1.1rem,1.6vw,1.4rem)] font-extrabold leading-[1.3] text-white">
                  Everyday bills paid{' '}
                  <span className="text-biomonie-lemon">smarter</span> with you
                  always earning. YOU also earn everytime your downlines pay
                  bills too with{' '}
                  <span className="text-biomonie-lemon">BIOMONIE</span> Bills.
                </h3>
                <p className="mx-auto mb-8 max-w-[52ch] text-[1rem] font-semibold leading-relaxed text-white/100">
                  Pay bills with a flex. No friction. Nothing else.{' '}
                  <span className="font-semibold text-biomonie-lemon">YOU</span>{' '}
                  are the money access; every bills payment earns within the{' '}
                  <span className="font-semibold text-biomonie-lemon">
                    BIOMONIE
                  </span>{' '}
                  Ecosystem.
                </p>
                <div className="mx-auto grid w-full max-w-[600px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {billsCategories.map((item) => {
                    const BillIcon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex min-h-[78px] flex-col items-center justify-center rounded-lg border border-biomonie-teal-light/30 bg-white/[0.03] px-2 py-3.5 text-center transition-colors duration-200 hover:border-biomonie-lemon/35 hover:bg-biomonie-lemon/[0.08]"
                      >
                        <BillIcon className="mb-2 h-4 w-4 text-biomonie-lemon/85" />
                        <span className="text-[0.75rem] font-medium leading-snug text-white/85 sm:text-[0.8rem]">
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
      </section>
    </>
  );
}
