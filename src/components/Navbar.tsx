import { useState, useEffect, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import BiomonieLogo from '@/components/icons/BiomonieLogo';
import { navigateToSection } from '@/lib/section-nav';

const navLinkClass =
  'relative text-sm font-medium text-white/[0.92] transition-colors duration-200 hover:text-biomonie-lemon after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-biomonie-lemon after:transition-all after:duration-300 hover:after:w-full';

/** Top-bar toggles; each scrolls to its card in the "Who is BIOMONIE for?" section. */
const audiences = [
  { id: 'for-customers', label: 'For Customers' },
  { id: 'for-merchants', label: 'For Merchants' },
  { id: 'for-agents', label: 'For Agents' },
] as const;

type AudienceId = (typeof audiences)[number]['id'];

/** Desktop navbar links (as in the Figma). */
const mainLinks = [
  { sectionId: 'products', label: 'Products' },
  { sectionId: 'how', label: 'How it works' },
];

/** The mobile menu also keeps the older shortcuts. */
const menuLinks = [
  ...mainLinks,
  { sectionId: 'who', label: "Who It's For" },
  { sectionId: 'earn', label: 'Earn' },
  { sectionId: 'merchants', label: 'For Merchants' },
  { sectionId: 'faq', label: 'FAQs' },
];

/** Which audience card is on screen; defaults to customers, as in the Figma. */
function useActiveAudience(): AudienceId {
  const [active, setActive] = useState<AudienceId>('for-customers');

  useEffect(() => {
    const update = () => {
      const header = document.getElementById('site-header');
      const headerBottom = header ? header.offsetHeight : 0;
      const middle = window.innerHeight * 0.5;
      const current = audiences.find(({ id }) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top < middle && rect.bottom > headerBottom;
      });
      setActive(current ? current.id : 'for-customers');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return active;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const activeAudience = useActiveAudience();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onSectionClick = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      window.setTimeout(() => navigateToSection(sectionId), 120);
      return;
    }
    navigateToSection(sectionId);
  };

  // See-through over the hero photo; solid once scrolled, on other pages, or with the menu open.
  const solid = scrolled || open || pathname === '/contact';

  return (
    <header id="site-header" className="fixed inset-x-0 top-0 z-[100]">
      <div className="bg-biomonie-teal shadow-[0_1px_0_rgba(255,255,255,0.06)]">
        <div className="mx-auto flex h-10 max-w-[1280px] items-center justify-end gap-4 px-3 sm:h-11 sm:px-[5%] xl:px-[4%]">
          <div
            className="flex min-w-0 items-center gap-1 sm:gap-2"
            role="group"
            aria-label="Choose who BIOMONIE is for"
          >
            {audiences.map((a) => {
              const isActive = activeAudience === a.id;
              return (
                <a
                  key={a.id}
                  href={`/${a.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => onSectionClick(e, a.id)}
                  className={`whitespace-nowrap rounded-md px-2 py-1.5 text-[0.7rem] font-semibold no-underline transition-colors duration-200 sm:px-3.5 sm:text-[0.8rem] ${
                    isActive
                      ? 'bg-biomonie-lemon text-biomonie-teal-dark shadow-biomonie-cta'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {a.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <motion.nav
        initial={false}
        animate={{
          boxShadow: solid
            ? '0 8px 32px rgba(15, 30, 38, 0.28)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`relative border-b transition-colors duration-300 ${
          solid
            ? 'border-biomonie-lemon/20 bg-biomonie-teal-dark/[0.96] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto grid h-16 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-[5%] lg:h-[68px] xl:px-[4%]">
          <Link
            to="/"
            className="flex min-w-0 items-center no-underline transition-opacity hover:opacity-95"
          >
            <BiomonieLogo
              className="block h-10 w-auto max-h-10 sm:h-11 sm:max-h-11"
              aria-label="Biomonie"
            />
          </Link>

          <ul className="hidden list-none items-center justify-center gap-8 lg:flex">
            {mainLinks.map((l) => (
              <li key={l.sectionId}>
                <a
                  href={`/${l.sectionId}`}
                  className={navLinkClass}
                  onClick={(e) => onSectionClick(e, l.sectionId)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/contact" className={`${navLinkClass} no-underline`}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center justify-end gap-2">
            <a
              href="/join"
              className="hidden whitespace-nowrap rounded-lg bg-biomonie-lemon px-5 py-2.5 text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_6px_28px_rgba(245,255,0,0.28)] active:scale-[0.98] lg:inline-block"
              onClick={(e) => onSectionClick(e, 'join')}
            >
              Get Started
            </a>
            <button
              type="button"
              className="shrink-0 rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-0 right-0 top-full z-[110] max-h-[calc(100dvh-7rem)] overflow-y-auto lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-b border-white/10 bg-biomonie-teal-dark px-[5%] py-5 shadow-biomonie-nav">
                <ul className="flex list-none flex-col gap-1">
                  {menuLinks.map((l) => (
                    <li key={l.sectionId}>
                      <a
                        href={`/${l.sectionId}`}
                        className="block rounded-lg px-2 py-3 text-[0.95rem] text-white/90 no-underline transition-colors hover:bg-white/5 hover:text-biomonie-lemon"
                        onClick={(e) => onSectionClick(e, l.sectionId)}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/contact"
                      className="block rounded-lg px-2 py-3 text-[0.95rem] text-white/90 no-underline transition-colors hover:bg-white/5 hover:text-biomonie-lemon"
                      onClick={() => setOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="pt-2">
                    <a
                      href="/join"
                      className="block rounded-lg bg-biomonie-lemon py-3 text-center text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta"
                      onClick={(e) => onSectionClick(e, 'join')}
                    >
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
