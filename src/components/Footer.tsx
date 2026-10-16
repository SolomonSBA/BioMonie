import { Link } from 'react-router-dom';
import type { MouseEvent, ReactNode } from 'react';
import { SiTiktok, SiX, SiWhatsapp } from 'react-icons/si';
import { Facebook, Instagram, Linkedin, Phone, Youtube } from 'lucide-react';
import BiomonieLogo from '@/components/icons/BiomonieLogo';
import { navigateToSection } from '@/lib/section-nav';

const productLinks = [
  { label: 'BIOMONIE Bills', href: '/how', sectionId: 'how' },
  { label: 'BIOMONIE Partners', href: '/earn', sectionId: 'earn' },
] as const;

const companyLinks = [
  { label: 'About BIOMONIE', href: '/how', sectionId: 'how' },
  { label: "Who It's For", href: '/who', sectionId: 'who' },
  { label: 'For Merchants', href: '/merchants', sectionId: 'merchants' },
  { label: 'Careers', href: '/contact', sectionId: '' },
  { label: 'Blog', href: '/contact', sectionId: '' },
  { label: 'Contact', href: '/contact', sectionId: '' },
] as const;

const legalLinks = [
  { label: 'Privacy policy', href: '/privacy-policy', sectionId: '' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions', sectionId: '' },
  { label: 'Acceptable use policy', href: '/privacy-policy', sectionId: '' },
  { label: 'Help center', href: '/contact', sectionId: '' },
  { label: 'FAQ', href: '/faq', sectionId: 'faq' },
] as const;

export default function Footer() {
  const onSectionClick = (
    e: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (!sectionId) return;
    e.preventDefault();
    navigateToSection(sectionId);
  };

  return (
    <footer className="border-t-2 border-biomonie-lemon bg-biomonie-teal-dark px-[5%] pb-8 pt-12 sm:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div className="max-w-xs">
            <Link
              to="/"
              className="mb-4 inline-flex items-center no-underline transition-opacity hover:opacity-90"
            >
              <BiomonieLogo className="h-10 w-auto" aria-label="Biomonie" />
            </Link>
            <p className="text-[0.86rem] leading-relaxed text-white/70">
              Explore the new form of money access{' '}
              <strong className="font-semibold text-biomonie-lemon">YOU</strong>
            </p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-white/55">
              Licensed &amp; compliant with central bank regulations globally.
            </p>
            <div className="mt-5 flex items-center gap-4 text-white">
              <a
                href="https://www.linkedin.com/company/biomonie?skipRedirect=true&viewAsMember=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_company%3Bok3x1pLvTIeRDYk5H6Fv2w%3D%3D&contentTrackingId=%2B%2BMz3tIpTNm%2B%2BTWKF1mMBg%3D%3D&viewName=premium-nav-upsell-text&upsellOrderOrigin=Tracking%3Av1%3Apremium_page_admin_top_nav_upsell%3ACompany%20Pages%20SKU%3AIn-Product"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BIOMONIE on LinkedIn"
                className="transition-colors hover:text-biomonie-lemon"
              >
                <Linkedin className="h-5 w-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.instagram.com/biomonie/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BIOMONIE on Instagram"
                className="transition-colors hover:text-biomonie-lemon"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61572337227483"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BIOMONIE on Facebook"
                className="transition-colors hover:text-biomonie-lemon"
              >
                <Facebook className="h-5 w-5" strokeWidth={1.75} />
              </a>
               <a
                href="https://x.com/Biomonie__"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BIOMONIE on X"
                className="transition-colors hover:text-biomonie-lemon"
              >
                <SiX className="h-5 w-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.youtube.com/@Biomonie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BIOMONIE on Youtube"
                className="transition-colors hover:text-biomonie-lemon"
              >
                <Youtube className="h-5 w-5" strokeWidth={1.75} />
              </a>
               <a
                href="https://www.tiktok.com/@biomonie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BIOMONIE on TikTok"
                className="transition-colors hover:text-biomonie-lemon"
              >
                <SiTiktok className="h-5 w-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://wa.me/2349047813250"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with BIOMONIE on WhatsApp"
                className="transition-colors hover:text-biomonie-lemon"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4 space-y-2 text-[0.86rem] text-white/70">
              <a
                href="https://wa.me/2349047813250"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-biomonie-lemon"
              >
                <SiWhatsapp className="h-4 w-4 shrink-0" />
                <span>WhatsApp: 09047813250</span>
              </a>
              <a
                href="tel:+2347127099907"
                className="flex items-center gap-2 transition-colors hover:text-biomonie-lemon"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>Customer Service Line: +2347127099907</span>
              </a>
            </div>
          </div>

          <FooterColumn title="PRODUCTS">
            {productLinks.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                onClick={
                  link.sectionId
                    ? (e) => onSectionClick(e, link.sectionId)
                    : undefined
                }
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="COMPANY">
            {companyLinks.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                onClick={
                  link.sectionId
                    ? (e) => onSectionClick(e, link.sectionId)
                    : undefined
                }
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="LEGAL & Support">
            {legalLinks.map((link) => (
              <FooterLink
                key={link.label}
                href={link.href}
                onClick={
                  link.sectionId
                    ? (e) => onSectionClick(e, link.sectionId)
                    : undefined
                }
              >
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <p className="mt-12 text-center text-[0.8rem] text-white/[60]">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-biomonie-lemon">BIOMONIE</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h5 className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-biomonie-lemon">
        {title}
      </h5>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  if (href === '/contact' && !onClick) {
    return (
      <Link
        to={href}
        className="block text-[0.9rem] text-white/70 no-underline transition-colors hover:text-biomonie-lemon"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className="block text-[0.9rem] text-white/70 no-underline transition-colors hover:text-biomonie-lemon"
    >
      {children}
    </a>
  );
}
