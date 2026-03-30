import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/lib/motion";

export default function Footer() {
  return (
    <footer className="border-t-2 border-biomonie-lemon/15 bg-biomonie-teal-dark px-[5%] py-14">
      <Reveal className="mb-10">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-xs">
            <Link to="/" className="mb-3 inline-flex items-center no-underline transition-opacity hover:opacity-90">
              <img
                src="/biomonie_logo_editable v2 PNG.png"
                alt="Biomonie"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-[0.84rem] leading-relaxed text-white/[0.58]">
              Explore the new form of money access  <strong className="font-semibold text-biomonie-lemon">YOU</strong>.
            </p>
            <p className="mt-2 text-[0.84rem] leading-relaxed text-white/[0.52]">
              Licensed &amp; compliant with central bank regulations globally.
            </p>
          </div>
          <div>
            <h5 className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">Platform</h5>
            <Link
              to="/"
              className="mb-1.5 block text-[0.86rem] text-white/[0.58] no-underline transition-colors hover:text-biomonie-lemon"
            >
              Home
            </Link>
            <a
              href="/#how"
              className="mb-1.5 block text-[0.86rem] text-white/[0.58] no-underline transition-colors hover:text-biomonie-lemon"
            >
              How It Works
            </a>
            <a
              href="/#merchants"
              className="mb-1.5 block text-[0.86rem] text-white/[0.58] no-underline transition-colors hover:text-biomonie-lemon"
            >
              For Merchants
            </a>
            <a
              href="/#who"
              className="mb-1.5 block text-[0.86rem] text-white/[0.58] no-underline transition-colors hover:text-biomonie-lemon"
            >
              For Agents
            </a>
          </div>
          <div>
            <h5 className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">Earn</h5>
            <a
              href="/#earn"
              className="mb-1.5 block text-[0.86rem] text-white/[0.58] no-underline transition-colors hover:text-biomonie-lemon"
            >
              Affiliate programme
            </a>
            <span className="mb-1 block text-[0.84rem] text-white/[0.42]">BRM &amp; portal links  coming soon</span>
          </div>
          <div>
            <h5 className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-biomonie-lemon">Contact</h5>
            <Link
              to="/contact"
              className="mb-1.5 block text-[0.86rem] text-white/[0.58] no-underline transition-colors hover:text-biomonie-lemon"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Reveal>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.12] pt-8"
      >
        <p className="text-[0.8rem] text-white/[0.48]">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-biomonie-lemon">BIOMONIE</span>. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
