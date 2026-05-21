import { motion, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Reveal, easeOutExpo } from '@/lib/motion';
import { navigateToSection } from '@/lib/section-nav';

export default function WhatSection() {
  const reduce = useReducedMotion();
  const onSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigateToSection(id);
  };

  return (
    <section id="about" className="bg-biomonie-pale px-[5%] py-[100px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 min-[900px]:grid-cols-2 min-[900px]:gap-20">
        <Reveal className="order-2 min-[900px]:order-1">
          <motion.div
            className="relative flex min-h-[520px] items-center justify-center"
            whileHover={reduce ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
          >
            <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
              <div className="pointer-events-none absolute -left-10 top-2 h-[80px] w-[80px] rounded-[44%_56%_60%_40%/52%_40%_60%_48%] bg-biomonie-lemon/40 blur-[0.5px]" />

              <div className="relative z-[2] w-[340px] overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(12,26,34,.18)]">
                <motion.img
                  src="/imageforsection/customer.webp"
                  alt="Biomonie biometric payment"
                  className="h-[500px] w-full object-cover object-top"
                  animate={
                    reduce
                      ? undefined
                      : { scale: [1, 1.035, 1], y: [0, -6, 0] }
                  }
                  transition={
                    reduce
                      ? undefined
                      : { duration: 9, repeat: Infinity, ease: 'easeInOut' }
                  }
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(12,26,34,.7)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(12,26,34,.78)_100%)]" />
                <div className="absolute bottom-5 left-5 font-serif text-[1.25rem] font-bold leading-[1.15] text-white">
                  Just <span className="text-biomonie-lemon">YOU</span>.
                  <br />
                  No pin. No card. No limit.
                </div>
              </div>

              <motion.div
                className="absolute -right-10 top-14 z-[2] hidden w-[140px] overflow-hidden border-4 border-cyan-50 rounded-2xl shadow-[0_18px_44px_rgba(12,26,34,.14)] min-[1100px]:block"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
                }
                aria-hidden
              >
                <img
                  src="/imageforsection/Firefly_Gemini Flash_A handsome Nigerian man in his late 20s to mid-30s, wearing a cream traditional agbad 735960.webp"
                  alt=""
                  className="h-[180px] w-full object-cover object-top"
                />
                {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(12,26,34,.45)_100%)]" /> */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(12,26,34,.78)_100%)]" />
              </motion.div>

              <motion.div
                className="absolute bottom-[22%] left-[-12%] z-[3] hidden items-center gap-2 rounded-xl border border-white/40 bg-white px-4 py-3 text-[0.78rem] font-semibold text-biomonie-text shadow-[0_8px_32px_rgba(0,0,0,.18)] sm:flex"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <span className="h-2 w-2 rounded-full bg-biomonie-lemon" />
                <span>No PIN needed</span>
              </motion.div>

              <motion.div
                className="absolute right-[-10%] top-[30%] z-[3] hidden items-center gap-2 rounded-xl border border-white/40 bg-white px-4 py-3 text-[0.78rem] font-semibold text-biomonie-text shadow-[0_8px_32px_rgba(0,0,0,.18)] sm:flex"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                      }
                }
              >
                <CheckCircle2 className="h-4 w-4 text-biomonie-teal" />
                <span>Zero chargebacks</span>
              </motion.div>
            </div>
          </motion.div>
        </Reveal>
        <div className="order-1 min-[900px]:order-2">
          <Reveal>
            <div className="mb-4 border-l-[3px] border-biomonie-lemon pl-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal">
              What is <strong className="text-biomonie-teal">BIOMONIE</strong>?
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mb-5 text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-biomonie-text">
              A new form of
              <br />
              <em className="not-italic text-biomonie-teal">money access.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-4 text-[1.06rem] leading-[1.78] text-biomonie-text/[0.78]">
              <strong className="font-semibold text-biomonie-teal">
                BIOMONIE
              </strong>{' '}
              is a payment platform that allows{' '}
              <strong className="font-semibold text-biomonie-teal">YOU</strong>{' '}
              (Finger or FACE){' '}
              {/* <strong className="font-semibold text-biomonie-text">No pin. No password. No wallet to carry.</strong> The only thing you need to pay or get paid is{" "}
              <strong className="font-semibold text-biomonie-teal">YOU</strong> verified instantly by your biometrics. */}
              to be the money access for all payment activities either to pay,
              receive payment or cash related services. No pin, No password and
              Nothing else. Just show up, flex and pay.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mb-4 text-[1.06rem] leading-[1.78] text-biomonie-text/[0.78]">
              Our Ecosystem powers everyday commerce for anyone;{' '}
              <strong className="font-semibold text-biomonie-text">
                merchants, market traders, and agency banking operators
              </strong>{' '}
              across the globe with a world-class payment platform that works
              for everyone and everywhere.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mb-8 text-[1.06rem] leading-[1.78] text-biomonie-text/[0.78]">
              Everybody earns in the{' '}
              <strong className="font-semibold text-biomonie-teal">
                BIOMONIE
              </strong>{' '}
              ecosystem: from the moment you opt to join, you Automatically
              become a Biomonie Affiliate and can grow your downlines and earn
              everytime tranasctions are performed.{' '}
              {/* <strong className="font-semibold text-biomonie-teal">YOU</strong>.
              No one is orphaned on{' '}
              <strong className="font-semibold text-biomonie-teal">
                BIOMONIE
              </strong> */}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <a
              href="/join"
              onClick={(e) => onSectionClick(e, 'join')}
              className="inline-block rounded-lg bg-biomonie-lemon px-8 py-3.5 text-base font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_8px_28px_rgba(245,255,0,0.22)] active:scale-[0.99]"
            >
              Register Now It&apos;s Free
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
