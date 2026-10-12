import { Users, Zap, RefreshCw } from 'lucide-react';
import { Reveal } from '@/lib/motion';

const glanceCards = [
  {
    title: 'Referral Onboarding Fee',
    subtitle: 'Agents & Merchants Only',
    value: 'Guaranteed Payout Per Referral',
  },
  {
    title: 'Activity-Based Fee',
    subtitle: 'For everyone in the Ecosystem',
    value: 'Earn per transaction and accessible per defined activity thresholds',
  },
  {
    title: 'Activity Payout Threshold',
    value: 'Every 75 transactions',
  },
  {
    title: 'Referral Payouts',
    value: 'Instant and also subject to Performance Activities',
  },
  {
    title: 'Who You Can Refer',
    value: 'Customers, Agents, Merchants',
  },
  {
    title: 'Cost to Join',
    value: 'Annual Recurring Earned-Back Fees (NET-GAIN)',
  },
  {
    title: 'Referral Earning Threshold',
    value: 'Tied to Performance Activities (Agent/Merchant)',
  },
  {
    title: 'Earning Expiry',
    value: 'None; continues Perpetually.',
  },
] as const;

export default function EarnSection() {
  return (
    <section id="earn" className="bg-white">
      <div className="bg-biomonie-pale px-[5%] py-[100px]">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal">
              BIOMONIE Partners
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-4 max-w-[18ch] text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-biomonie-text">
              Build and turn your downline into{' '}
              <em className="not-italic text-biomonie-teal">perpetual income.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-12 max-w-3xl text-[1.06rem] leading-[1.75] text-biomonie-text/[0.72]">
              <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>
              &apos;s Single-Level Downline Model (SLD) allows anyone and everyone to
              refer and earn when transactions are performed using the platform.
              It&apos;s transparent, transaction-based and always a NET-GAIN.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 min-[800px]:grid-cols-3 min-[800px]:gap-6">
            {[
              {
                Icon: Users,
                title: 'Refer Anyone and Everyone; Earn on Everything',
                body: (
                  <>
                    Grow your downlines by introducing any or all of the
                    following; Customer, Merchant or Agent into the Ecosystem and
                    earn a guaranteed payout on transactions they perform or
                    referral fee for Merchants or Agents. Payouts into{' '}
                    <strong className="font-semibold text-biomonie-teal">
                      BIOWALLETS
                    </strong>{' '}
                    are done based on applicable transaction payment thresh-hold
                    with no limit and no expiry.{' '}
                  </>
                ),
              },
              {
                Icon: Zap,
                title: 'Instant Payouts',
                body: (
                  <>
                    Commissions and referral earnings are calculated and paid into
                    your{' '}
                    <strong className="font-semibold text-biomonie-teal">
                      BIOWALLETS
                    </strong>{' '}
                    once you meet the applicable transaction threshold. Your first
                    payout is unlocked once your downlines meet the sign-on
                    requirements and subsequent payouts drop based on the
                    applicable transaction thresholds.
                  </>
                ),
              },
              {
                Icon: RefreshCw,
                title: 'No Limit. No Expiry.',
                body: (
                  <>
                    There is no cap on how many people{' '}
                    <strong className="font-semibold text-biomonie-teal">
                      YOU
                    </strong>{' '}
                    can refer or limits to growing your Single-Level Downlines
                    (SLD) or how much you can earn. Keep growing your downlines,
                    earn forever as long as they perform transactions.
                  </>
                ),
              },
            ].map((block, i) => (
              <Reveal key={block.title} delay={0.12 + i * 0.06}>
                <div className="flex h-full gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-biomonie-teal text-white shadow-biomonie-sm ring-1 ring-biomonie-teal/20">
                    <block.Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-[1.06rem] font-bold text-biomonie-text">
                      {block.title}
                    </h4>
                    <p className="text-[0.93rem] leading-relaxed text-biomonie-text/[0.72]">
                      {block.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[5%] py-[88px]">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mb-3 text-[clamp(1.85rem,4vw,2.75rem)] font-extrabold tracking-tight text-biomonie-text">
              Earnings at a glance
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mb-10 max-w-3xl text-[0.98rem] leading-relaxed text-biomonie-text/70">
              All earnings are transaction-based and only from users&apos; downlines.
              The Single-Level Downline Model (SLD) governs the process.
              Everybody earns in the BIOMONIE ecosystem.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {glanceCards.map((card, i) => (
              <Reveal key={card.title} delay={0.04 * i}>
                <article className="flex h-full min-h-[148px] flex-col rounded-[18px] bg-biomonie-teal-mid px-5 py-5 sm:min-h-[120px] sm:px-6 sm:py-6">
                  <h3 className="text-[0.98rem] font-bold leading-snug text-biomonie-lemon sm:text-[1.02rem]">
                    {card.title}
                  </h3>
                  {'subtitle' in card && card.subtitle ? (
                    <p className="mt-1.5 text-[0.82rem] leading-snug text-white/70">
                      {card.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-4 text-[0.92rem] font-medium leading-snug text-white">
                    {card.value}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
