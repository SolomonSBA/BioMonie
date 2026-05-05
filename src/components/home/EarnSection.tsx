import { Users, Zap, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/lib/motion';

export default function EarnSection() {
  return (
    <section id="earn" className="bg-biomonie-pale px-[5%] py-[100px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 min-[900px]:grid-cols-2 min-[900px]:gap-20">
        <div>
          <Reveal>
            <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal">
              BIOMONIE Affiliates
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-biomonie-text">
              Build and turn your downline
              <br />
              into{' '}
              <em className="not-italic text-biomonie-teal">
                perpetual income.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-12 text-[1.06rem] leading-[1.75] text-biomonie-text/[0.72]">
              {' '}
              <strong className="font-semibold text-biomonie-teal">
                BIOMONIE
              </strong>
              &apos;s Single-Level Downline Model (SLD) allows anyone and everyone to
              refer and earn when transactions are  performed
              using the platform. It's transparent, transaction-based and
              always a NET-GAIN.{' '}
              {/* <strong className="font-semibold text-biomonie-teal">YOU</strong>{' '} */}
            </p>
          </Reveal>
          {[
            {
              Icon: Users,
              title: 'Refer Anyone and Everyone; Earn on Everything',
              body: (
                <>
                  Grow your downlines by introducing any or all of the following; Customer, Merchant or
                  Agent into the Ecosystem and earn a guaranteed payout on
                  transactions they perform or referral fee for Merchants or
                  Agents. Payouts into{' '}
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
                  payout is unlocked once your referrals meet the sign-on
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
              <div className={`flex gap-4 ${i < 2 ? 'mb-8' : ''}`}>
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

        <Reveal delay={0.08}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-biomonie-teal/15 bg-biomonie-teal p-10 shadow-biomonie-md"
          >
            <div className="absolute -right-[15%] -top-[30%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.12),transparent_70%)]" />
            <h3 className="relative z-[2] mb-6 text-[1.22rem] font-bold text-biomonie-lemon">
              Earnings at a Glance
            </h3>
            {[
              {
                l: 'Referral Onboarding Fee',
                s: 'Agents & Merchants only',
                v: 'Guaranteed payout per referral',
              },
              {
                l: 'Activity-Based Fee',
                s: 'For everyone in the ecosystem',
                v: 'Earn per transaction and accessible per defined activity thresholds',
              },
              { l: 'Referral Payouts', s: '', v: 'Instant and also subject to Performance Activities' },
              { l: 'Activity Payout Threshold', s: '', v: 'Every 75 transactions' },
              {
                l: 'Referral Earning Threshold',
                s: '',
                v: 'Tied to Performance Activities (Agent/Merchant)',
              },
              {
                l: 'Who You Can Refer',
                s: '',
                v: 'Customers, Agents, Merchants',
              },
              { l: 'Payout Method', s: '', v: "Paid into the User's BIOWALLET" },
              { l: 'Cost to Join', s: '', v: "Annual Recurring Earned-Back Fees  (NET-GAIN)" },
              {
                l: 'Earning Expiry',
                s: '',
                v: 'None; continues Perpetually.',
              },
            ].map((row) => (
              <div
                key={row.l}
                className="relative z-[2] flex justify-between gap-4 border-b border-white/[0.12] py-3.5 last:border-b-0"
              >
                <span className="text-[0.87rem] leading-snug text-white/[0.78]">
                  {row.l}
                  {row.s ? (
                    <small className="mt-1 block text-[0.74rem] text-white/[0.55]">
                      {row.s}
                    </small>
                  ) : null}
                </span>
                <span className="max-w-[48%] text-right text-[0.9rem] font-bold leading-snug text-biomonie-lemon">
                  {row.v}
                </span>
              </div>
            ))}
            <div className="relative z-[2] mt-6 rounded-lg border border-biomonie-lemon/20 bg-biomonie-lemon/[0.12] p-4 text-[0.84rem] leading-relaxed text-white/[0.88]">
              All earnings are transaction-based and only from users' downlines.
              The Single-Level Downline Model (SLD) governs the process.
              Everybody earns in the BIOMONIE ecosystem.
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
