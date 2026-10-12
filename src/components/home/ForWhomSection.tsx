import type { ReactNode } from 'react';
import { ArrowRight, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/lib/motion';
import { navigateToSection } from '@/lib/section-nav';

/**
 * Card layouts from the Figma:
 * - split:  image and text sit in two separate rounded cards (Customers)
 * - framed: one card, text left, image framed on the right (Merchants)
 * - flush:  one card, image bleeds to the left edge, text on the right (Agents)
 */
type Layout = 'split' | 'framed' | 'flush';

type Card = {
  id: string;
  label: string;
  image: string;
  alt: string;
  headline: ReactNode;
  body: ReactNode;
  layout: Layout;
};

const earn =
  'Earn a fee for any Merchant/Agent referred and on all transactions performed by all your single level downlines (Customers/Merchants/Agents) perpetually.';

const cards: Card[] = [
  {
    id: 'for-customers',
    label: 'For Customers',
    image: '/imageforsection/ForCustomersImage.png',
    alt: 'Customer shopping and paying with BIOMONIE',
    headline: (
      <>
        Shop & Pay anywhere with{' '}
        <span className="text-biomonie-lemon">YOU</span> as the new form of
        money access.
      </>
    ),
    body: (
      <>
        No pin, No passwords and nothing else; just{' '}
        <span className="font-bold text-biomonie-lemon">YOU</span>.{' '}
        <span className="font-bold text-biomonie-lemon">YOU</span> are the money
        access; Flex, Pay or Spend everywhere and anywhere in the ecosystem.
      </>
    ),
    layout: 'split',
  },
  {
    id: 'for-merchants',
    label: 'For Merchants',
    image: '/imageforsection/ForMerchants.jpg',
    alt: 'Merchant accepting payment at her stall',
    headline:
      'Accept payment for goods and services at your shop, stall or outlets.',
    body: 'Your customers enjoys and pay with the new form of money access with zero downtime while both the merchant and customer uplines earn.',
    layout: 'framed',
  },
  {
    id: 'for-agents',
    label: 'For Agents',
    image: '/imageforsection/agent.webp',
    alt: 'Agent facilitating cash-in and cash-out',
    headline:
      'As the financial hub of the community facilitating cash-in & cash-out services with and other financial transactions',
    body: 'The customers enjoys the new form of money access with a flex and zero downtimes while both the agent and customer uplines earn.',
    layout: 'flush',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const panelBase =
  'relative overflow-hidden rounded-2xl border border-white/[0.14] shadow-biomonie-sm transition-colors duration-300 hover:border-biomonie-lemon/45';

/** Each card gets its own tint so the three read as distinct, as in the Figma. */
const tints: Record<Layout, string> = {
  split:
    'bg-[linear-gradient(160deg,rgba(58,122,150,.55)_0%,rgba(26,61,79,.85)_70%)]',
  framed:
    'bg-[linear-gradient(120deg,rgba(245,255,0,.10)_0%,rgba(58,122,150,.35)_45%,rgba(26,61,79,.9)_100%)]',
  flush: 'bg-biomonie-teal-dark/45',
};

function CardImage({ card, className }: { card: Card; className: string }) {
  return (
    <div className={`group/img relative overflow-hidden ${className}`}>
      <img
        src={card.image}
        alt={card.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
      />
    </div>
  );
}

function CardText({ card }: { card: Card }) {
  return (
    <div className="relative z-[1] flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-11">
      <div className="mb-4 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">
        {card.label}
      </div>
      <h3 className="mb-5 text-[clamp(1.55rem,3.1vw,2.5rem)] font-semibold leading-[1.16] tracking-tight text-white">
        {card.headline}
      </h3>
      <p className="mb-5 max-w-[52ch] text-[0.98rem] leading-relaxed text-white/[0.84]">
        {card.body}
      </p>
      <div className="mb-7 flex max-w-[52ch] items-start gap-2 border-t border-biomonie-lemon/25 pt-4 text-[0.8rem] font-semibold leading-snug text-biomonie-lemon/90">
        <Banknote className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
        {earn}
      </div>
      <button
        type="button"
        onClick={() => navigateToSection('join')}
        className="group inline-flex items-center gap-2 self-start text-[0.95rem] font-semibold text-biomonie-lemon transition-colors hover:text-white"
      >
        
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current transition-transform duration-200 group-hover:translate-x-1">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </button>
    </div>
  );
}

function AudienceCard({ card }: { card: Card }) {
  const hover = { whileHover: { y: -4 }, transition: { duration: 0.3, ease } };

  if (card.layout === 'split') {
    return (
      <div className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)]">
        <motion.div {...hover} className={panelBase}>
          <CardImage card={card} className="h-full min-h-[320px] sm:min-h-[420px]" />
        </motion.div>
        <motion.article
          {...hover}
          className={`${panelBase} ${tints.split} pb-[30%] min-[900px]:pb-[22%]`}
        >
          <CardText card={card} />
          <img
            src="/imageforsection/Globe.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full object-fill object-bottom"
          />
        </motion.article>
      </div>
    );
  }

  if (card.layout === 'framed') {
    return (
      <motion.article
        {...hover}
        className={`${panelBase} ${tints.framed} grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]`}
      >
        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,255,0,.12),transparent_70%)]" />
        <CardImage
          card={card}
          className="m-4 mb-0 min-h-[280px] rounded-xl shadow-[0_18px_40px_rgba(3,32,46,.35)] sm:min-h-[340px] min-[900px]:order-2 min-[900px]:my-6 min-[900px]:ml-0 min-[900px]:mr-6"
        />
        <div className="min-[900px]:order-1">
          <CardText card={card} />
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      {...hover}
      className={`${panelBase} ${tints.flush} grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]`}
    >
      <CardImage card={card} className="min-h-[300px] sm:min-h-[380px]" />
      <CardText card={card} />
    </motion.article>
  );
}

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
            Partners perpetually.
          </p>
        </Reveal>
        <div className="flex flex-col gap-8">
          {cards.map((card, i) => (
            // Scroll target sits outside Reveal so its slide-in offset doesn't skew the landing spot.
            <div key={card.id} id={card.id}>
              <Reveal delay={0.06 * i}>
                <AudienceCard card={card} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
