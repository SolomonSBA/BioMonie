import { Reveal } from '@/lib/motion';

const clanFlow = [
  { actor: 'Clan Member', action: 'Onboards' },
  { actor: 'Drives', action: 'Growth & Activity' },
  { actor: 'Supports', action: 'Ecosystem' },
  { actor: 'Earns', action: 'Continuously' },
] as const;

const clanStats = [
  {
    title: 'Payout',
    detail: 'Earned per activated Agent / Merchant referral.',
  },
  {
    title: 'Low-cost',
    detail: 'Per transaction - flat, simple and fair.',
  },
] as const;

export default function ClanSection() {
  return (
    <section
      id="clan"
      className="biomonie-grain relative overflow-hidden bg-gradient-to-br from-biomonie-teal-dark via-biomonie-teal-mid to-[#1b4f67] px-[5%] py-[90px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,38,0.2)_0%,transparent_45%,rgba(15,30,38,0.35)_100%)]" />
      <Reveal>
        {/* <div className="relative z-[1] mx-auto w-full max-w-[1140px] overflow-hidden rounded-2xl border border-biomonie-teal-light/25 bg-gradient-to-br from-biomonie-teal/16 via-biomonie-teal-mid/14 to-biomonie-teal-dark/20 shadow-[0_14px_44px_rgba(3,32,46,0.22)]"> */}
          <div className="grid grid-cols-1 items-center justify-center min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="relative border-b border-biomonie-teal-light/20 bg-biomonie-teal-dark/24 px-6 py-7 text-center min-[980px]:border-b-0 min-[980px]:border-r">
              <span className="absolute inset-y-0 left-0 w-[4px] bg-biomonie-lemon" />
              <h3 className="mx-auto max-w-[20ch] font-sans text-[clamp(1.08rem,1.85vw,1.75rem)] font-extrabold leading-[1.2] text-white">
                Built for the people behind the system.
              </h3>
              <p className="mt-3 font-sans text-[clamp(1.18rem,2vw,1.9rem)] font-extrabold leading-none text-white">
                <span className="text-biomonie-lemon">BIOMONIE</span> Clan
              </p>
            </div>

            <div className="bg-biomonie-teal-dark/12 px-6 py-7">
              <p className="mb-5 max-w-[66ch] text-[1rem] leading-relaxed text-white/100">
                <span className="font-semibold text-biomonie-lemon">BIOMONIE</span> Clan members do not just operate the network they power it, grow it, and earn from it. Every action contributes to the ecosystem, and every contribution is rewarded.
              </p>

              <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2 min-[1200px]:grid-cols-4">
                {clanFlow.map((item) => (
                  <div
                    key={item.actor}
                    className="rounded-md border border-biomonie-teal-light/30 bg-white/[0.03] px-3 py-2"
                  >
                    <p className="mb-1 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-biomonie-lemon">
                      {item.actor}
                    </p>
                    <p className="text-[0.76rem] font-semibold leading-tight text-white">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {clanStats.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-md border border-biomonie-teal-light/30 bg-white/[0.03] px-4 py-3"
                  >
                    <p className="mb-1 font-sans text-[1.02rem] font-extrabold leading-none text-biomonie-lemon">
                      {item.title}
                    </p>
                    <p className="text-[0.72rem] leading-snug text-white/70">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        {/* </div> */}
      </Reveal>
    </section>
  );
}
