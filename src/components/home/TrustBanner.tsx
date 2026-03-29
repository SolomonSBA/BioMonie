import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Globe2, Lock } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const items = [
  { icon: CheckCircle2, text: "Licensed & compliant with central bank regulations" },
  {
    icon: Lock,
    text: (
      <>
        Transaction security  <strong className="font-semibold text-biomonie-lemon">YOU</strong> are your money
      </>
    ),
  },
  { icon: CheckCircle2, text: "No hidden fees. No surprise charges." },
  { icon: Globe2, text: "Global biometric payment ecosystem" },
];

export default function TrustBanner() {
  const reduce = useReducedMotion();

  return (
    <div className="relative border-y border-white/10 bg-biomonie-teal px-[5%] py-7">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-biomonie-teal-dark/25 via-transparent to-biomonie-teal-dark/25 opacity-50" />
      <motion.div
        className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-5"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: easeOutExpo }}
            className="flex max-w-[320px] items-start gap-3 text-[0.88rem] font-medium leading-snug text-white/[0.92]"
          >
            <item.icon
              className="mt-0.5 h-[1.05rem] w-[1.05rem] shrink-0 text-biomonie-lemon"
              strokeWidth={2.35}
              aria-hidden
            />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
