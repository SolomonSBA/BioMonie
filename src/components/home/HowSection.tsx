import { Dna, Store, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealItem, RevealStagger } from "@/lib/motion";

const steps = [
  {
    n: "01",
    Icon: Dna,
    title: "Transfer 'n' Transact",
    body: (
      <>
        All you need to pay in the <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong> ecosystem is to transfer and a wallet linked to your NIN and BVN is created automatically, and you&apos;re ready to flex and pay at any{" "}
        <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong> merchant or agent outlet in the ecosystem.
      </>
    ),
  },
  {
    n: "02",
    Icon: Store,
    title: "Transact",
    body: (
      <>
        Pay, cash in, cash out, shop  <strong className="font-semibold text-biomonie-teal">YOU</strong> are the new money access.
      </>
    ),
  },
  {
    n: "03",
    Icon: Coins,
    title: "Earn",
    body: (
      <>
        Every transaction you perform is you earning money. Share your referral code. When the people you introduce transact, you earn  automatically, with no limit and no expiry. Nobody on <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong> is ever orphaned.
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
            to <em className="not-italic text-biomonie-teal">your new money access</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-14 max-w-[620px] text-[1.06rem] leading-[1.75] text-biomonie-text/[0.72]">
            <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong> is designed to be as easy as possible. We do all the heavy lifting just show up, flex, and transact.
          </p>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-8 min-[900px]:grid-cols-3">
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
                <h3 className="mb-2 text-[1.12rem] font-bold text-biomonie-text">{s.title}</h3>
                <p className="text-[0.93rem] leading-relaxed text-biomonie-text/[0.72]">{s.body}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
