import { motion, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { Globe } from 'lucide-react';
import { easeOutExpo } from '@/lib/motion';
import { navigateToSection } from '@/lib/section-nav';

function ColumnLabel({ n }: { n: 1 | 2 | 3 }) {
  return (
    <p
      className="mb-6 text-[1.75rem] font-extrabold tabular-nums leading-none text-biomonie-lemon min-[1024px]:mb-7"
      aria-label={`Column ${n}`}
    >
      {n}
    </p>
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

export default function HeroSection() {
  const reduce = useReducedMotion();
  const onSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateToSection(id);
  };

  return (
    <section className="biomonie-grain relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-biomonie-teal-dark via-biomonie-teal-mid to-[#1e5c78] px-[5%] pb-24 pt-[120px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,38,0.2)_0%,transparent_45%,rgba(15,30,38,0.35)_100%)]" />
      <div className="pointer-events-none absolute -right-[8%] -top-[15%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.09),transparent_72%)]" />
      <div className="pointer-events-none absolute -bottom-[20%] -left-[5%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(41,92,114,.45),transparent_70%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="justify-left mr-18 mb-8 flex min-[1024px]:mb-10">
        <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-biomonie-lemon/40 bg-biomonie-lemon/[0.11] px-4 py-2 text-left text-[0.72rem] font-bold uppercase leading-snug tracking-[0.14em] text-biomonie-lemon shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <Globe className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
          The First-Ever Global Biometric Cardless Payment Ecosystem
        </div>
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-[1680px] grid-cols-1 items-stretch gap-y-14 min-[1024px]:grid-cols-3 min-[1024px]:gap-x-8 min-[1024px]:gap-y-0">
        {/* <div className="min-[1024px]:col-span-3">
          
        </div> */}
        {/* Push this panel toward the center divider: outer flex justify-end + inner max-width (not w-full on outer). */}
        <div className="min-w-0 lg:pr-10 min-[1024px]:flex min-[1024px]:h-full min-[1024px]:min-h-0 min-[1024px]:flex-col min-[1024px]:items-start min-[1024px]:justify-start min-[1024px]:pr-6">
          <div className="flex w-full max-w-[540px] flex-col text-left min-[1024px]:h-full min-[1024px]:min-h-0 min-[1024px]:flex-1">
            <ColumnLabel n={1} />
            <div className="flex min-h-0 flex-col min-[1024px]:flex-1">
              <div className="min-[1024px]:overflow-visible">
                <FadeUp delay={0.08}>
                  <h1 className="mb-5 text-[clamp(2.1rem,4.65vw,4.05rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white min-[1024px]:min-h-0">
                    <span className="block">Explore the </span>
                    <span className="block"> new form of</span>
                    <span className="block whitespace-nowrap text-[0.94em] tracking-[-0.05em]">
                      Money Access
                    </span>
                    <em className="not-italic">
                      &quot;
                      <span className="text-biomonie-lemon drop-shadow-[0_0_40px_rgba(245,255,0,0.15)]">
                        YOU
                      </span>
                      &quot;
                    </em>
                  </h1>
                </FadeUp>
                <FadeUp delay={0.16}>
                  <p className="mb-10 mt-0 max-w-[500px] text-[1.08rem] leading-[1.75] text-white/[0.88] min-[1024px]:min-h-[132px]">
                    <span className="font-semibold text-biomonie-lemon">
                      BIOMONIE
                    </span>{' '}
                    allows you to be the money access for all your payments and
                    cash needs. No pin. No password.{' '}
                    <span className="whitespace-nowrap">
                      Just{' '}
                      <strong className="font-bold text-biomonie-lemon">
                        YOU
                      </strong>
                      .
                    </span>
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.22} className="w-full min-[1024px]:mt-auto">
                <div className="mb-14 flex w-full flex-wrap justify-start gap-3 sm:gap-4">
                  <motion.a
                    href="/join"
                    onClick={(e) => onSectionClick(e, 'join')}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block self-start rounded-lg bg-biomonie-lemon px-9 py-3.5 text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)]"
                  >
                    Get Started — It&apos;s Free
                  </motion.a>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.28}>
              <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-3 min-[1024px]:justify-items-start min-[1024px]:gap-x-5 min-[1280px]:grid-cols-3">
                {[
                  { k: 'Net-Zero', l: 'Cost to join and refer' },
                  {
                    k: 'Payout',
                    l: 'Earned per activated Agent / Merchant referral',
                  },
                  { k: 'Low-cost', l: 'Per transaction flat, simple, fair' },
                ].map((s) => (
                  <div key={s.k} className="text-left">
                    <div className="font-mono text-[1.80rem] font-bold leading-none tracking-tight text-biomonie-lemon">
                      {s.k}
                    </div>
                    <div className="mt-1.5 max-w-[11.5rem] text-[0.8rem] leading-snug text-white/[0.68] min-[1024px]:max-w-[10rem]">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>

        <motion.div
          className="relative min-[1024px]:flex min-[1024px]:h-full min-[1024px]:min-h-0 min-[1024px]:flex-col min-[1024px]:pl-6"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: easeOutExpo }}
        >
          <ColumnLabel n={2} />
          <div className="pointer-events-none absolute left-0 top-0 hidden h-[610px] w-px bg-white/[0.28] min-[1024px]:block" />
          <div className="flex min-h-0 flex-col min-[1024px]:flex-1">
            <div className="min-[1024px]:overflow-visible">
              <p className="mb-5 text-[clamp(2.1rem,4.65vw,4.05rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white min-[1024px]:min-h-0">
                <span className="block">Be part</span>
                <span className="block">of the new</span>
                <span className="block text-[0.94em] tracking-[-0.05em]">
                  <span className="text-biomonie-lemon">BIOMONIE</span>{' '}
                  Ecosystem
                </span>
              </p>

              <p className="mb-10 mt-0 text-[1.08rem] leading-[1.75] text-white/[0.88] min-[1024px]:min-h-[132px] min-[1024px]:max-w-[540px]">
                <span className="font-semibold text-biomonie-lemon">
                  BIOMONIE
                </span>{' '}
                ecosystem allows customers to pay, merchants receive payments,
                and agents offer cash-in and cash-out services. All with the new
                money access —{' '}
                <span className="font-semibold text-biomonie-lemon">YOU</span>.
              </p>
            </div>

            <div className="mb-16 flex flex-wrap justify-start gap-3 sm:gap-4 min-[1024px]:mt-auto min-[1024px]:justify-start">
              <motion.a
                href="/how"
                onClick={(e) => onSectionClick(e, 'how')}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-lg border-2 border-white/40 bg-white/[0.04] px-9 py-3.5 text-base font-semibold text-white no-underline backdrop-blur-[2px] transition duration-200 hover:border-biomonie-lemon hover:bg-white/[0.07] hover:text-biomonie-lemon"
              >
                Learn How It Works
              </motion.a>
            </div>
          </div>

          <div className="min-[1024px]:justify-items-left mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-3 min-[1024px]:gap-x-5 min-[1280px]:grid-cols-3">
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
              <div key={s.k} className="text-left">
                <div className="font-mono text-[1.80rem] font-bold leading-none tracking-tight text-biomonie-lemon">
                  {s.k}
                </div>
                <div className="mt-1.5 max-w-[11.5rem] text-[0.8rem] leading-snug text-white/[0.68] min-[1024px]:max-w-[10rem]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-[1024px]:flex min-[1024px]:h-full min-[1024px]:min-h-0 min-[1024px]:flex-col min-[1024px]:pl-6"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: easeOutExpo }}
        >
          <ColumnLabel n={3} />
          <div className="pointer-events-none absolute left-0 top-0 hidden h-[610px] w-px bg-white/[0.28] min-[1024px]:block" />
          <div className="flex min-h-0 flex-col min-[1024px]:flex-1">
            <div className="min-[1024px]:overflow-visible">
              <p className="mb-5 text-[clamp(2.1rem,4.65vw,4.05rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white min-[1024px]:min-h-0">
                <span className="block">Join &amp; Earn</span>
                <span className="block">as a</span>
                <span className="block text-[0.94em] tracking-[-0.05em]">
                  <span className="text-biomonie-lemon">BIOMONIE</span>{' '}
                  Affiliate
                </span>
              </p>

              <p className="mb-10 mt-0 text-[1.08rem] leading-[1.75] text-white/[0.88] min-[1024px]:min-h-[132px] min-[1024px]:max-w-[540px]">
                <span className="font-semibold text-biomonie-lemon">
                  BIOMONIE
                </span>{' '}
                affilates allows customers , merchants and agents to refer
                fellow customers,  merchants, and agents. earn transcation perform —{' '}
                <span className="font-semibold text-biomonie-lemon">YOU</span>.
              </p>
            </div>

            <div className="mb-16 flex flex-wrap justify-start gap-3 sm:gap-4 min-[1024px]:mt-auto min-[1024px]:justify-start">
              <motion.a
                href="/join"
                onClick={(e) => onSectionClick(e, 'join')}
                whileTap={{ scale: 0.98 }}
                className="inline-block self-start rounded-lg bg-biomonie-lemon px-9 py-3.5 text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)]"
              >
                Join Now — It&apos;s Free
              </motion.a>
            </div>
          </div>

          <div className="min-[1024px]:justify-items-left mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-3 min-[1024px]:gap-x-5 min-[1280px]:grid-cols-3">
            {[
              { k: 'Refer', l: ' everyone and anyone; customers, agents, merchants.' },
              {
                k: 'Earn',
                l: 'everytime they perform transactions.',
              },
              {
                k: 'Grow',
                l: 'grow your downlines and earn perpetually.',
              },
            ].map((s) => (
              <div key={`third-${s.k}`} className="text-left">
                <div className="font-mono text-[1.80rem] font-bold leading-none tracking-tight text-biomonie-lemon">
                  {s.k}
                </div>
                <div className="mt-1.5 max-w-[11.5rem] text-[0.8rem] leading-snug text-white/[0.68] min-[1024px]:max-w-[10rem]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
