import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/lib/motion";

export default function JoinCTASection() {
  return (
    <section
      id="join"
      className="biomonie-grain relative overflow-hidden bg-gradient-to-br from-biomonie-teal-dark via-biomonie-teal-mid to-biomonie-teal px-[5%] py-[100px] text-center"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,255,0,0.08),transparent)]" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <div className="mx-auto mb-5 w-fit border-l-[3px] border-biomonie-lemon pl-3 text-left text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">
            Join the BIOMONIE Ecosystem Today
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mb-6 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] text-white">
            <span className="text-biomonie-lemon drop-shadow-[0_0_24px_rgba(245,255,0,0.12)]">YOU</span> are the new money access.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-12 max-w-[600px] text-[1.06rem] leading-[1.75] text-white/[0.82]">
            Register free as a Customer, Agent, Merchant, or Affiliate BRM. Start earning the moment your first referral transacts. Everybody earns in the BIOMONIE ecosystem.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="inline-block rounded-lg bg-biomonie-lemon px-10 py-4 text-[1.05rem] font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.22)]"
              >
                Create Your Free Account
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <a
                href="#earn"
                className="inline-block rounded-lg border-2 border-white/[0.42] bg-white/[0.06] px-10 py-4 text-[1.05rem] font-semibold text-white no-underline backdrop-blur-sm transition duration-200 hover:border-biomonie-lemon hover:bg-biomonie-lemon/[0.08] hover:text-biomonie-lemon"
              >
                See the Earning Guide
              </a>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
