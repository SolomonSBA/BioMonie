import type { ReactNode } from "react";
import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, RevealItem, RevealStagger } from "@/lib/motion";

const faqs: { q: ReactNode; a: ReactNode }[] = [
  {
    q: (
      <>
        Do I need a bank account to use <strong className="text-biomonie-teal">BIOMONIE</strong>?
      </>
    ),
    a: (
      <>
        No. Your <strong className="text-biomonie-teal">BIOWALLET</strong> does not replace your bank accounts. It&apos;s just a wallet for everyday payments and cash needs. You can transfer in and out, deposit, withdraw, and pay using{" "}
        <strong className="text-biomonie-teal">BIOMONIE</strong> through Agents, Merchants, or the App.
      </>
    ),
  },
  {
    q: "Is it really free to join?",
    a: (
      <>
        Absolutely. No registration fees, no subscription fees, no hidden charges. Anyone who asks you to pay money to join <strong className="text-biomonie-teal">BIOMONIE</strong> is not authorised.
      </>
    ),
  },
  {
    q: "How exactly do I earn as an Affiliate BRM?",
    a: "Share your referral code and ensure everyone you introduce uses it. You earn once they complete their 200th transaction for referral-based earnings (₦3,000 — only applicable to Agents and Merchants). After that, you earn ₦500 for every subsequent block of 75 transactions — with no limit and no expiry.",
  },
  {
    q: "When do I get paid?",
    a: (
      <>
        Your earnings are calculated and paid into your <strong className="text-biomonie-teal">BIOWALLET</strong> once you achieve your applicable transaction earning threshold or referral earning threshold  instantly, as you meet each milestone.
      </>
    ),
  },
  {
    q: "Is my money and data safe?",
    a: (
      <>
        <strong className="text-biomonie-teal">BIOMONIE</strong> is licensed as a processor. Your data is encrypted and stored.
      </>
    ),
  },
  {
    q: "Can I earn from the people my referrals refer?",
    a: (
      <>
        No. <strong className="text-biomonie-teal">BIOMONIE</strong> uses a Single Level Downline Model (SLD) you earn only from the people you personally introduce. You do not earn from their referrals.
      </>
    ),
  },
  {
    q: "What kind of businesses can be Merchants?",
    a: (
      <>
        Any business not just small businesses. If they sell goods or services and accept money from customers, <strong className="text-biomonie-teal">BIOMONIE</strong> works for them. Large or small, the ecosystem welcomes all.
      </>
    ),
  },
  {
    q: "Are there physical cards involved?",
    a: (
      <>
        No. <strong className="text-biomonie-teal">BIOMONIE</strong> makes <strong className="text-biomonie-teal">YOU</strong> the money access. It offers the new form of money access <strong className="text-biomonie-teal">YOU</strong>.
      </>
    ),
  },
  {
    q: "Are there POS terminals involved?",
    a: (
      <>
        No. The <strong className="text-biomonie-teal">BIOMONIE</strong> ecosystem leverages mobile phones, with a proprietary app that allows the customer to be the new form of money access. No POS terminal, no card reader, no hardware to manage.
      </>
    ),
  },
];

function FaqItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: (typeof faqs)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const headingId = `faq-q-${index}`;
  const panelId = `faq-a-${index}`;

  return (
    <RevealItem>
      <motion.div
        layout
        className="h-full rounded-xl border border-[#dde8f0] bg-white shadow-biomonie-sm transition-shadow duration-300 hover:border-biomonie-teal/15 hover:shadow-biomonie-md"
      >
        <button
          type="button"
          id={headingId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start gap-3 rounded-xl p-6 text-left transition-colors hover:bg-biomonie-pale/40"
        >
          <MessageCircle className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 text-biomonie-teal" strokeWidth={2.25} aria-hidden />
          <span className="min-w-0 flex-1 text-[1rem] font-bold leading-snug text-biomonie-text">{item.q}</span>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-biomonie-teal/20 bg-biomonie-pale/80 text-biomonie-teal transition-colors hover:border-biomonie-teal/35 hover:bg-white"
            aria-hidden
          >
            {open ? <Minus className="h-4 w-4" strokeWidth={2.5} /> : <Plus className="h-4 w-4" strokeWidth={2.5} />}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#dde8f0] px-6 pb-6 pt-0">
                <p className="border-l-2 border-biomonie-lemon pl-4 text-[0.93rem] leading-relaxed text-biomonie-text/[0.72] [&_strong]:text-biomonie-teal">
                  {item.a}
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </RevealItem>
  );
}

export default function FAQSection() {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set());

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section id="faq" className="bg-biomonie-pale px-[5%] py-[100px]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal">
            Frequently Asked Questions
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mb-4 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-biomonie-text">
            Questions?
            <br />
            <em className="not-italic text-biomonie-teal">We have answers.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-14 max-w-[620px] text-[1.06rem] leading-[1.75] text-biomonie-text/[0.72]">
            Everything you need to know about <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>, the referral programme, and how to get started.
          </p>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-2">
          {faqs.map((item, i) => (
            <FaqItem key={i} item={item} index={i} open={openSet.has(i)} onToggle={() => toggle(i)} />
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
