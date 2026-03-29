import { UserRound, Landmark, ShoppingBag, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealItem, RevealStagger } from "@/lib/motion";

const cards = [
  {
    Icon: UserRound,
    title: "Customers",
    desc: (
      <>
        Shop and pay anywhere with <span className="font-bold text-biomonie-lemon">YOU</span> as the new form of money access. No pin, no password, no wallet  just{" "}
        <span className="font-bold text-biomonie-lemon">YOU</span>. <span className="font-bold text-biomonie-lemon">YOU</span> are the money access. Transfer, pay everywhere in the ecosystem.
      </>
    ),
    earn: "₦500 per 75 transactions from anyone you refer, ongoing",
  },
  {
    Icon: Landmark,
    title: "Agents",
    desc: "As the financial hub of your community, facilitate cash-in and cash-out transactions with the new form of money access. Bring others to transact and build your downline.",
    earn: "Transaction commissions + ₦3,000 per Agent/Merchant referral activated + ₦500 per 75 transaction blocks",
  },
  {
    Icon: ShoppingBag,
    title: "Merchants",
    desc: "Accept payments at your shop, stall, or outlet. Your customers pay with the new form of money access, zero downtime and a flex.",
    earn: "₦3,000 per Agent/Merchant referral activated + ₦500 per transaction block, indefinitely",
  },
];

export default function ForWhomSection() {
  return (
    <section id="who" className="relative overflow-hidden bg-biomonie-teal px-[5%] py-[100px]">
      <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.06),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">
            Who Is <span className="text-biomonie-lemon">BIOMONIE</span> For?
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-white">
            One ecosystem.
            <br />
            <em className="not-italic text-white">Everybody earns.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-14 max-w-[620px] text-[1.06rem] leading-[1.75] text-white/[0.82]">
            <span className="font-semibold text-biomonie-lemon">BIOMONIE</span> works for Customers, Agents, and Merchants  and everyone in the ecosystem earns by bringing others in through the{" "}
            <span className="font-semibold text-biomonie-lemon">BIOMONIE</span> affiliate programme.
          </p>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
          {cards.map((c) => (
            <RevealItem key={c.title}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-xl border border-white/[0.18] bg-white/[0.08] p-8 shadow-biomonie-sm backdrop-blur-[2px] transition-colors duration-300 hover:border-biomonie-lemon/50 hover:bg-biomonie-lemon/[0.1]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-biomonie-lemon/15 text-biomonie-lemon ring-1 ring-biomonie-lemon/25">
                  <c.Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="mb-2 text-[1.22rem] font-bold text-biomonie-lemon">{c.title}</div>
                <p className="mb-5 text-[0.93rem] leading-relaxed text-white/[0.84]">{c.desc}</p>
                <div className="flex items-start gap-2 border-t border-biomonie-lemon/25 pt-4 text-[0.83rem] font-semibold leading-snug text-biomonie-lemon">
                  <Banknote className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
                  {c.earn}
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
