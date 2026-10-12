import { Reveal } from '@/lib/motion';
import StoreBadges from '@/components/home/StoreBadges';

export default function JoinCTASection() {
  return (
    <section
      id="join"
      className="relative overflow-hidden bg-[#16323f] px-[5%] py-[88px] text-center sm:py-[100px]"
    >
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-5 text-[0.78rem] font-semibold tracking-[0.02em] text-biomonie-lemon sm:text-[0.84rem]">
            | Join the BIOMONIE Ecosystem Today
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mb-5 text-[clamp(1.85rem,5vw,3.15rem)] font-extrabold leading-[1.15] tracking-tight text-white">
            <span className="text-biomonie-lemon">YOU</span> are the new money
            access.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-10 max-w-[560px] text-[0.98rem] leading-[1.7] text-white/75 sm:text-[1.02rem]">
            Register free as a Customer, Agent, Merchant, or Affiliate BRM. Start
            earning the moment your first referral transacts. Everybody earns in
            the BIOMONIE ecosystem.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <StoreBadges className="justify-center" />
        </Reveal>
      </div>
    </section>
  );
}
