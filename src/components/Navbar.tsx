import { useState, useEffect, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import BiomonieLogo from '@/components/icons/BiomonieLogo';
import { navigateToSection } from '@/lib/section-nav';

const navLinkClass =
  'relative text-sm font-medium text-white/[0.92] transition-colors duration-200 hover:text-biomonie-lemon after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-biomonie-lemon after:transition-all after:duration-300 hover:after:w-full';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
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

  /** `sectionId` must exist in section-nav; `key` is unique for React lists. */
  const links: { key: string; sectionId: string; label: string }[] = [
    { key: 'how', sectionId: 'how', label: 'How It Works' },
    { key: 'who', sectionId: 'who', label: "Who It's For" },
    { key: 'earn', sectionId: 'earn', label: 'Earn' },
    { key: 'customers', sectionId: 'who', label: 'For Customers' },
    { key: 'agents', sectionId: 'who', label: 'For Agents' },
    { key: 'merchants', sectionId: 'merchants', label: 'For Merchants' },
    { key: 'faq', sectionId: 'faq', label: 'FAQ' },
  ];

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

  return (
    <motion.nav
      initial={false}
      animate={{
        boxShadow: scrolled
          ? '0 8px 32px rgba(15, 30, 38, 0.28)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 top-0 z-[100] flex h-16 min-h-16 items-center justify-between gap-3 border-b px-4 backdrop-blur-xl transition-colors duration-300 sm:px-[5%] min-[1180px]:h-[68px] min-[1180px]:min-h-[68px] ${
        scrolled
          ? 'border-biomonie-lemon/25 bg-biomonie-teal-dark/[0.98]'
          : 'border-biomonie-lemon/20 bg-biomonie-teal-dark/[0.96]'
      }`}
    >
      <Link
        to="/"
        className="flex min-h-0 min-w-0 max-w-[50vw] shrink items-center no-underline transition-opacity hover:opacity-95 sm:max-w-[240px] min-[1180px]:max-w-[280px]"
      >
        <BiomonieLogo
          className="block h-12 w-auto max-h-12 translate-y-1 origin-left sm:h-[52px] sm:max-h-[52px] sm:translate-y-1.5 min-[1180px]:h-[60px] min-[1180px]:max-h-[60px] min-[1180px]:translate-y-[15px]"
          aria-label="Biomonie"
        />
      </Link>

      <ul className="hidden min-w-0 list-none items-center justify-end gap-3 min-[1180px]:flex 2xl:gap-5">
        {links.map((l) => (
          <li key={l.key} className="shrink-0">
            <a
              href={`/${l.sectionId}`}
              className={`${navLinkClass} whitespace-nowrap text-xs 2xl:text-sm`}
              onClick={(e) => onSectionClick(e, l.sectionId)}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li className="shrink-0">
          <a
            href="/join"
            className="whitespace-nowrap rounded-lg bg-biomonie-lemon px-4 py-2 text-xs font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_6px_28px_rgba(245,255,0,0.28)] active:scale-[0.98] 2xl:px-5 2xl:py-2.5 2xl:text-sm"
            onClick={(e) => onSectionClick(e, 'join')}
          >
            Get Started
          </a>
        </li>
        <li className="shrink-0">
          <Link
            to="/contact"
            className="whitespace-nowrap text-xs font-semibold text-biomonie-lemon no-underline transition-colors hover:text-white 2xl:text-sm"
          >
            Contact
          </Link>
        </li>
      </ul>

      <button
        type="button"
        className="shrink-0 rounded-lg p-2 text-white transition-colors hover:bg-white/10 min-[1180px]:hidden"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 right-0 top-16 z-[110] max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto min-[1180px]:top-[68px] min-[1180px]:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-b border-white/10 bg-biomonie-teal-dark px-[5%] py-5 shadow-biomonie-nav">
              <ul className="flex list-none flex-col gap-1">
                {links.map((l) => (
                  <li key={l.key}>
                    <a
                      href={`/${l.sectionId}`}
                      className="block rounded-lg px-2 py-3 text-[0.95rem] text-white/90 no-underline transition-colors hover:bg-white/5 hover:text-biomonie-lemon"
                      onClick={(e) => onSectionClick(e, l.sectionId)}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="/join"
                    className="block rounded-lg bg-biomonie-lemon py-3 text-center text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta"
                    onClick={(e) => onSectionClick(e, 'join')}
                  >
                    Get Started
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block rounded-lg px-2 py-3 text-center text-sm font-semibold text-biomonie-lemon no-underline hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
