import { Check, ShoppingCart } from 'lucide-react';
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
    <strong>Zero chargebacks.</strong> Transactions are verified at
    point of payment. Disputes are virtually eliminated or auto resolved.
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
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-biomonie-teal p-12 shadow-biomonie-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(245,255,0,.12),transparent_58%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_30%,rgba(15,30,38,0.35)_100%)]" />
            <ShoppingCart
              className="relative z-[2] h-28 w-28 text-biomonie-lemon drop-shadow-[0_0_28px_rgba(245,255,0,0.2)]"
              strokeWidth={1.15}
            />
            <div className="relative z-[2] mt-5 max-w-[260px] text-center text-[0.88rem] font-bold uppercase tracking-[0.1em] text-biomonie-lemon">
              The Customer IS the payment.
              <br />
              <span className="mt-2 block text-[0.78rem] font-medium normal-case tracking-normal text-white/[0.78]">
                New form of money access.
              </span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
