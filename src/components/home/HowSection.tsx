import { Banknote, Coins, UserPlus, ArrowRight, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, RevealItem, RevealStagger } from '@/lib/motion';

const steps = [
  {
    Icon: UserPlus,
    title: 'Sign Up',
    body: (
      <>
        Download the{' '}
        <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>{' '}
       App on PlayStore or Appstore or visit a{' '}
        <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>{' '}
        Merchant or Agent outlet to open a <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>{' '} wallet with your NIN or BVN, fund with a transfer and  <strong className="font-semibold text-biomonie-teal">YOU</strong> are Ready to Flex, Pay or Spend within the <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>{' '} Ecosystem .
      </>
    ),
  },
  {
    Icon: Banknote,
    title: 'Transfer and Transact',
    body: (
      <>
        All YOU need to start using{' '}
        <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>{' '}
        for the first time is to do a transfer into the Ecosystem and a wallet
        linked to your NIN or BVN provided is created automatically with your
        funds in it then YOU are ready to Flex, Pay or Spend at any{' '}
        <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>{' '}
        Merchant or Agent outlet.
      </>
    ),
  },
  {
    Icon: ScanLine,
    title: 'Flex & Transact',
    body: (
      <>
        Fund your wallet then continuously Flex, Pay or Spend, Cash-in or
        Cash-out, Shop.{' '}
        <strong className="font-semibold text-biomonie-teal">YOU</strong> are
        the new money access.
      </>
    ),
  },
  {
    Icon: Coins,
    title: 'Earn',
    body: (
      <>
        Every referral or transaction performed by YOU or any of your Single
        Level Downline keeps earning you money perpetually. Just introduce
        Downlines, ensure they Flex & transact and you automatically earn with
        no limit and no expiry. It is always a Net-Gain on {' '}
        <strong className="font-semibold text-biomonie-teal">
          {' '}BIOMONIE.
        </strong>{' '}
      </>
    ),
  },
];

export default function HowSection() {
  return (
    <section id="how" className="bg-white px-[5%] py-[100px]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal">
            How It Works
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-biomonie-text">
            Four easy steps to
            <br />
            <em className="not-italic text-biomonie-teal">
              your new money access
            </em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-14 max-w-[620px] text-[1.06rem] leading-[1.75] text-biomonie-text/[0.72]">
            <strong className="font-semibold text-biomonie-teal">
              BIOMONIE
            </strong>{' '}
            is sleek and easy by design. We do all the heavy lifting whilst YOU
            just show, flex and pay or spend.
          </p>
        </Reveal>

        <div className="relative">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[34px] hidden h-px bg-gradient-to-r from-transparent via-biomonie-teal/20 to-transparent min-[1180px]:block" />
          <RevealStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 min-[1180px]:grid-cols-4 min-[1180px]:gap-0">
            {steps.map((s, i) => (
              <RevealItem key={s.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative px-1 text-center min-[1180px]:px-5"
                >
                  <div className="relative mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-biomonie-lemon/45"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.25,
                      }}
                    >
                      <span className="absolute -top-[4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-biomonie-lemon shadow-[0_0_10px_rgba(245,255,0,0.7)]" />
                    </motion.div>
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-biomonie-teal to-biomonie-teal-dark shadow-[0_6px_20px_rgba(41,92,114,.3)]">
                      <s.Icon
                        className="h-[22px] w-[22px] text-biomonie-lemon"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <h3 className="mb-2 font-serif text-[1.2rem] font-bold text-biomonie-text">
                    {s.title}
                  </h3>
                  <p className="mx-auto text-left max-w-[260px] text-[0.83rem] leading-[1.7] text-biomonie-text/65">
                    {s.body}
                  </p>
                  {i < steps.length - 1 && (
                    <div className="absolute right-[-14px] top-[20px] hidden h-7 w-7 items-center justify-center rounded-full border border-biomonie-lemon/40 bg-biomonie-pale text-biomonie-lemon min-[1180px]:flex">
                      <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                    </div>
                  )}
                </motion.div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
