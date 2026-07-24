import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal } from '@/lib/motion';
import BiomonieLogo from '@/components/icons/BiomonieLogo';

export default function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={`shrink-0 border-t-2 border-biomonie-lemon/15 bg-biomonie-teal-dark px-[5%] ${compact ? 'py-8' : 'py-14'}`}
    >
      <Reveal className={compact ? 'mb-6' : 'mb-10'}>
        <div className="max-w-xs">
          <Link
            to="/"
            className="mb-3 inline-flex items-center no-underline transition-opacity hover:opacity-90"
          >
            <BiomonieLogo className="h-10 w-auto" aria-label="Biomonie" />
          </Link>
          <p className="text-[0.84rem] leading-relaxed text-white/[0.58]">
            Explore the new form of money access{' '}
            <strong className="font-semibold text-biomonie-lemon">YOU</strong>.
          </p>
          <p className="mt-2 text-[0.84rem] leading-relaxed text-white/[0.52]">
            Licensed &amp; compliant with central bank regulations globally.
          </p>
        </div>
      </Reveal>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`flex flex-wrap items-center justify-center gap-2 border-t border-white/[0.12] ${compact ? 'pt-5' : 'pt-8'}`}
      >
        <p className="text-center text-[0.8rem] text-white/[0.48]">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-biomonie-lemon">BIOMONIE</span>.
          All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
