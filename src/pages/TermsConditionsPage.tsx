import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type ContentBlock =
  | string
  | { list: string[] }
  | { clause: string; text: string }
  | { subclauses: string[] };
type TermsSection = { title: string; content: ContentBlock[] };

const sections: TermsSection[] = [
  {
    title: 'Introduction',
    content: [
      'These Terms and Conditions ("Terms") govern your access to and use of the Biomonie platform, including the Biomonie mobile application, website at www.biomonie.com, and all related services (collectively, the "Platform"). By registering for, accessing, or using any part of the Platform, you agree to be bound by these Terms.',
      'Biomonie is a financial technology platform that enables individuals and businesses in Nigeria to make and receive payments using biometric authentication. Biomonie also operates the Single-Level Downline (SLD) Programme, which where all Partners (Customers, merchants and agents earn by onboarding another partner.',
      'If you do not agree to these Terms, you must not register for or use the Platform. Your continued use of the Platform following any update to these Terms constitutes acceptance of the revised Terms.',
    ],
  },
  {
    title: 'Definitions',
    content: [
      'In these Terms, the following words have the meanings set out below:',
      { list: [
        '"Account" means your registered Biomonie user account.',
        '"Agent" means an individual or business enrolled on the Platform to provide Biomonie services on behalf of users at a physical location.',
        '"Biometric Data" means fingerprint scan data used solely for real-time identity verification; Biomonie does not store biometric templates.',
        '"BVN" means Bank Verification Number, a unique identifier issued by the Central Bank of Nigeria.',
        '"Merchant" means a business or individual registered on the Platform to accept payments.',
        '"NIN" means National Identification Number, a unique identifier issued by the National Identity Management Commission (NIMC).',
        '"Platform" has the meaning given in Section 1.',
        '"Services" means all features, functions, and products made available through the Platform.',
        '"SLD Programme" means the Single-Level Downline Programme operated by Biomonie.',
        '"Transaction" means any payment, transfer, or financial instruction made through the Platform.',
        '"Wallet" means the digital payment wallet linked to your Account on the Platform.',
        '"Partner", "you", "your" means any individual who registers for or uses the Platform; a customer.',
        '"We", "us", "our" refers to Biomonie and its authorised representatives.',
      ] },
    ],
  },
  {
    title: 'Eligibility and Account Registration',
    content: [
      { clause: '3.1 Eligibility.', text: 'To register for a Biomonie Account, you must:' },
      { list: [
        'be at least 18 years of age;',
        'be a Nigerian resident or a business registered in Nigeria;',
        'possess a valid BVN (for Tier 1) and NIN (for upgrade);',
        'provide accurate, current, and complete information during registration; and',
        'not be prohibited by any applicable law from using the Platform.',
      ] },
      { clause: '3.2 Registration Process.', text: 'When registering, you will be required to provide your BVN, complete a biometric verification check, and be placed on Tier One. For upgrade to Tier Two, you must then provide your NIN. Your fingerprint scan is transmitted by encryption for comparison the National Identity Management Commission (NIMC) and/or the Nigeria Inter-Bank Settlement System (NIBSS), and matched to participant’s BVN for identity verification. The scan is immediately discarded after verification; Biomonie does not retain/store your biometric data.' },
      { clause: '3.3 Account Security.', text: 'You are responsible for maintaining the confidentiality of your Account credentials and for all activities that occur under your Account. You must notify us immediately at contact@biomonie.com if you suspect any unauthorised access to your Account.' },
      { clause: '3.4 One Account Per Person.', text: 'You may only hold one personal Account. Operating multiple Accounts or registering on behalf of another person without authorisation is prohibited.' },
      { clause: '3.5 Merchant/Agent Accounts.', text: 'Merchants and Agents must provide valid business registration documents and comply with any additional onboarding requirements specified by Biomonie.' },
    ],
  },
  {
    title: 'Biomonie Services',
    content: [
      { clause: '4.1 Wallet.', text: 'Biomonie provides you with a digital Wallet to store funds, make payments, and receive transfers. The Wallet is not a bank account and does not accrue interest. Biomonie does not offer savings products or loans.' },
      { clause: '4.2 Biometric Payments.', text: 'You may authorise payments on the Platform using your fingerprint, subject to the conditions set out in Section 5.' },
      { clause: '4.3 Merchant Services.', text: 'Registered Merchants may use the Platform to accept payments from customers, access transaction records, and participate in the SLD Programme.' },
      { clause: '4.5 Agent Services.', text: 'Registered Agents may use the Platform to facilitate transactions and Platform onboarding for users at physical locations.' },
      { clause: '4.6 SLD Programme.', text: 'The SLD Programme lets Partners (Customer, Merchants and Agents) to onboard new partners on the platform and earn perpetually from their transactions and subscription renewal, for as long as the Downline remains active on the Platform. Specific terms applicable to SLD participation is comprehensively communicated In-App.' },
      { clause: '4.7 Service Availability.', text: 'Biomonie will use reasonable efforts to keep the Platform available at all times, but does not guarantee uninterrupted access. The Platform may be suspended for maintenance, upgrades, or circumstances beyond our reasonable control. Before any such interruptions, this will be promptly communicated to you.' },
    ],
  },
  {
    title: 'Biometric Payments',
    content: [
      { clause: '5.1 How It Works.', text: "Biomonie's biometric payment feature allows you to authorise a Transaction by presenting your enrolled fingerprint to a compatible device or terminal. The fingerprint scan is transmitted via an encrypted channel to NIMC and/or NIBSS (BVN) for real-time verification. Upon successful verification, the Transaction is processed. The scan is immediately discarded after each verification; no biometric template is stored by Biomonie." },
      { clause: '5.2 Your Consent.', text: 'By enrolling your fingerprint for biometric payments, you expressly consent to the real-time transmission of your fingerprint scan to NIMC and/or NIBSS for the sole purpose of identity verification.' },
      { clause: '5.3 Responsibility.', text: 'Every Transaction authorised using your fingerprint is deemed authorised by you. You are responsible for any Transaction completed through your biometric credentials unless you have notified Biomonie of any system error before the Transaction was completed.' },
      { clause: '5.4 Transaction Limits.', text: 'Biomonie may impose daily, per-transaction, or cumulative limits on biometric payments. Current applicable limits are displayed in your Account settings and may be updated from time to time.' },
    ],
  },
  {
    title: 'Third-Party Merchants and Services',
    content: [
      { clause: '6.1 Independent Merchants.', text: 'Merchants on the Platform are independent third parties. Biomonie provides the payment infrastructure but is not a party to any contract between you and a Merchant for the supply of goods or services. Any dispute about the quality, delivery, or fitness of goods or services must be resolved directly with the Merchant.' },
      { clause: '6.2 Biomonie Is Not a Merchant.', text: "Biomonie is not a Merchant and serves solely as a technology and payment services platform. Unless expressly stated otherwise, Biomonie does not manufacture, offer, sell, distribute, or endorse any goods or services provided by Merchants through the Platform. The listing, availability, or participation of a Merchant on the Platform shall not be construed as an endorsement, recommendation, warranty, or representation by Biomonie regarding the Merchant, its products, services, quality, reliability, legality, or business practices. All transactions for goods or services are solely between the Merchant and the Customer, and Biomonie shall not be responsible or liable for any Merchant's acts, omissions, products, services, or performance." },
      { clause: '6.3 Merchant Compliance.', text: 'Merchants are responsible for ensuring that their goods and services comply with all applicable Nigerian laws and regulations. Biomonie may remove a Merchant from the Platform if we reasonably determine that the Merchant is engaged in unlawful or prohibited activity.' },
    ],
  },
  {
    title: 'Transaction Processing',
    content: [
      { clause: '7.1 Authorisation.', text: 'A Transaction is initiated when you provide authorisation via fingerprint first, then your In-App PIN. Once authorised, a Transaction cannot be reversed by you except in accordance with Section 8 (Chargebacks and Refunds).' },
      { clause: '7.2 Processing Partners.', text: 'Biomonie uses licensed payment processors, switching companies, and financial institutions to process Transactions. By using the Platform you consent to Biomonie sharing your Transaction data with these partners to the extent necessary to complete your Transactions.' },
      { clause: '7.3 Undercharge Recovery.', text: 'If a Transaction is settled at an amount lower than the amount you authorised (an "undercharge") due to a technical error, Biomonie or the relevant processing partner may recover the shortfall from your Wallet. Biomonie will notify you of any such recovery. If recovery cannot be made from your Wallet balance, Biomonie may contact you to arrange repayment.' },
      { clause: '7.4 Failed Transactions.', text: 'Where a Transaction fails after your Wallet has been debited, Biomonie will use reasonable efforts to reverse the debit within two (2) business days. Biomonie is not liable for losses arising from delays caused by third-party payment processors or network failures.' },
      { clause: '7.5 Transaction Records.', text: 'Your Transaction history is available in your Account. You should check your Transaction history regularly and notify Biomonie promptly of any discrepancy.' },
    ],
  },
  {
    title: 'Chargebacks and Refunds',
    content: [
      { clause: '8.1 Raising a Dispute.', text: 'If you believe a Transaction was made without your authorisation, or if a funded Transaction was not fulfilled by the Merchant, you may raise a dispute by contacting us at customer@biomonie.com within 30 days of the Transaction date.' },
      { clause: '8.2 Investigation.', text: 'Biomonie will investigate the dispute and may request supporting information from you and the relevant Merchant. We will endeavour to resolve disputes within 10 business days of receiving all required information.' },
      { clause: '8.3 Refunds.', text: "If a dispute is resolved in your favour, a refund will be credited to your Wallet. Biomonie's decision on a chargeback or refund request is final in the absence of manifest error." },
      { clause: '8.4 Merchant Obligations.', text: "Merchants are required to co-operate with Biomonie's dispute resolution process. A Merchant's failure to respond within the stipulated timeframe may result in the dispute being resolved in the customer's favour and the Transaction amount being debited from the Merchant's account." },
      { clause: '8.5 No Refund for Authorised Transactions.', text: 'No refund will be issued for a Transaction that was properly authorised by you, unless the Merchant has agreed to a refund or Biomonie determines in its sole discretion that exceptional circumstances apply.' },
    ],
  },
  {
    title: 'Set-Off',
    content: [
      'Biomonie reserves the right to set off against your Wallet balance any amounts you owe to Biomonie, including amounts arising from:',
      { list: [
        'overpayments or duplicate payments credited to your Wallet in error;',
        'undercharge recoveries (Section 7.3);',
        'Transaction amounts reversed by a payment processor or financial institution following a fraud determination; or',
        'any other debt you owe Biomonie under these Terms.',
      ] },
      'Biomonie will notify you before exercising its right of set-off except where immediate action is required to prevent fraud or comply with applicable law.',
    ],
  },
  {
    title: 'Prohibited Conduct',
    content: [
      'You must not use the Platform to:',
      { list: [
        'conduct, facilitate, or conceal any illegal activity, including money laundering, terrorism financing, or fraud;',
        'impersonate any person or entity, or misrepresent your identity or affiliation;',
        'make payments for goods or services that are prohibited by Nigerian law;',
        "access or attempt to access another user's Account without authorisation;",
        'reverse-engineer, decompile, or attempt to derive the source code of the Platform;',
        'introduce any virus, malware, or disruptive code into the Platform;',
        'circumvent, disable, or tamper with any security, authentication, or fraud-detection feature of the Platform;',
        "use automated tools (bots, scrapers, crawlers) to interact with the Platform without Biomonie's prior written consent;",
        "engage in any activity that places an unreasonable or disproportionate load on the Platform's infrastructure; or",
        'use the Platform in any manner that violates these Terms, any applicable law, or any regulatory requirement.',
      ] },
      'Biomonie reserves the right to suspend or permanently close any Account found to be in breach of this Section, and to report the conduct to the relevant law enforcement or regulatory authorities.',
    ],
  },
  {
    title: 'Privacy',
    content: [
      'Your use of the Platform is also governed by our Privacy Policy, available at www.biomonie.com/privacy-policy. The Privacy Policy explains how we collect, use, store, and protect your personal data in accordance with the Nigeria Data Protection Act 2023. By using the Platform, you confirm that you have read and understood the Privacy Policy.',
    ],
  },
  {
    title: 'Communications',
    content: [
      { clause: '12.1 Service Notices.', text: 'Biomonie will send you notices, alerts, and account-related communications via email, SMS, or push notification to the contact details registered on your Account. It is your responsibility to keep your contact details current.' },
      { clause: '12.2 Marketing Communications.', text: 'We may send you promotional messages, offers, and updates about the Platform and the SLD Programme. You may opt out of marketing communications at any time by following the unsubscribe instructions in any marketing message or by contacting us at customer@biomonie.com. Opting out of marketing communications does not affect the delivery of essential service notices.' },
      { clause: '12.3 Electronic Consent.', text: 'You consent to receiving communications from Biomonie electronically. Electronic communications satisfy any legal requirement that communications be in writing.' },
    ],
  },
  {
    title: 'Suspension and Termination',
    content: [
      { clause: '13.1 Suspension by Biomonie.', text: 'Biomonie may suspend your Account immediately and without prior notice if we:' },
      { list: [
        'have reasonable grounds to suspect fraud, money laundering, or other illegal activity;',
        'are required to do so by a regulatory or law enforcement authority;',
        'determine that you have materially breached these Terms; or',
        'need to protect the integrity or security of the Platform.',
      ] },
      'Where practicable, Biomonie will notify you of a suspension and the reason for it promptly after the suspension takes effect.',
      { clause: '13.2 Termination by You.', text: 'You may close your Account at any time by contacting us at customer@biomonie.com. Before closure, you must withdraw or transfer any remaining Wallet balance. Biomonie is not responsible for any Wallet balance that remains unclaimed after closure.' },
      { clause: '13.3 Termination by Biomonie.', text: 'Biomonie may terminate your Account on 30 days\' written notice for any reason, or immediately upon a material breach of these Terms. On termination, you must immediately cease use of the Platform.' },
      { clause: '13.4 Effect of Termination.', text: 'Termination does not affect any rights or obligations that accrued before the date of termination.' },
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      { clause: '14.1 No Indirect Loss.', text: 'To the fullest extent permitted by applicable law, Biomonie shall not be liable for any indirect, incidental, special, punitive, or consequential loss arising out of or in connection with your use of the Platform, including loss of profits, loss of data, or loss of business opportunity.' },
      { clause: '14.2', text: "Notwithstanding any other provision of this Agreement, Biomonie's total cumulative liability for all claims arising out of or in connection with this Agreement shall not exceed the lesser of:" },
      { subclauses: [
        '(a) the total fees, commissions, and charges earned by Biomonie from the Merchant during the ninety (90) days immediately preceding the event giving rise to the claim; or',
        '(b) ₦500,000 (Five Hundred Thousand Naira).',
      ] },
      'This limitation shall apply irrespective of the cause of action and whether such claim arises in contract, tort, negligence, breach of statutory duty, equity, or otherwise.',
      { clause: '14.3 No Warranty.', text: 'The Platform is provided "as is" and "as available". Biomonie makes no warranty, express or implied, that the Platform will be error-free, uninterrupted, or fit for any particular purpose beyond what is expressly stated in these Terms.' },
      { clause: '14.4 Exceptions.', text: "Nothing in these Terms limits Biomonie's liability for death or personal injury caused by its negligence, fraud, or any liability that cannot be excluded by applicable Nigerian law." },
    ],
  },
  {
    title: 'Dispute Resolution',
    content: [
      { clause: '15.1 Internal Complaints.', text: 'If you have a complaint about the Platform or any Transaction, please contact us first at customer@biomonie.com. We will acknowledge your complaint within 2 business days and aim to resolve it within 10 business days.' },
      { clause: '15.2 Mediation.', text: 'If we are unable to resolve a complaint through our internal process, either party may refer the dispute to mediation in Lagos, Nigeria. The mediator shall be agreed upon by both parties or, failing agreement within 10 days, appointed by the Lagos Court of Arbitration. Each party shall bear its own costs of mediation unless the mediator directs otherwise.' },
      { clause: '15.3 Governing Law and Jurisdiction.', text: 'These Terms are governed by the laws of the Federal Republic of Nigeria. If a dispute is not resolved by mediation, both parties submit to the exclusive jurisdiction of the courts of Lagos State, Nigeria.' },
      { clause: '15.4 Regulatory Complaints.', text: 'Nothing in this Section prevents you from lodging a complaint with the Central Bank of Nigeria or any other applicable regulatory authority.' },
    ],
  },
  {
    title: 'Modifications to These Terms',
    content: [
      'Biomonie may update these Terms from time to time. When we make material changes, we will notify you by email, push notification, or a prominent notice on the Platform at least 14 days before the changes take effect. Your continued use of the Platform after the effective date of an update constitutes your acceptance of the revised Terms. If you do not accept the revised Terms, you must stop using the Platform and may close your Account in accordance with Section 13.2.',
    ],
  },
  {
    title: 'General Provisions',
    content: [
      { clause: '17.1 Entire Agreement.', text: 'These Terms, together with the Privacy Policy and any supplemental terms applicable to specific Services, constitute the entire agreement between you and Biomonie in relation to your use of the Platform and supersede all prior agreements, representations, or understandings.' },
      { clause: '17.2 Severability.', text: 'If any provision of these Terms is found to be invalid, unlawful, or unenforceable, that provision shall be modified to the minimum extent necessary to make it valid and enforceable. All other provisions shall remain in full force.' },
      { clause: '17.3 Waiver.', text: "Biomonie's failure to enforce any provision of these Terms on any occasion shall not constitute a waiver of that provision or of Biomonie's right to enforce it in the future." },
      { clause: '17.4 Assignment.', text: "You may not assign, transfer, or sub-license your rights or obligations under these Terms without Biomonie's prior written consent. Biomonie may assign its rights under these Terms to an affiliate, successor, or acquirer without your consent." },
      { clause: '17.5 Force Majeure.', text: 'Biomonie shall not be liable for any failure or delay in performance caused by circumstances beyond its reasonable control, including acts of God, government actions, network outages, or power failures.' },
      { clause: '17.6 Survival.', text: 'Sections 10, 11, 15, 16, and this Section 18 survive the termination or expiry of these Terms.' },
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about these Terms, your Account, or the Platform, we are here to help.',
      'Biomonie Technologies Limited',
      'Data Protection Officer',
      'Email: dpo@biomonie.com',
      'Biomonie',
      'Email: contact@biomonie.com',
      'Website: www.biomonie.com',
      'Stay connected with us; follow Biomonie on social media for product updates, merchant tips, and SLD Programme news. Find us on Instagram, Facebook, Twitter/X, and LinkedIn by searching @Biomonie.',
      'Biomonie · The New Form of Money Access. "YOU".',
    ],
  },
];

