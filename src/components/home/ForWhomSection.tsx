import { UserRound, Landmark, ShoppingBag, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, RevealItem, RevealStagger } from '@/lib/motion';

const cards = [
  {
    Icon: UserRound,
    image: '/imageforsection/customer.webp',
    badge: 'Customer',
    title: 'Customers',
    desc: (
      <>
        Shop & Pay anywhere with{' '}
        <span className="font-bold text-biomonie-lemon">YOU</span> as the new
        form of money access. No pin, No passwords and nothing else; just{' '}
        <span className="font-bold text-biomonie-lemon">YOU</span>.{' '}
        <span className="font-bold text-biomonie-lemon">YOU</span> are the money
        access; Flex, Pay or Spend everywhere and anywhere in the ecosystem.
      </>
    ),
    earn: 'Earn a fee for any Merchant/Agent referred and on all transactions performed by all your single level downlines (Customers/Merchants/Agents) perpetually.',
  },
  {
    Icon: Landmark,
    image: '/imageforsection/agent.webp',
    badge: 'Agent',
    title: 'Agents',
    desc: 'As the financial hub of the community facilitating cash-in & cash-out services with and other financial transactions; the customers enjoys the new form of money access with a flex and zero downtimes while both the agent and customer uplines earn.',
    earn: 'Earn a fee for any Merchant/Agent referred and on all transactions performed by all your single level downlines (Customers/Merchants/Agents) perpetually.',
  },
  {
    Icon: ShoppingBag,
    image: '/imageforsection/ForMerchants.jpg',
    badge: 'Merchant',
    title: 'Merchants',
    desc: 'Accept payment for goods and services at your shop, stall or outlets. Your customers enjoys and pay with the new form of money access with zero downtime while both the merchant and customer uplines earn.',
    earn: 'Earn a fee for any Merchant/Agent referred and on all transactions performed by all your single level downlines (Customers/Merchants/Agents) perpetually.',
  },
];

export default function ForWhomSection() {
  return (
    <section
      id="who"
      className="relative overflow-hidden bg-biomonie-teal px-[5%] py-[100px]"
    >
      <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.06),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">
            Who Is <span className="text-biomonie-lemon">BIOMONIE</span> For?
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-white">
            One Ecosystem.
            <br />
            <em className="italic text-biomonie-lemon">Everybody earns.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-14 max-w-[620px] text-[1.06rem] leading-[1.75] text-white/[0.82]">
            <span className="font-semibold text-biomonie-lemon">BIOMONIE</span>{' '}
            works for anyone; Customers, Merchants or Agents either Paying or
            Spending, Receiving Payment or Cash-in / Cash-out all earning as{' '}
            <span className="font-semibold text-biomonie-lemon">BIOMONIE</span>{' '}
            Affiliates perpetually.
          </p>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
          {cards.map((c) => (
            <RevealItem key={c.title}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full overflow-hidden rounded-xl border border-white/[0.18] bg-white/[0.08] shadow-biomonie-sm backdrop-blur-[2px] transition-colors duration-300 hover:border-biomonie-lemon/50 hover:bg-biomonie-lemon/[0.1]"
              >
                <div className="relative overflow-hidden ">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-64 w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(12,26,34,.78)_100%)]" />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-biomonie-lemon/40 bg-biomonie-teal-dark/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-biomonie-lemon">
                    <c.Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                    {c.badge}
                  </div>
                </div>
                <div className="p-7">
                  <div className="mb-2 text-[1.22rem] font-bold text-biomonie-lemon">
                    {c.title}
                  </div>
                  <p className="mb-5 text-[0.93rem] leading-relaxed text-white/[0.84]">
                    {c.desc}
                  </p>
                  <div className="flex items-start gap-2 border-t border-biomonie-lemon/25 pt-4 text-[0.83rem] font-semibold leading-snug text-biomonie-lemon">
                    <Banknote className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
                    {c.earn}
                  </div>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
