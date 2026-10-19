import { Check } from 'lucide-react';
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
    <strong>Earn in the ecosystem.</strong> Onboard other merchants / agents / customers and
    earn subscription fees per activation plus ongoing transaction fees.
  </>,
];

export default function MerchantsSection() {
  return (
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
              <em className="not-italic text-biomonie-teal">Grow your business.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-6 text-[1.06rem] leading-[1.75] text-biomonie-text/[0.74]">
              Your customers pay with the new form of money access;{' '}
              <strong className="font-semibold text-biomonie-teal">YOU,</strong>{' '}
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
                <strong className="not-italic text-biomonie-teal">BIOMONIE</strong>
                , I don&apos;t worry about downtimes anymore. My
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
                src="/imageforsection/SecondMerchantSection.jpg"
                alt="Merchant receiving payment"
                className="h-[340px] w-full object-cover object-center sm:h-[420px] lg:h-[480px]"
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
                The Customer enjoys  the New Form of Money Access.
                {/* <span className="mt-2 block text-[0.78rem] font-medium normal-case tracking-normal text-white/80">
                  New form of money access.
                </span> */}
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
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