const sectionClass = 'scroll-mt-28 border-b border-[#e3edf1] py-8 last:border-b-0 sm:py-10';
const paragraphClass = 'mt-4 text-base leading-7 text-biomonie-text/75';

export default function TermsConditionsPage({ appVersion = false }: { appVersion?: boolean }) {
  const { pathname, search } = useLocation();
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${appVersion ? 'App ' : ''}Terms & Conditions | Biomonie`;
    return () => { document.title = previousTitle; };
  }, [appVersion]);

  useEffect(() => {
    let frame = 0;
    let currentSection: number | null = null;
    const updateActiveSection = () => {
      frame = 0;
      const activationLine = Math.min(180, window.innerHeight * 0.22);
      let nextSection: number | null = null;
      sections.forEach((_, index) => {
        const heading = document.querySelector(`#terms-section-${index + 1} h2`);
        if (heading && heading.getBoundingClientRect().top <= activationLine) nextSection = index + 1;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) nextSection = sections.length;
      if (nextSection === currentSection) return;
      currentSection = nextSection;
      setActiveSection(nextSection);
      const nextUrl = `${pathname}${search}${nextSection ? `#section-${nextSection}` : ''}`;
      if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextUrl) {
        window.history.replaceState(window.history.state, '', nextUrl);
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateActiveSection); };
    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname, search]);

  return (
    <>
      {!appVersion && <Navbar />}
      <main id="terms-top" className={`min-h-screen scroll-mt-20 pb-16 sm:pb-20 ${appVersion ? 'bg-[linear-gradient(to_bottom,theme(colors.biomonie.teal)_0,theme(colors.biomonie.teal)_2rem,theme(colors.biomonie.pale)_9rem)] pt-8 sm:pt-12' : 'bg-[linear-gradient(to_bottom,theme(colors.biomonie.teal)_0,theme(colors.biomonie.teal)_5rem,theme(colors.biomonie.pale)_15rem)] pt-28 sm:pt-32'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-[5%]">
          <header className="relative mb-8 overflow-hidden rounded-3xl bg-biomonie-teal-dark px-6 py-8 text-white shadow-biomonie-md sm:mb-10 sm:px-10 sm:py-11">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-biomonie-teal/40 blur-3xl" />
            <div className="relative max-w-3xl">
              <p className="mb-3 inline-flex items-center rounded-full border border-biomonie-lemon/30 bg-biomonie-lemon/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-biomonie-lemon">Legal &amp; terms</p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Terms &amp; Conditions</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/65">
                <span>Biomonie Technologies Limited</span><span aria-hidden="true" className="text-biomonie-lemon">·</span><span>Effective: 15 October 2026</span>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">These Terms and Conditions ("Terms") govern your access to and use of the Biomonie platform, including the Biomonie mobile application, website at www.biomonie.com, and all related services (collectively, the "Platform").</p>
              <p className="mt-6 text-sm font-semibold text-biomonie-lemon">Use the contents below to jump to a section, or scroll to read the full terms.</p>
            </div>
          </header>

          <div className="grid items-start gap-5 lg:grid-cols-[230px_minmax(0,760px)] lg:justify-center lg:gap-8">
            <nav aria-label="Terms and conditions contents" className="rounded-2xl border border-[#dde8f0] bg-white shadow-biomonie-sm lg:sticky lg:top-24">
              <details className="group lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-biomonie-text marker:hidden [&::-webkit-details-marker]:hidden"><span>Jump to a section</span><span className="text-biomonie-teal transition-transform group-open:rotate-180">↓</span></summary>
                <ol className="grid list-none grid-cols-1 gap-1 border-t border-[#e3edf1] px-3 py-3 sm:grid-cols-2">
                  {sections.map((section, index) => <li key={section.title}><a href={`#terms-section-${index + 1}`} aria-current={activeSection === index + 1 ? 'location' : undefined} className={`block rounded-lg px-3 py-2 text-sm leading-snug transition-colors focus-visible:bg-biomonie-pale ${activeSection === index + 1 ? 'bg-biomonie-pale font-semibold text-biomonie-teal' : 'text-biomonie-text/70 hover:bg-biomonie-pale hover:text-biomonie-teal'}`}><span className="mr-1 font-semibold text-biomonie-teal">{index + 1}.</span>{section.title}</a></li>)}
                </ol>
              </details>
              <div className="hidden p-4 lg:block">
                <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.12em] text-biomonie-text/55">On this page</h2>
                <ol className="privacy-toc-scrollbar max-h-[calc(100dvh-9rem)] list-none space-y-1 overflow-y-auto overscroll-contain pr-1">
                  {sections.map((section, index) => <li key={section.title}><a href={`#terms-section-${index + 1}`} aria-current={activeSection === index + 1 ? 'location' : undefined} className={`block rounded-lg px-2.5 py-2 text-sm leading-snug transition-colors ${activeSection === index + 1 ? 'bg-biomonie-pale font-semibold text-biomonie-teal' : 'text-biomonie-text/70 hover:bg-biomonie-pale hover:text-biomonie-teal'}`}><span className="mr-1 font-semibold text-biomonie-teal">{index + 1}.</span>{section.title}</a></li>)}
                </ol>
              </div>
            </nav>

            <article className="min-w-0 rounded-2xl border border-[#dde8f0] bg-white px-5 shadow-biomonie-sm sm:px-8">
              {sections.map((section, index) => <section id={`terms-section-${index + 1}`} key={section.title} className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">{index + 1}. {section.title}</h2>
                {section.content.map((block, blockIndex) => {
                  if (typeof block === 'string') return <p key={blockIndex} className={paragraphClass}>{block}</p>;
                  if ('list' in block) return <ul key={blockIndex} className="my-4 list-disc space-y-2.5 pl-6 text-base leading-7 text-biomonie-text/75 marker:text-biomonie-teal">{block.list.map((item) => <li key={item}>{item}</li>)}</ul>;
                  if ('clause' in block) return <p key={blockIndex} className={paragraphClass}><strong>{block.clause}</strong> {block.text}</p>;
                  return <div key={blockIndex} className="my-3 space-y-3 pl-5 text-base leading-7 text-biomonie-text/75">{block.subclauses.map((subclause) => <p key={subclause}>{subclause}</p>)}</div>;
                })}
              </section>)}
            </article>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center text-sm sm:flex-row sm:gap-6">
            <a href="#terms-top" className="font-semibold text-biomonie-teal underline-offset-4 transition hover:text-biomonie-teal-mid hover:underline">Back to top ↑</a>
            {!appVersion && <Link to="/" className="font-semibold text-biomonie-teal underline-offset-4 transition hover:text-biomonie-teal-mid hover:underline">← Back to home</Link>}
          </div>
        </div>
      </main>
      {!appVersion && <Footer />}
    </>
  );
}
