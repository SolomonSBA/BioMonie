import { motion, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import {
  Globe,
  ShieldCheck,
  Lock,
  CheckCircle2,
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
import HeroMessageCarousel from '@/components/home/HeroMessageCarousel';

/** Stat tiles: 3 across on desktop hero; minmax(0,1fr) + min-w-0 cells prevents middle-column overlap.
 *  Equal min-height on desktop so shorter stat rows don’t steal flex space and push CTAs out of alignment. */
const heroStatGridClass =
  'mt-4 grid w-full min-w-0 grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 sm:gap-y-6 min-[1180px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] min-[1180px]:gap-x-2 min-[1180px]:gap-y-0 min-[1180px]:min-h-[9rem] xl:gap-x-3';
const heroStatTitleClass =
  'break-words font-mono text-[clamp(0.72rem,1.15vw,1.35rem)] font-bold leading-tight tracking-tight text-biomonie-lemon';
const heroStatDescClass =
  'mt-1.5 max-w-full break-words text-[0.8rem] leading-snug text-white/[0.68]';

/** Centered mark above column index (1 / 2 / 3). Assets live in /public. */
function HeroColumnMark({ variant }: { variant: 1 | 2 | 3 }) {
  const src =
    variant === 1 ? '/stickMan.svg' : variant === 2 ? '/7.png' : '/8.png';
  return (
    <div className="mb-3 flex w-full justify-center min-[1180px]:mb-4">
      <div
        className="flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-2xl sm:h-[7.5rem] sm:w-[7.5rem] xl:h-[8.5rem] xl:w-[8.5rem]"
        aria-hidden
      >
        <img
          src={src}
          alt=""
          width={100}
          height={100}
          className="max-h-[96%] max-w-[96%] object-contain object-center"
        />
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

export default function HeroSection() {
  const reduce = useReducedMotion();
  const billsCategories = [
    { label: 'Airtime & Data', icon: Smartphone },
    { label: 'Electricity Prepaid / Postpaid', icon: Zap },
    { label: 'Cable TV & Internet', icon: Tv },
    { label: 'Water & Waste Management', icon: Droplets },
    { label: 'And more...', icon: Plus },
    { label: 'Govt Levies & Taxes', icon: Landmark },
    { label: 'Insurance Premiums', icon: Shield },
    { label: 'Betting Wallet Funding', icon: Dice5 },
    { label: 'School Fees & Exam Pins', icon: GraduationCap },
  ] as const;

  const reachStats = [
    { title: 'Sponsor', detail: 'Funds the disbursement' },
    { title: 'Beneficiary', detail: 'Receives - confirmed, no leakage' },
  ] as const;

  const collectStats = [
    { title: 'Sponsor', detail: 'Authorises the collection' },
    { title: 'Vendor', detail: 'Dispenses goods or vouchers' },
    { title: 'Beneficiary', detail: 'Collects - verified, fraud-proof' },
  ] as const;

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
      <div className="mb-8 flex justify-center min-[1180px]:mb-10 min-[1180px]:justify-start">
        <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-biomonie-lemon/40 bg-biomonie-lemon/[0.11] px-3 py-2 text-left text-[0.62rem] font-bold uppercase leading-snug tracking-[0.12em] text-biomonie-lemon shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-4 sm:text-[0.72rem] sm:tracking-[0.14em]">
          <Globe className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
          The First-Ever Global Biometric Cardless Payment Ecosystem
        </div>
      </div>

      <HeroMessageCarousel />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1680px] grid-cols-1 items-stretch gap-y-14 min-[1180px]:grid-cols-3 min-[1180px]:gap-x-6 min-[1180px]:gap-y-0 xl:gap-x-8">
        {/* <div className="min-[1024px]:col-span-3">
          
        </div> */}
        {/* Push this panel toward the center divider: outer flex justify-end + inner max-width (not w-full on outer). */}
        <div className="w-full min-w-0 max-[1179px]:mx-auto max-[1179px]:max-w-xl lg:pr-10 min-[1180px]:flex min-[1180px]:h-full min-[1180px]:min-h-0 min-[1180px]:max-w-none min-[1180px]:flex-col min-[1180px]:items-start min-[1180px]:justify-start min-[1180px]:pr-6">
          <div className="flex w-full max-w-[540px] flex-col text-left max-[1179px]:mx-auto min-[1180px]:h-full min-[1180px]:min-h-0 min-[1180px]:flex-1">
            <HeroColumnMark variant={1} />
            <div className="flex min-h-0 flex-col min-[1180px]:flex-1">
              <div className="min-[1180px]:overflow-visible">
                <FadeUp delay={0.08}>
                  <h1 className="mb-5 text-center text-[clamp(0.95rem,3.5vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white min-[1180px]:min-h-0">
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
                  </h1>
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
                      No pin, No password and Nothing else;
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
                  Affiliate
                </span>
              </p>

              <p className="mb-5 mt-0 text-[0.8rem] leading-snug text-white/[0.88] min-[1180px]:min-h-[92px] min-[1180px]:max-w-[540px]">
                <span className="font-semibold text-biomonie-lemon">
                  BIOMONIE
                </span>{' '}
                Affiliates allows anyone and everyone to refer customers,
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
        className="relative z-[2] mx-auto mt-8 w-full max-w-[1680px]"
      >
        <div className="bg-biomonie-teal-dark/24 overflow-hidden rounded-2xl shadow-[0_12px_34px_rgba(3,32,46,0.2)]">
          <div className="grid grid-cols-1 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="bg-biomonie-teal-dark/24 relative flex items-center justify-center border-b border-biomonie-teal-light/20 px-6 py-7 text-center min-[980px]:border-b-0 min-[980px]:border-r">
              <span className="absolute inset-y-0 left-0 w-[4px] bg-biomonie-lemon" />
              <h3 className="mx-auto max-w-[24ch] font-sans text-[clamp(1.25rem,1.8vw,1.65rem)] font-extrabold leading-[1.24] text-white">
                Your everyday bills paid{' '}
                <span className="text-biomonie-lemon">smarter</span>, settled
                instantly, always rewarded with{' '}
                <span className="text-biomonie-lemon">BIOMONIE</span> Bills.
              </h3>
            </div>
            <div className="bg-biomonie-teal-dark/12 px-6 py-7">
              <p className="mb-4 max-w-[60ch] text-[1rem] leading-relaxed text-white/100">
                Pay bills with a flex. No cards. No friction.{' '}
                <span className="font-semibold text-biomonie-lemon">YOU</span>{' '}
                are the money access every payment earning you within the{' '}
                <span className="font-semibold text-biomonie-lemon">
                  BIOMONIE
                </span>{' '}
                ecosystem.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 min-[1080px]:grid-cols-5">
                {billsCategories.map((item) => {
                  const BillIcon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-md border border-biomonie-teal-light/30 bg-white/[0.03] px-2 py-2 text-center transition-colors duration-200 hover:border-biomonie-lemon/35 hover:bg-biomonie-lemon/[0.08]"
                    >
                      <BillIcon className="mx-auto mb-1 h-3.5 w-3.5 text-biomonie-lemon/85" />
                      <span className="text-[0.54rem] font-semibold uppercase tracking-[0.06em] text-white/80">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  className="inline-block rounded-lg bg-biomonie-lemon px-5 py-2.5 text-center text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)]"
                >
                  Get Started & PAY BILLS Now...
                </button>
              </div>
            </div>
          </div>

          <div className="bg-biomonie-teal-dark/24 h-5 border-y border-biomonie-teal-light/20" />

          <div className="grid grid-cols-1 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="bg-biomonie-teal-dark/24 relative flex items-center justify-center border-b border-biomonie-teal-light/20 px-6 py-7 text-center min-[980px]:border-b-0 min-[980px]:border-r">
              <span className="absolute inset-y-0 left-0 w-[4px] bg-biomonie-lemon" />
              <h3 className="mx-auto max-w-[24ch] font-sans text-[clamp(1.05rem,1.8vw,1.65rem)] font-extrabold leading-[1.24] text-white">
                Intervention that{' '}
                <span className="text-biomonie-lemon">reaches</span> the right
                people, and{' '}
                <span className="text-biomonie-lemon">collects</span> evidence
                they were there with{' '}
                <span className="text-biomonie-lemon">BIOMONIE</span> Reach &
                Collect.
              </h3>
            </div>
            <div className="bg-biomonie-teal-dark/12 px-6 py-7">
              <div className="grid grid-cols-1 gap-5 min-[1080px]:grid-cols-2">
                <article className="min-w-0 border-b border-biomonie-teal-light/20 pb-5 min-[1080px]:border-b-0 min-[1080px]:border-r min-[1080px]:pr-5">
                  <h4 className="mb-2 font-sans text-[1.15rem] font-extrabold leading-none text-white">
                    <span className="text-biomonie-lemon">BIOMONIE</span> Reach
                  </h4>
                  <p className="mb-3 text-[0.88rem] leading-relaxed text-white/100">
                    Direct cash or value disbursement from sponsors to verified
                    beneficiaries. No leakage. No ghost recipients. Delivery
                    confirmed to the right person{' '}
                    <span className="font-semibold text-biomonie-lemon">
                      YOU
                    </span>{' '}
                    are the money access.
                  </p>
                  <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {reachStats.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-md border border-biomonie-teal-light/30 bg-white/[0.03] px-3 py-2"
                      >
                        <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-biomonie-lemon">
                          {item.title}
                        </p>
                        <p className="text-[0.62rem] leading-snug text-white/70">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-block rounded-lg bg-biomonie-lemon px-5 py-2.5 text-center text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)]"
                    >
                      Get Started & REACH Someone Now...
                    </button>
                  </div>
                </article>

                <article className="min-w-0 min-[1080px]:pl-1">
                  <h4 className="mb-2 font-sans text-[1.15rem] font-extrabold leading-none text-white">
                    <span className="text-biomonie-lemon">BIOMONIE</span>{' '}
                    Collect
                  </h4>
                  <p className="mb-3 text-[0.88rem] leading-relaxed text-white/100">
                    Goods and voucher collection at approved vendor outlets.
                    Recipients are verified at the point of collection{' '}
                    <span className="font-semibold text-biomonie-lemon">
                      YOU
                    </span>{' '}
                    are the money access. No duplication, no fraud.
                  </p>
                  <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {collectStats.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-md border border-biomonie-teal-light/30 bg-white/[0.03] px-3 py-2"
                      >
                        <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-biomonie-lemon">
                          {item.title}
                        </p>
                        <p className="text-[0.62rem] leading-snug text-white/70">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-block rounded-lg border-2 border-white/40 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-[2px] transition duration-200 hover:border-biomonie-lemon hover:bg-white/[0.07] hover:text-biomonie-lemon"
                    >
                      Get Started with  COLLECT Now...
                    </button>
                  </div>
                </article> 
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-biomonie-teal-dark/20 px-5 py-3 sm:px-7">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <ShieldCheck className="h-3 w-3 text-biomonie-lemon" />
                Zero Leakage
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <Lock className="h-3 w-3 text-biomonie-lemon" />
                No Ghost Recipients
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <CheckCircle2 className="h-3 w-3 text-biomonie-lemon" />
                Auditable Records
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <ShieldCheck className="h-3 w-3 text-biomonie-lemon" />
                Instant Payments
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <Lock className="h-3 w-3 text-biomonie-lemon" />
                Fraud-Proof Authorisation
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <CheckCircle2 className="h-3 w-3 text-biomonie-lemon" />
                Traceable Transactions
              </span>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
