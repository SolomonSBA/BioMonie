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

  const links = [
    { id: 'how', label: 'How It Works' },
    { id: 'who', label: "Who It's For" },
    { id: 'earn', label: 'Earn' },
    { id: 'merchants', label: 'For Merchants' },
    { id: 'faq', label: 'FAQ' },
  ];

  const onSectionClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      window.setTimeout(() => navigateToSection(id), 120);
      return;
    }
    navigateToSection(id);
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
      className={`fixed left-0 right-0 top-0 z-[100] flex h-[68px] items-center justify-between border-b px-[5%] backdrop-blur-xl transition-colors duration-300 ${
        scrolled
          ? 'border-biomonie-lemon/25 bg-biomonie-teal-dark/[0.98]'
          : 'border-biomonie-lemon/20 bg-biomonie-teal-dark/[0.96]'
      }`}
    >
      <Link
        to="/"
        className="inline-flex items-center no-underline transition-opacity hover:opacity-95"
      >
        <BiomonieLogo className="h-12 w-auto" aria-label="Biomonie" />
      </Link>

      <ul className="hidden list-none items-center gap-8 min-[901px]:flex">
        {links.map((l) => (
          <li key={l.id}>
            <a
              href={`/${l.id}`}
              className={navLinkClass}
              onClick={(e) => onSectionClick(e, l.id)}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="/join"
            className="rounded-lg bg-biomonie-lemon px-5 py-2.5 text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition duration-200 ease-out-expo hover:bg-biomonie-lemon2 hover:shadow-[0_6px_28px_rgba(245,255,0,0.28)] active:scale-[0.98]"
            onClick={(e) => onSectionClick(e, 'join')}
          >
            Get Started
          </a>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-sm font-semibold text-biomonie-lemon no-underline transition-colors hover:text-white"
          >
            Contact
          </Link>
        </li>
      </ul>

      <button
        type="button"
        className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 min-[901px]:hidden"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 right-0 top-[68px] z-[110] min-[901px]:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-b border-white/10 bg-biomonie-teal-dark px-[5%] py-5 shadow-biomonie-nav">
              <ul className="flex list-none flex-col gap-1">
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`/${l.id}`}
                      className="block rounded-lg px-2 py-3 text-[0.95rem] text-white/90 no-underline transition-colors hover:bg-white/5 hover:text-biomonie-lemon"
                      onClick={(e) => onSectionClick(e, l.id)}
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
