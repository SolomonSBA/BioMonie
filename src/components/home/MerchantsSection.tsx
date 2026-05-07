import { Check, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/lib/motion';

const benefits = [
  <>
    <strong>Guaranteed Uptime.</strong> Your mobile phone becomes the payment
    acceptance device leveraging our new form of money access.
  </>,
  <>
    <strong>Instant confirmation.</strong> Know the moment you&apos;ve been
    paid. No waiting. No doubt.
  </>,
  <>
    <strong>Zero chargebacks.</strong> Transactions are verified at point of
    payment. Disputes are virtually eliminated or auto resolved.
  </>,
  <>
    <strong>Built for all businesses.</strong> Net-gain adoption cost, seamless,
    guaranteed uptime within your control. Your phone is what you need.
  </>,
  <>
    <strong>Earn in the ecosystem.</strong> Refer other merchants / agents and
    earn referral fee per activation plus ongoing transaction fees.
  </>,
];

export default function MerchantsSection() {
  return (
    <>
      <section id="merchants" className="bg-white px-[5%] py-[100px]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 min-[900px]:grid-cols-2 min-[900px]:gap-20">
          <div>
            <Reveal>
              <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal">
                For Merchants
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-biomonie-text">
                Accept payments.
                <br />
                <em className="not-italic text-biomonie-teal">
                  Grow your business.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-6 text-[1.06rem] leading-[1.75] text-biomonie-text/[0.74]">
                Your customers pay with the new form of money access;{' '}
                <strong className="font-semibold text-biomonie-teal">
                  YOU,
                </strong>{' '}
                and you earn instantly every time transactions are performed. No
                Device issues. No downtime.
              </p>
            </Reveal>
            <ul className="my-8 list-none space-y-4">
              {benefits.map((b, i) => (
                <Reveal key={i} delay={0.04 * i}>
                  <li className="flex gap-3 text-[0.96rem] leading-relaxed text-biomonie-text/[0.82]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-biomonie-teal/10">
                      <Check
                        className="h-3.5 w-3.5 text-biomonie-teal"
                        strokeWidth={2.75}
                      />
                    </span>
                    <span>{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <div className="mt-10 rounded-xl border border-l-4 border-[#dde8f0] border-l-biomonie-lemon bg-biomonie-pale p-8 shadow-biomonie-sm">
                <p className="mb-2 text-[0.98rem] italic leading-relaxed text-biomonie-text/[0.88]">
                  &quot;With{' '}
                  <strong className="not-italic text-biomonie-teal">
                    BIOMONIE
                  </strong>
                  , I don&apos;t worry about POS terminal downtimes anymore. My
                  customers enjoy the new form of money access.&quot;
                </p>
                <cite className="text-[0.83rem] font-semibold not-italic text-biomonie-text/60">
                  {' '}
                  Market Trader
                </cite>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-visible rounded-[28px]"
            >
              <div className="relative z-[2] overflow-hidden rounded-[28px] shadow-[0_24px_70px_rgba(41,92,114,.25)]">
                <motion.img
                  src="/imageforsection/ForMerchants.jpg"
                  alt="Merchant receiving payment"
                  className="h-[480px] w-full object-cover object-center"
                  animate={{ scale: [1, 1.03, 1], y: [0, -6, 0] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(12,26,34,.78)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(41,92,114,.15),transparent_10%),linear-gradient(180deg,transparent_10%,rgba(12,26,34,.65)_100%)]" />
                <div className="absolute bottom-5 left-1/2 z-[3] w-[86%] -translate-x-1/2 rounded-xl border border-biomonie-lemon/35 bg-white/0 px-4 py-3 text-center font-bold uppercase tracking-[0.1em] text-biomonie-lemon backdrop-blur-[2px]">
                  The Customer IS the payment.
                  <span className="mt-2 block text-[0.78rem] font-medium normal-case tracking-normal text-white/80">
                    New form of money access.
                  </span>
                </div>
              </div>
              <motion.div
                className="absolute -left-4 bottom-[29%] z-[4] rounded-xl bg-white px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,.18)]"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <p className="text-[0.65rem] uppercase tracking-[0.08em] text-biomonie-teal/80">
                  Payment received
                </p>
                <p className="font-mono text-[0.86rem] font-bold text-biomonie-teal">
                  +N18,500
                </p>
              </motion.div>
              <motion.div
                className="absolute -right-3 top-[16%] z-[4] rounded-xl bg-white px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,.18)]"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              >
                <p className="text-[0.65rem] uppercase tracking-[0.08em] text-biomonie-teal/80">
                  Referral earned
                </p>
               
                <p className="font-mono text-[0.86rem] font-bold text-biomonie-teal">
                  +₦500
                </p>
              </motion.div>
              <div className="absolute -bottom-1 left-[-16px] right-[-16px] z-[3] h-[6px] rounded-b-md bg-biomonie-lemon shadow-[0_4px_20px_rgba(226,255,2,.35)]" />
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-biomonie-teal-dark px-[5%] py-[100px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(41,92,114,.4),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 min-[980px]:grid-cols-2 min-[980px]:gap-20">
          <Reveal>
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,.4)]">
                <img
                  src="/imageforsection/Firefly_Gemini Flash_Five young Nigerian adults gathered closely together outdoors, laughing and reacting 735960.webp"
                  alt="Community beneficiaries"
                  className="h-[280px] w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(12,26,34,.78)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(12,26,34,.55)_100%)]" />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-biomonie-lemon px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-biomonie-teal-dark shadow-[0_8px_32px_rgba(226,255,2,.22)]">
                  BIOMONIE Reach &amp; Collect
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,0,0,.3)]">
                  <img
                    src="/imageforsection/Firefly_Gemini Flash_A young Nigerian mother in a vibrant Ankara-African print dress leans down tenderly o 735960.webp"
                    alt="Verified beneficiary"
                    className="h-[160px] w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(12,26,34,.55)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(12,26,34,.78)_100%)]" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-biomonie-lemon px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-biomonie-teal-dark">
                    Verified
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,0,0,.3)]">
                  <img
                    src="/imageforsection/Firefly_Gemini Flash_Close-up portrait of a middle-aged West African woman wearing a white and green headw 924260.webp"
                    alt="Community payout recipient"
                    className="h-[160px] w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(12,26,34,.78)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(12,26,34,.55)_100%)]" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-biomonie-lemon px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-biomonie-teal-dark">
                    No Leakage
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">
                Intervention
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="mb-4 text-[clamp(1.5rem,3.4vw,2.4rem)] font-extrabold leading-[1.2] text-white">
                Intervention that{' '}
                <span className="text-biomonie-lemon">reaches</span> the right
                people, and{' '}
                <span className="text-biomonie-lemon">collects</span> evidence
                they were there with BIOMONIE Reach & Collect.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-biomonie-lemon/20 bg-white/[0.03] p-4">
                  <p className="mb-2 text-lg font-bold text-biomonie-lemon">
                    BIOMONIE Reach
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">
                    Direct cash or value disbursement from sponsors to verified
                    beneficiaries. No leakage. No ghost recipients.
                  </p>
                </div>
                <div className="rounded-xl border border-biomonie-lemon/20 bg-white/[0.03] p-4">
                  <p className="mb-2 text-lg font-bold text-biomonie-lemon">
                    BIOMONIE Collect
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">
                    Goods and voucher collection at approved vendor outlets with
                    verified recipients at collection point.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
