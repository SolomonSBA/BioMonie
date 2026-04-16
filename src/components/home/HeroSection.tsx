import { motion, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import {
  Globe,
  RadioTower,
  HandCoins,
  ReceiptText,
  UsersRound,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowRight,
  Repeat2,
  TrendingUp,
  Handshake,
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
  const productCards = [
    {
      product: 'Product 01',
      name: 'Biomonie Reach',
      accent: 'Reach',
      icon: RadioTower,
      body: 'Direct cash or value disbursement to verified beneficiaries with zero leakage.',
      flow: [
        { role: 'Sponsor', value: 'Funds' },
        { role: 'Auth', value: 'Biometric' },
        { role: 'Beneficiary', value: 'Receives' },
      ],
      connectors: ['via Biomonie', 'confirmed'],
      cta: 'Explore Reach',
      tint: 'from-biomonie-lemon/18 to-biomonie-lemon/6',
      accentText: 'text-biomonie-lemon',
    },
    {
      product: 'Product 02',
      name: 'Biomonie Collect',
      accent: 'Collect',
      icon: HandCoins,
      body: 'Vendor collection flow with biometric confirmation to prevent duplication and fraud.',
      flow: [
        { role: 'Sponsor', value: 'Authorises' },
        { role: 'Vendor', value: 'Dispenses' },
        { role: 'Auth', value: 'Biometric' },
        { role: 'Beneficiary', value: 'Collects' },
      ],
      connectors: ['', '', ''],
      cta: 'Explore Collect',
      tint: 'from-biomonie-lemon/16 to-biomonie-lemon/5',
      accentText: 'text-biomonie-lemon',
    },
    {
      product: 'Product 03',
      name: 'Biomonie Bills',
      accent: 'Bills',
      icon: ReceiptText,
      body: 'Pay utilities, subscriptions, and everyday bills securely like Airtime and Data, Electricity (Prepaid/Postpaid), Cable TV, Internet Services, Water and Waste Management, School Fees and Exam Pins, Government Levies and Taxes (Remita), Insurance Premiums, Betting Wallet Funding, etc.',
      flow: [
        { role: 'User', value: 'Selects' },
        { role: 'Bill Initiates', value: 'via Biomonie' },
        { role: 'Auth', value: 'Biometric' },
        { role: 'Payment', value: 'Confirmed' },
      ],
      connectors: ['', '', ''],
      cta: 'Explore Bills',
      tint: 'from-biomonie-lemon/14 to-biomonie-lemon/4',
      accentText: 'text-biomonie-lemon',
    },
    {
      product: 'Product 04',
      name: 'Biomonie Clan',
      accent: 'Clan',
      icon: UsersRound,
      body: 'Built for the people behind the system. Biomonie staff do not just operate the network they power it, grow it, and earn from it. Every action contributes to the ecosystem, and every contribution is rewarded.',
      flow: [
        { role: 'Clan Member', value: 'Onboards' },
        { role: 'Drives', value: 'Growth & Activity' },
        { role: 'Supports', value: 'Ecosystem' },
        { role: 'Earns', value: 'Continuously' },
      ],
      connectors: ['', '', ''],
      cta: 'Explore Clan',
      highlights: [
        { label: 'Earn Beyond Salary', icon: Repeat2 },
        { label: 'Growth-Driven Rewards', icon: TrendingUp },
        { label: 'Aligned With Network Success', icon: Handshake },
      ],
      tint: 'from-biomonie-lemon/12 to-biomonie-lemon/4',
      accentText: 'text-biomonie-lemon',
    },
  ] as const;

  const clanHighlights = [
    { label: 'Earn Beyond Salary', icon: Repeat2 },
    { label: 'Growth-Driven Rewards', icon: TrendingUp },
    { label: 'Aligned With Network Success', icon: Handshake },
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
        <div className="via-biomonie-pale/12 to-biomonie-teal-light/16 overflow-hidden rounded-2xl bg-gradient-to-br from-biomonie-teal/20 shadow-[0_14px_44px_rgba(3,32,46,0.22)]">
          <div className="bg-biomonie-teal-dark/18 px-5 py-4 sm:px-7 sm:py-5">
            <p className="mb-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-biomonie-lemon">
              Built for social good. Powered by biometric truth.
            </p>
            <h3 className="font-sans text-[clamp(1.02rem,2.3vw,1.8rem)] font-extrabold leading-[1.2] text-white">
              Intervention that{' '}
              <span className="text-biomonie-lemon">reaches</span> the right
              people and <span className="text-biomonie-lemon">collects</span>{' '}
              evidence they were there.
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:px-5 sm:py-5 min-[980px]:grid-cols-2">
            {productCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.product}
                  className={`flex h-full flex-col rounded-xl bg-gradient-to-br ${card.tint} px-4 py-4 shadow-[0_8px_24px_rgba(6,40,54,0.2)] sm:px-5`}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span className="bg-biomonie-lemon/14 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-biomonie-lemon/35">
                      <Icon className={`h-4 w-4 ${card.accentText}`} />
                    </span>
                    <div>
                      <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-white">
                        {card.product}
                      </p>
                      <h3 className="mt-1 font-sans text-[1.05rem] font-extrabold leading-tight text-white">
                        <span className="text-biomonie-lemon">
                          {card.name.split(' ')[0]}
                        </span>{' '}
                        <span className="text-white">{card.accent}</span>
                      </h3>
                    </div>
                  </div>
                  <p className="mb-3 text-[0.78rem] leading-snug text-white/[0.68]">
                    {card.body}
                  </p>
                  <div
                    className={`mb-4 flex items-center gap-2 ${
                      card.product === 'Product 02'
                        ? 'flex-nowrap justify-start overflow-x-auto pb-1 min-[1280px]:justify-center'
                        : 'flex-wrap justify-center'
                    }`}
                  >
                    {card.flow.map((step, index) => (
                      <div
                        key={`${card.product}-${step.role}`}
                        className="flex shrink-0 items-center gap-1.5"
                      >
                        <div className="min-w-[88px] rounded-md border border-biomonie-lemon/35 bg-biomonie-lemon/10 px-2.5 py-1.5 text-center">
                          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-biomonie-lemon">
                            {step.role}
                          </p>
                          <p className="text-[0.7rem] font-semibold text-white">
                            {step.value}
                          </p>
                        </div>
                        {index < card.connectors.length && (
                          <div className="flex items-center gap-1 text-biomonie-lemon/80">
                            <ArrowRight className="h-3 w-3" />
                            {card.connectors[index] ? (
                              <span className="whitespace-nowrap text-[0.52rem] font-semibold uppercase tracking-[0.08em]">
                                {card.connectors[index]}
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className={
                        card.product === 'Product 02' ||
                        card.product === 'Product 03'
                          ? 'inline-block w-full rounded-lg border-2 border-white/40 bg-white/[0.04] px-5 py-2.5 text-center text-sm font-semibold text-white no-underline backdrop-blur-[2px] transition duration-200 hover:border-biomonie-lemon hover:bg-white/[0.07] hover:text-biomonie-lemon sm:w-auto sm:px-7'
                          : 'inline-block w-full rounded-lg bg-biomonie-lemon px-5 py-2.5 text-center text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)] sm:w-auto sm:px-7'
                      }
                    >
                      {card.cta}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex justify-end overflow-x-auto bg-biomonie-teal-dark/20 px-5 py-3 sm:px-7">
            <div className="flex min-w-max flex-nowrap items-center justify-end gap-3">
              <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <ShieldCheck className="h-3 w-3 text-biomonie-lemon" />
                Zero Leakage
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <Lock className="h-3 w-3 text-biomonie-lemon" />
                No Ghost Recipients
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <CheckCircle2 className="h-3 w-3 text-biomonie-lemon" />
                Auditable Records
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <ShieldCheck className="h-3 w-3 text-biomonie-lemon" />
                Instant Payments
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <Lock className="h-3 w-3 text-biomonie-lemon" />
                Fraud-Proof Authorisation
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                <CheckCircle2 className="h-3 w-3 text-biomonie-lemon" />
                Traceable Transactions
              </span>
              <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
              {clanHighlights.map((item, index) => {
                const HighlightIcon = item.icon;
                return (
                  <div key={`footer-${item.label}`} className="contents">
                    <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.52rem] font-bold uppercase tracking-[0.07em] text-white/80">
                      <HighlightIcon className="h-3 w-3 text-biomonie-lemon" />
                      {item.label}
                    </span>
                    {index < clanHighlights.length - 1 ? (
                      <span className="hidden h-3 w-px bg-biomonie-lemon/35 sm:block" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
