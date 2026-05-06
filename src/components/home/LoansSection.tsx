import { Landmark, Wallet, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealItem, RevealStagger } from "@/lib/motion";

const cards = [
  {
    Icon: Landmark,
    title: "Threshold-Based Eligibility",
    body: (
      <>
        PAY-FRONTs are offered against guaranteed payouts. If <span className="font-semibold text-biomonie-lemon">YOU</span> consistently meet your transaction thresholds over a period, you qualify to apply for a BIOMONIE PAY-FRONT.
      </>
    ),
  },
  {
    Icon: Wallet,
    title: "Paid into Your BIOWALLET",
    body: (
      <>
        All PAY-FRONTs disbursements go directly into your <span className="font-semibold text-biomonie-lemon">BIOWALLET</span>  instantly accessible for payments, transfers, and everyday use within the ecosystem.
      </>
    ),
  },
  {
    Icon: LineChart,
    title: "Keep Transacting, Keep Earning",
    body: (
      <>
        Your activity level determines your PAY-FRONTs eligibility. The more active <span className="font-semibold text-biomonie-lemon">YOU</span> are in the BIOMONIE ecosystem, the stronger your borrowing profile becomes.
      </>
    ),
  },
];

export default function LoansSection() {
  return (
    <section id="loans" className="relative overflow-hidden bg-biomonie-teal-mid px-[5%] py-[100px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,38,0.2)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">
            Loans
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] text-white">
            Earn, then <em className="not-italic text-biomonie-lemon">access more.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-14 max-w-[620px] text-[1.06rem] leading-[1.75] text-white/[0.8]">
            Meet your transaction thresholds and unlock access to{" "}
            <span className="inline-flex whitespace-nowrap">
              <span className="font-semibold text-biomonie-lemon">BIOMONIE</span>
              <span className="ml-1">PAY-FRONTs</span>
            </span>{" "}
            all deposited directly into your{" "}
            <span className="font-semibold text-biomonie-lemon">BIOWALLET</span>.
          </p>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
          {cards.map((c) => (
            <RevealItem key={c.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-xl border border-white/[0.14] bg-white/[0.07] p-8 shadow-biomonie-sm backdrop-blur-[1px] transition-colors duration-300 hover:border-biomonie-lemon/30 hover:bg-white/[0.09]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-biomonie-lemon/[0.12] text-biomonie-lemon ring-1 ring-biomonie-lemon/20">
                  <c.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h4 className="mb-2 text-[1.06rem] font-bold text-biomonie-lemon">{c.title}</h4>
                <p className="text-[0.91rem] leading-relaxed text-white/[0.78]">{c.body}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
