import { motion, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { PadlockWithKeyIcon } from '@/components/icons/PadlockWithKeyIcon';
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
            className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-biomonie-teal p-12 shadow-biomonie-md"
            whileHover={reduce ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(245,255,0,.14),transparent_58%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(145deg,transparent_40%,rgba(15,30,38,0.25)_100%)]" />
            {reduce ? (
              <PadlockWithKeyIcon
                className="relative z-[2] h-36 w-36 text-biomonie-lemon drop-shadow-[0_0_36px_rgba(245,255,0,0.35)]"
                strokeWidth={1.15}
              />
            ) : (
              <motion.div
                className="relative z-[2]"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                aria-hidden
              >
                <PadlockWithKeyIcon
                  className="h-36 w-36 text-biomonie-lemon drop-shadow-[0_0_36px_rgba(245,255,0,0.35)]"
                  strokeWidth={1.15}
                />
              </motion.div>
            )}
            <div className="relative z-[2] mt-5 inline-flex items-center justify-center gap-2 text-center text-[0.92rem] font-bold uppercase tracking-[0.12em] text-biomonie-lemon">
              <span>YOU are the money access</span>
              <PadlockWithKeyIcon
                className="h-4 w-auto shrink-0 text-biomonie-lemon [aspect-ratio:32/24]"
                strokeWidth={2.2}
              />
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
              ecosystem: from the moment you opt to join, you automaically
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
