import { Banknote, Coins, UserPlus, ArrowLeftRight,  Forward } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, RevealItem, RevealStagger } from '@/lib/motion';

const steps = [
  {
    n: '01',
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
    n: '02',
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
    n: '03',
    Icon: ArrowLeftRight, Forward,
    title: 'Transact',
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
    n: '04',
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
            Three easy steps
            <br />
            to{' '}
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
        <RevealStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 min-[1180px]:grid-cols-4">
          {steps.map((s) => (
            <RevealItem key={s.n}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full rounded-xl border border-[#dde8f0] bg-biomonie-card p-8 shadow-biomonie-sm transition-shadow duration-300 hover:border-biomonie-teal/20 hover:shadow-biomonie-md"
              >
                <span className="absolute right-6 top-5 font-mono text-[3rem] font-bold leading-none text-biomonie-teal/[0.12]">
                  {s.n}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-biomonie-teal/10 text-biomonie-teal">
                  <s.Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-[1.12rem] font-bold text-biomonie-text">
                  {s.title}
                </h3>
                <p className="text-[0.80rem] leading-relaxed text-biomonie-text/[0.72]">
                  {s.body}
                </p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
