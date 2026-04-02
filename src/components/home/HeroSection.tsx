import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { Globe } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { navigateToSection } from "@/lib/section-nav";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.58, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const onSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateToSection(id);
  };

  return (
    <section className="biomonie-grain relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-biomonie-teal-dark via-biomonie-teal-mid to-[#1e5c78] px-[5%] pb-24 pt-[120px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,38,0.2)_0%,transparent_45%,rgba(15,30,38,0.35)_100%)]" />
      <div className="pointer-events-none absolute -right-[8%] -top-[15%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.09),transparent_72%)]" />
      <div className="pointer-events-none absolute -bottom-[20%] -left-[5%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(41,92,114,.45),transparent_70%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1280px] grid-cols-1 items-stretch gap-y-14 min-[901px]:grid-cols-[1fr_1px_1fr] min-[901px]:gap-x-0 min-[901px]:gap-y-0">
        <div className="min-[901px]:col-span-3">
          <div className="mb-8 flex justify-center min-[901px]:mb-10">
            <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-biomonie-lemon/40 bg-biomonie-lemon/[0.11] px-4 py-2 text-left text-[0.72rem] font-bold uppercase leading-snug tracking-[0.14em] text-biomonie-lemon shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <Globe className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
              The First-Ever Global Biometric Cardless Payment Ecosystem
            </div>
          </div>
        </div>
        {/* Push this panel toward the center divider: outer flex justify-end + inner max-width (not w-full on outer). */}
        <div className="min-w-0 min-[901px]:flex min-[901px]:h-full min-[901px]:justify-end min-[901px]:pr-6 lg:pr-10">
          <div className="w-full max-w-[540px] text-left min-[901px]:text-right">
            <div className="min-[901px]:h-[470px] min-[901px]:overflow-visible">
            <FadeUp delay={0.08}>
              <h1 className="mb-6 text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
                <span className="block">The new</span>
                <span className="block">form of</span>
                <span className="block whitespace-nowrap text-[0.94em] tracking-[-0.05em]">Money Access</span>
                <em className="not-italic">
                  &quot;<span className="text-biomonie-lemon drop-shadow-[0_0_40px_rgba(245,255,0,0.15)]">YOU</span>&quot;
                </em>
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mb-10 text-[1.08rem] leading-[1.75] text-white/[0.88]">
                <span className="font-semibold text-biomonie-lemon">BIOMONIE</span> allows you to be the money access for all your payments and cash needs. No pin. No password.
                <br />
                Just <strong className="font-bold text-biomonie-lemon">YOU</strong>.
              </p>
            </FadeUp>
            </div>
            <FadeUp delay={0.22}>
              <div className="mb-16 flex flex-wrap justify-start gap-3 min-[901px]:justify-end sm:gap-4">
                <motion.a
                  href="/join"
                  onClick={(e) => onSectionClick(e, "join")}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block rounded-lg bg-biomonie-lemon px-9 py-3.5 text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)]"
                >
                  Get Started — It&apos;s Free
                </motion.a>
                <motion.a
                  href="/how"
                  onClick={(e) => onSectionClick(e, "how")}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block rounded-lg border-2 border-white/40 bg-white/[0.04] px-9 py-3.5 text-base font-semibold text-white no-underline backdrop-blur-[2px] transition duration-200 hover:border-biomonie-lemon hover:bg-white/[0.07] hover:text-biomonie-lemon"
                >
                  Learn How It Works
                </motion.a>
              </div>
            </FadeUp>
            <FadeUp delay={0.28}>
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-3 min-[901px]:justify-items-start min-[901px]:gap-x-5">
                {[
                  { k: "Zero", l: "Cost to join and refer" },
                  { k: "Payout", l: "Earned per activated Agent / Merchant referral" },
                  { k: "Low-cost", l: "Per transaction flat, simple, fair" },
                ].map((s) => (
                  <div key={s.k} className="text-left">
                    <div className="font-mono text-[2.15rem] font-bold leading-none tracking-tight text-biomonie-lemon">{s.k}</div>
                    <div className="mt-1.5 max-w-[11.5rem] text-[0.8rem] leading-snug text-white/[0.68] min-[901px]:max-w-[10rem]">{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="hidden min-[901px]:block w-px bg-gradient-to-b from-transparent via-white/[0.35] to-transparent" />

        <motion.div
          className="min-[901px]:pl-6 min-[901px]:h-full lg:pl-10"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: easeOutExpo }}
        >
          <div className="min-[901px]:h-[470px] min-[901px]:overflow-visible">
          <p className="mb-6 text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
            <span className="block">Introducing</span>
            <span className="block">the new</span>
            <span className="block">
              <span className="text-biomonie-lemon">BIOMONIE</span> Ecosystem
            </span>
          </p>
          <p className="mb-10 max-w-[500px] text-[clamp(0.94rem,1.15vw,1.02rem)] leading-[1.7] text-white/[0.86]">
            <span className="font-semibold text-biomonie-lemon">BIOMONIE</span> ecosystem allows customers to pay, merchants receive payments and agents offer cash-in and cash-out services. All with the new money access —{" "}
            <span className="font-semibold text-biomonie-lemon">YOU</span>.
          </p>
          </div>
           <div className="mb-16 flex flex-wrap justify-start gap-3 min-[901px]:justify-start sm:gap-4">
                <motion.a
                  href="/join"
                  onClick={(e) => onSectionClick(e, "join")}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block rounded-lg bg-biomonie-lemon px-9 py-3.5 text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_32px_rgba(245,255,0,0.25)]"
                >
               BIOMONIE Ecosystem
                </motion.a>
                <motion.a
                  href="/how"
                  onClick={(e) => onSectionClick(e, "how")}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block rounded-lg border-2 border-white/40 bg-white/[0.04] px-9 py-3.5 text-base font-semibold text-white no-underline backdrop-blur-[2px] transition duration-200 hover:border-biomonie-lemon hover:bg-white/[0.07] hover:text-biomonie-lemon"
                >
                  Learn How It Works
                </motion.a>
              </div>
          {/* <div className="mb-8 border-l-[3px] border-biomonie-lemon pl-3.5 text-[1.05rem] font-bold uppercase tracking-[0.12em] text-biomonie-lemon">
            BIOMONIE Ecosystem
          </div> */}
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-3 min-[901px]:justify-items-left min-[901px]:gap-x-5">
                {[
                  { k: "Customers", l: " can pay with a flex and earn." },
                  { k: "Merchants", l: "can receive payments with a flex and earn." },
                  { k: "Agents", l: "can provide agent banking services with a flex and earn." },
                ].map((s) => (
                  <div key={s.k} className="text-left">
                    <div className="font-mono text-[2.15rem] font-bold leading-none tracking-tight text-biomonie-lemon">{s.k}</div>
                    <div className="mt-1.5 max-w-[11.5rem] text-[0.8rem] leading-snug text-white/[0.68] min-[901px]:max-w-[10rem]">{s.l}</div>
                  </div>
                ))}
              </div>
          {/* <div className="flex flex-col gap-3">
            {[
              { t: "For Customers", d: "Where customers can pay with a flex and earn" },
              { t: "For Merchants", d: "Where merchants can receive payments with a flex and earn" },
              { t: "For Agents", d: "Where agents can provide agent banking services with a flex and earn" },
            ].map((box, i) => (
              <motion.div
                key={box.t}
                initial={reduce ? false : { opacity: 0, x: 14 }}
                animate={reduce ? false : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: easeOutExpo }}
                className="group rounded-[10px] border border-white/20 bg-white/[0.08] px-5 py-4 text-[0.88rem] leading-relaxed text-white/[0.9] shadow-biomonie-sm transition duration-300 hover:border-biomonie-lemon/45 hover:bg-biomonie-lemon/[0.12]"
              >
                <strong className="mb-1 block text-[0.76rem] font-bold uppercase tracking-[0.1em] text-biomonie-lemon">
                  {box.t}
                </strong>
                {box.d}
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
