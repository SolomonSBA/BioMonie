import { RefreshCw, Users, Zap } from 'lucide-react';
import { Reveal } from '@/lib/motion';

const benefits = [
  {
    Icon: Users,
    title: 'Onboard Anyone and Everyone; Earn on transactions they perform.',
    body: (
      <>
        Grow your downlines by introducing any or all of the following: Customer,
        Merchant or Agent into the Ecosystem and earn a guaranteed payout on
        transactions they perform or subscription fees for Merchants, Agents or
        Customers. Payouts into <strong>BIOWALLETS</strong> are done based on
        applicable transaction payment threshold with no limit and no expiry.
      </>
    ),
  },
  {
    Icon: Zap,
    title: 'Instant Payouts',
    body: (
      <>
        Commissions and subscription earnings are calculated and paid into your{' '}
        <strong>BIOWALLETS</strong> once you meet the applicable transaction
        threshold. Your first payout is unlocked once your downlines meet the
        sign-on requirements and subsequent payouts drop based on the applicable
        transaction thresholds.
      </>
    ),
  },
  {
    Icon: RefreshCw,
    title: 'No Limit. No Expiry.',
    body: (
      <>
        There is no cap on how many people <strong>YOU</strong> can onboard or
        limits to growing your Single-Level Downlines (SLD) or how much you can
        earn. Keep growing your downlines, earn forever as long as they perform
        transactions.
      </>
    ),
  },
] as const;

export default function EarnSection() {
  return (
    <section id="earn" className="overflow-hidden border border-biomonie-teal/50 bg-biomonie-pale">
      <div className="earn-section-layout mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-14 lg:gap-14 lg:px-12 lg:py-14 xl:px-16">
        <div className="min-w-0">
          <Reveal>
            <div className="earn-kicker mb-3 border-l-2 border-biomonie-lemon pl-2 text-[0.5rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal lg:text-xs">
              BIOMONIE Partners
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-3 max-w-[19ch] text-[clamp(1.8rem,4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-biomonie-text">
              Build and turn your downlines into{' '}
              <span className="text-biomonie-teal">perpetual income.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="earn-intro-copy max-w-[62ch] text-sm leading-[1.65] text-biomonie-text/70 lg:text-[0.9rem]">
              <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>
              &apos;s Single-Level Downline proprietary technology (SLD) allows anyone
              and everyone to onboard anyone and earn when transactions are performed
              using the platform. It is transparent, transaction-based and always a
              NET-GAIN.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <img
              src="/imageforsection/EcosystemImage.png"
              alt="Customers, merchants, and agents connected in the BIOMONIE ecosystem, earning more through one trusted platform."
              className="earn-section-image mx-auto mt-7 block h-auto w-full max-w-[760px] object-contain sm:mt-8 lg:mt-6"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>

        <div className="earn-benefits grid grid-cols-1 gap-8 lg:gap-10 lg:pt-0.5">
          {benefits.map(({ Icon, title, body }, index) => (
            <Reveal key={title} delay={0.08 + index * 0.07}>
              <article className="flex items-start gap-3 sm:gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-biomonie-teal text-white shadow-biomonie-sm sm:h-11 sm:w-11">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                  <h3 className="earn-benefit-title mb-1 text-sm font-bold leading-snug text-biomonie-text lg:text-[0.9rem]">
                    {title}
                  </h3>
                  <p className="earn-benefit-copy text-[0.8rem] leading-[1.55] text-biomonie-text lg:text-[0.82rem]">
                    {body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
