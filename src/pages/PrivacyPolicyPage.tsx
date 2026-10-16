import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  'Who We Are',
  'Lawful Basis for Processing Your Data',
  'What Personal Data Do We Collect?',
  'How Do We Use Your Personal Data?',
  'Biometric Verification',
  'How Long Do We Retain Your Personal Data?',
  'Sharing Your Personal Data',
  'Data Security',
  'Your Rights Under the NDPA',
  'Cookies and Tracking Technologies',
  "Children's Privacy",
  'Changes to This Privacy Policy',
  'Contact Us',
];

const sectionClass =
  'scroll-mt-28 border-b border-[#e3edf1] py-8 last:border-b-0 sm:py-10';
const subheadingClass =
  'mb-2 mt-7 text-base font-bold text-biomonie-text first:mt-0';
const listClass =
  'my-4 list-disc space-y-2.5 pl-6 text-base leading-7 text-biomonie-text/75 marker:text-biomonie-teal';
const paragraphClass = 'mt-4 text-base leading-7 text-biomonie-text/75';

export default function PrivacyPolicyPage() {
  const { pathname, search } = useLocation();
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Privacy Policy | Biomonie';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let currentSection: number | null = null;

    const updateActiveSection = () => {
      frame = 0;
      const activationLine = Math.min(180, window.innerHeight * 0.22);
      let nextSection: number | null = null;

      sections.forEach((_, index) => {
        const heading = document.querySelector(`#section-${index + 1} h2`);
        if (heading && heading.getBoundingClientRect().top <= activationLine) {
          nextSection = index + 1;
        }
      });

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8
      ) {
        nextSection = sections.length;
      }

      if (nextSection === currentSection) return;
      currentSection = nextSection;
      setActiveSection(nextSection);

      const hash = nextSection ? `#section-${nextSection}` : '';
      const nextUrl = `${pathname}${search}${hash}`;
      if (
        `${window.location.pathname}${window.location.search}${window.location.hash}` !==
        nextUrl
      ) {
        window.history.replaceState(window.history.state, '', nextUrl);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

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
      <Navbar />
      <main
        id="privacy-policy-top"
        className="min-h-screen scroll-mt-20 bg-[linear-gradient(to_bottom,theme(colors.biomonie.teal)_0,theme(colors.biomonie.teal)_5rem,theme(colors.biomonie.pale)_15rem)] pb-16 pt-28 sm:pb-20 sm:pt-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-[5%]">
          <header className="relative mb-8 overflow-hidden rounded-3xl bg-biomonie-teal-dark px-6 py-8 text-white shadow-biomonie-md sm:mb-10 sm:px-10 sm:py-11">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-biomonie-teal/40 blur-3xl"
            />
            <div className="relative max-w-3xl">
              <p className="mb-3 inline-flex items-center rounded-full border border-biomonie-lemon/30 bg-biomonie-lemon/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-biomonie-lemon">
                Legal &amp; privacy
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Privacy Policy
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/65">
                <span>Biomonie Technologies Limited</span>
                <span aria-hidden="true" className="text-biomonie-lemon">
                  ·
                </span>
                <span>Version 1.0</span>
                <span aria-hidden="true" className="text-biomonie-lemon">
                  ·
                </span>
                <span>Effective: 14 October 2026</span>
                <span aria-hidden="true" className="text-biomonie-lemon">
                  ·
                </span>
                <span>Last reviewed: 14 October 2026</span>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-[1.05rem]">
                At Biomonie Technologies Limited, the privacy and security of
                your personal data is fundamental to everything we do. This
                Privacy Policy explains how we collect, use, store, share and
                protect your personal data when you access our website, use our
                mobile application, or engage with our services.
              </p>
              <p className="mt-6 text-sm font-semibold text-biomonie-lemon">
                Use the contents below to jump to a section, or scroll to read
                the full policy.
              </p>
            </div>
          </header>

          <div className="grid items-start gap-5 lg:grid-cols-[230px_minmax(0,760px)] lg:justify-center lg:gap-8">
            <nav
              aria-label="Privacy policy contents"
              className="rounded-2xl border border-[#dde8f0] bg-white shadow-biomonie-sm lg:sticky lg:top-24"
            >
              <details className="group lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-biomonie-text marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>Jump to a section</span>
                  <span className="text-biomonie-teal transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <ol className="grid list-none grid-cols-1 gap-1 border-t border-[#e3edf1] px-3 py-3 sm:grid-cols-2">
                  {sections.map((section, index) => (
                    <li key={section}>
                      <a
                        href={`#section-${index + 1}`}
                        aria-current={
                          activeSection === index + 1 ? 'location' : undefined
                        }
                        className={`block rounded-lg px-3 py-2 text-sm leading-snug transition-colors focus-visible:bg-biomonie-pale ${
                          activeSection === index + 1
                            ? 'bg-biomonie-pale font-semibold text-biomonie-teal'
                            : 'text-biomonie-text/70 hover:bg-biomonie-pale hover:text-biomonie-teal'
                        }`}
                      >
                        <span className="mr-1 font-semibold text-biomonie-teal">
                          {index + 1}.
                        </span>
                        {section}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
              <div className="hidden p-4 lg:block">
                <h2 className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.12em] text-biomonie-text/55">
                  On this page
                </h2>
                <ol className="privacy-toc-scrollbar max-h-[calc(100dvh-9rem)] list-none space-y-1 overflow-y-auto overscroll-contain pr-1">
                  {sections.map((section, index) => (
                    <li key={section}>
                      <a
                        href={`#section-${index + 1}`}
                        aria-current={
                          activeSection === index + 1 ? 'location' : undefined
                        }
                        className={`block rounded-lg px-2.5 py-2 text-sm leading-snug transition-colors ${
                          activeSection === index + 1
                            ? 'bg-biomonie-pale font-semibold text-biomonie-teal'
                            : 'text-biomonie-text/70 hover:bg-biomonie-pale hover:text-biomonie-teal'
                        }`}
                      >
                        <span className="mr-1 font-semibold text-biomonie-teal">
                          {index + 1}.
                        </span>
                        {section}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article className="min-w-0 rounded-2xl border border-[#dde8f0] bg-white px-5 shadow-biomonie-sm sm:px-8">
              <section id="section-1" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  1. Who We Are
                </h2>
                <p className={paragraphClass}>
                  Biomonie Technologies Limited (&quot;Biomonie&quot;,
                  &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a
                  financial technology company incorporated in Nigeria,
                  developing and operating a biometric-enabled digital payments
                  ecosystem. Our platform enables users to make and receive
                  payments, onboard customers, merchants and agents, and
                  participate in a structured earning network through our
                  Single-Level Downline (SLD) programme.
                </p>
                <p className={paragraphClass}>
                  This Privacy Policy applies to all users of our website,
                  mobile application, and associated services, including
                  customers, merchants, agents, and SRMs.
                </p>
                <p className={paragraphClass}>
                  We are committed to compliance with the{' '}
                  <strong>Nigeria Data Protection Act 2023 (NDPA)</strong> and
                  all applicable data protection regulations issued by the
                  Nigeria Data Protection Commission (NDPC).
                </p>
              </section>

              <section id="section-2" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  2. Lawful Basis for Processing Your Data
                </h2>
                <p className={paragraphClass}>
                  Depending on the nature of your interaction with us, we rely
                  on one or more of the following lawful bases to process your
                  personal data:
                </p>
                <ul className={listClass}>
                  <li>
                    <strong>Performance of a contract:</strong> Processing
                    necessary to provide you with our services, including
                    executing transactions, onboarding you as a user, merchant,
                    agent, or SRM, and managing your account.
                  </li>
                  <li>
                    <strong>Consent:</strong> Where you have expressly consented
                    to a specific processing activity, such as receiving
                    marketing communications or sharing your biometric data for
                    authentication. You may withdraw consent at any time without
                    affecting the lawfulness of prior processing.
                  </li>
                  <li>
                    <strong>Legal obligation:</strong> Processing required to
                    comply with applicable Nigerian laws and regulations,
                    including anti-money laundering (AML), know-your-customer
                    (KYC), and Central Bank of Nigeria (CBN) directives.
                  </li>
                  <li>
                    <strong>Legitimate interests:</strong> Processing necessary
                    for our legitimate business interests, including fraud
                    prevention, network security, improving our services, and
                    communicating with you about account-related matters,
                    provided such interests are not overridden by your rights
                    and freedoms.
                  </li>
                </ul>
              </section>

              <section id="section-3" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  3. What Personal Data Do We Collect?
                </h2>
                <p className={paragraphClass}>
                  We collect personal data about you in the following
                  categories:
                </p>
                <h3 className={subheadingClass}>
                  Identity and Contact Information
                </h3>
                <ul className={listClass}>
                  <li>Full name, date of birth, gender</li>
                  <li>Phone number, email address, residential address</li>
                  <li>
                    Government-issued identity documents (NIN, BVN, and business
                    registration documents)
                  </li>
                </ul>
                <h3 className={subheadingClass}>Biometric Data</h3>
                <ul className={listClass}>
                  <li>
                    Biomonie does not store biometric data. A fingerprint scan
                    is captured momentarily at the point of verification,
                    transmitted in encrypted form to confirm against NIMC
                    database, matched to participant&apos;s BVN, and immediately
                    discarded. Only the verification result (identity confirmed)
                    is retained, together with the NIN and BVN identifiers you
                    provide.
                  </li>
                  <li>
                    NIN and BVN are identity reference numbers, not biometric
                    data. No biometric template or raw fingerprint image is held
                    on Biomonie&apos;s systems at any point.
                  </li>
                </ul>
                <h3 className={subheadingClass}>
                  Financial and Transaction Information
                </h3>
                <ul className={listClass}>
                  <li>Wallet details</li>
                  <li>
                    Transaction history: amounts sent and received, merchant
                    names, timestamps, and reference numbers
                  </li>
                  <li>Earning records under the SRM compensation structure</li>
                </ul>
                <h3 className={subheadingClass}>
                  KYC and Compliance Information
                </h3>
                <ul className={listClass}>
                  <li>
                    Verification data obtained from NIMC, NIBSS, credit bureaus,
                    and other third-party KYC service providers
                  </li>
                  <li>
                    Politically exposed person (PEP) and sanctions screening
                    results
                  </li>
                </ul>
                <h3 className={subheadingClass}>
                  Device and Technical Information
                </h3>
                <ul className={listClass}>
                  <li>
                    Device type, operating system, unique device identifiers
                  </li>
                  <li>IP address, browser type, mobile network information</li>
                  <li>App usage data and session logs</li>
                </ul>
                <h3 className={subheadingClass}>Location Data</h3>
                <ul className={listClass}>
                  <li>
                    Geolocation data (with your consent) to verify identity,
                    locate nearby agents, and comply with regulatory
                    requirements
                  </li>
                </ul>
                <h3 className={subheadingClass}>Communications</h3>
                <ul className={listClass}>
                  <li>
                    Records of your interactions with our customer support team
                  </li>
                  <li>Feedback, complaints, and survey responses</li>
                </ul>
                <p className={paragraphClass}>
                  We collect data directly from you during registration and use
                  of our services, automatically through your device, and from
                  authorised third-party sources including regulatory bodies and
                  verification agencies.
                </p>
              </section>

              <section id="section-4" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  4. How Do We Use Your Personal Data?
                </h2>
                <p className={paragraphClass}>
                  We process your personal data for the following purposes:
                </p>
                <h3 className={subheadingClass}>Service Delivery</h3>
                <ul className={listClass}>
                  <li>
                    To register and verify your identity as a customer,
                    merchant, agent, or SRM
                  </li>
                  <li>
                    To authenticate transactions by verifying your identity
                    against NIMC and NIBSS (BVN) databases using a momentary
                    fingerprint scan (no biometric data is retained by Biomonie)
                  </li>
                  <li>To manage your Biowallet or account</li>
                  <li>To facilitate payments between users and to merchants</li>
                </ul>
                <h3 className={subheadingClass}>
                  KYC and Regulatory Compliance
                </h3>
                <ul className={listClass}>
                  <li>
                    To fulfil obligations under the Nigeria Data Protection Act
                    2023, CBN guidelines, and anti-money laundering legislation
                  </li>
                  <li>
                    To conduct ongoing due diligence and update your KYC records
                    as required by law
                  </li>
                </ul>
                <h3 className={subheadingClass}>
                  Fraud Prevention and Security
                </h3>
                <ul className={listClass}>
                  <li>
                    To detect and prevent fraudulent, unauthorised, or illegal
                    transactions
                  </li>
                  <li>
                    To monitor for suspicious activity and enforce our Terms and
                    Conditions
                  </li>
                  <li>To verify device integrity and account access</li>
                </ul>
                <h3 className={subheadingClass}>SRM Programme Management</h3>
                <ul className={listClass}>
                  <li>
                    To track onboarding activity, transaction volumes, and
                    network performance for SRMs
                  </li>
                  <li>
                    To calculate and disburse SRM earnings and commissions
                  </li>
                  <li>
                    To administer Performers Club rankings and recognition
                    programmes
                  </li>
                </ul>
                <h3 className={subheadingClass}>Communications and Support</h3>
                <ul className={listClass}>
                  <li>
                    To communicate with you about your account, transactions,
                    and service updates
                  </li>
                  <li>To respond to your enquiries and resolve disputes</li>
                  <li>To send service-related notifications</li>
                </ul>
                <h3 className={subheadingClass}>
                  Marketing (with your consent)
                </h3>
                <ul className={listClass}>
                  <li>
                    To send promotional content about Biomonie products and
                    services by SMS, email, or push notification, where you have
                    opted in
                  </li>
                  <li>You may unsubscribe at any time</li>
                </ul>
                <h3 className={subheadingClass}>Analytics and Improvement</h3>
                <ul className={listClass}>
                  <li>
                    To analyse usage patterns and improve the functionality and
                    user experience of our platform
                  </li>
                  <li>
                    To conduct internal research, risk modelling, and product
                    development
                  </li>
                </ul>
                <p className={paragraphClass}>
                  We apply the principle of data minimisation: we collect and
                  process only what is necessary for the stated purpose.
                </p>
              </section>

              <section id="section-5" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  5. Biometric Verification - What We Do and Do Not Store
                </h2>
                <p className={paragraphClass}>
                  Biometric authentication is central to how Biomonie confirms
                  your identity. However,{' '}
                  <strong>
                    Biomonie does not collect, store, or retain any biometric
                    data.
                  </strong>
                </p>
                <p className={paragraphClass}>
                  Here is exactly what happens when you authenticate:
                </p>
                <ol className="my-4 list-decimal space-y-2.5 pl-6 text-base leading-7 text-biomonie-text/75 marker:font-semibold marker:text-biomonie-teal">
                  <li>Your device captures a fingerprint scan.</li>
                  <li>
                    The scan is transmitted in encrypted form to compare against
                    NIMC database and matched to the customer&apos;s BVN.
                  </li>
                  <li>
                    The database returns a confirmation result - identity
                    verified or not verified.
                  </li>
                  <li>
                    The fingerprint scan is immediately discarded. It is never
                    written to Biomonie&apos;s servers.
                  </li>
                </ol>
                <p className={paragraphClass}>
                  What Biomonie retains is only the{' '}
                  <strong>confirmation result</strong> (that your identity was
                  successfully verified) and the{' '}
                  <strong>NIN and BVN reference numbers</strong> you provide.
                  These are identity identifiers, not biometric data.
                </p>
                <p className={paragraphClass}>
                  Because we do not hold any biometric data, the special
                  category obligations under the NDPA that apply to stored
                  biometric data do not arise. Your fingerprint data exists only
                  on the government&apos;s own systems (NIMC/NIBSS), over which
                  Biomonie has no control and to which this Policy does not
                  apply.
                </p>
                <p className={paragraphClass}>
                  If our product or processes change in a way that involves
                  retention of biometric data, we will update this Policy,
                  notify you, and seek your explicit consent before doing so.
                </p>
              </section>

              <section id="section-6" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  6. How Long Do We Retain Your Personal Data?
                </h2>
                <p className={paragraphClass}>
                  We retain your personal data for only as long as necessary to
                  fulfil the purposes for which it was collected and to comply
                  with our legal and regulatory obligations.
                </p>
                <div className="my-5 overflow-x-auto rounded-lg border border-[#dde8f0]">
                  <table className="w-full min-w-[420px] border-collapse text-left text-sm sm:text-base">
                    <thead className="bg-biomonie-pale text-biomonie-text">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-bold">
                          Data Category
                        </th>
                        <th scope="col" className="px-4 py-3 font-bold">
                          Retention Period
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e3edf1] text-biomonie-text/75">
                      <tr>
                        <td className="px-4 py-3">Account registration data</td>
                        <td className="px-4 py-3">
                          Duration of account plus 7 years after closure
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Transaction records</td>
                        <td className="px-4 py-3">
                          Minimum 7 years (CBN/AML requirements)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Biometric templates</td>
                        <td className="px-4 py-3">
                          N/A - not retained (scans discarded immediately)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">
                          KYC verification documents
                        </td>
                        <td className="px-4 py-3">
                          7 years after last transaction
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Customer support records</td>
                        <td className="px-4 py-3">3 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Marketing preferences</td>
                        <td className="px-4 py-3">
                          Until you unsubscribe or account is closed
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Device and log data</td>
                        <td className="px-4 py-3">12 months rolling</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className={paragraphClass}>
                  Where we are required by law to retain data beyond the periods
                  above, we will do so and will inform you where practicable. At
                  the end of any retention period, data is securely deleted or
                  anonymised so that it can no longer be attributed to you.
                </p>
              </section>

              <section id="section-7" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  7. Sharing Your Personal Data
                </h2>
                <p className={paragraphClass}>
                  We do not sell your personal data. We may share your data with
                  the following categories of recipients, strictly on a
                  need-to-know basis:
                </p>
                <h3 className={subheadingClass}>
                  Regulatory and Government Bodies
                </h3>
                <ul className={listClass}>
                  <li>
                    The Central Bank of Nigeria (CBN), Nigeria Data Protection
                    Commission (NDPC), NFIU, EFCC, and other authorities as
                    required by law or court order
                  </li>
                </ul>
                <h3 className={subheadingClass}>
                  Identity Verification and KYC Providers
                </h3>
                <ul className={listClass}>
                  <li>
                    NIMC, NIBSS, credit bureaus, and licensed third-party KYC
                    verification platforms for identity and compliance checks
                  </li>
                </ul>
                <h3 className={subheadingClass}>
                  Financial and Banking Partners
                </h3>
                <ul className={listClass}>
                  <li>
                    Banks, payment processors, and switching networks necessary
                    to execute transactions on your behalf
                  </li>
                </ul>
                <h3 className={subheadingClass}>
                  Technology Service Providers
                </h3>
                <ul className={listClass}>
                  <li>
                    Cloud hosting, data storage, analytics, fraud detection, and
                    customer support vendors operating under binding data
                    processing agreements that require them to protect your data
                    to the same standard as this Policy
                  </li>
                </ul>
                <h3 className={subheadingClass}>SRM Network</h3>
                <ul className={listClass}>
                  <li>
                    Limited transactional and performance data may be visible to
                    your upline SRM for the purpose of calculating earnings and
                    managing the SRM programme, consistent with the programme
                    structure you enrolled into
                  </li>
                </ul>
                <h3 className={subheadingClass}>Business Transfers</h3>
                <ul className={listClass}>
                  <li>
                    In the event of a merger, acquisition, or sale of assets,
                    your data may be transferred to the successor entity, which
                    will be required to honour the commitments in this Policy
                  </li>
                </ul>
                <h3 className={subheadingClass}>With Your Consent</h3>
                <ul className={listClass}>
                  <li>
                    Any other sharing will only occur with your explicit, prior
                    consent
                  </li>
                </ul>
                <p className={paragraphClass}>
                  Where personal data is transferred outside Nigeria, we will
                  ensure appropriate safeguards are in place in compliance with
                  the NDPA, including Standard Contractual Clauses or equivalent
                  mechanisms approved by the NDPC.
                </p>
              </section>

              <section id="section-8" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  8. Data Security
                </h2>
                <p className={paragraphClass}>
                  We implement appropriate technical, physical, and
                  organisational measures to protect your Personal Data against
                  unauthorised access, loss, misuse, disclosure, alteration, or
                  destruction.
                </p>
                <h3 className={subheadingClass}>Technical Safeguards</h3>
                <ul className={listClass}>
                  <li>
                    <strong>Encryption in transit:</strong> All data transmitted
                    between the Biomonie app and our servers is encrypted using
                    TLS 1.2 or higher.
                  </li>
                  <li>
                    <strong>Biometric data:</strong> Biomonie does not store
                    biometric data. Fingerprint scans are transmitted in
                    encrypted form to NIMC/NIBSS for real-time identity
                    confirmation and discarded immediately. Only the
                    verification result and the user&apos;s NIN/BVN identifiers
                    are retained.
                  </li>
                  <li>
                    <strong>Access controls:</strong> We enforce role-based
                    access control (RBAC) and multi-factor authentication (MFA)
                    for all staff and systems that interact with Personal Data.
                  </li>
                  <li>
                    <strong>Tokenisation:</strong> Where possible, we substitute
                    raw personal identifiers with tokens so that the underlying
                    data is not exposed during routine processing.
                  </li>
                  <li>
                    <strong>Firewalls and intrusion detection:</strong> Our
                    infrastructure is protected by firewalls, real-time
                    intrusion detection systems, and continuous security
                    monitoring.
                  </li>
                </ul>
                <h3 className={subheadingClass}>Organisational Safeguards</h3>
                <ul className={listClass}>
                  <li>
                    We maintain a Data Protection Policy, an Information
                    Security Policy, and related internal procedures.
                  </li>
                  <li>
                    We provide regular data protection and security awareness
                    training to all authorised personnel.
                  </li>
                  <li>
                    Access to Personal Data is granted on a strict need-to-know
                    basis and is logged and audited.
                  </li>
                  <li>
                    We conduct periodic risk assessments and security reviews of
                    our systems and third-party processors.
                  </li>
                </ul>
                <h3 className={subheadingClass}>Physical Safeguards</h3>
                <ul className={listClass}>
                  <li>
                    Physical access to our facilities and server infrastructure
                    is restricted to authorised personnel.
                  </li>
                  <li>
                    CCTV monitoring may be in place at our offices and
                    operational sites.
                  </li>
                </ul>
                <h3 className={subheadingClass}>Breach Notification</h3>
                <p className={paragraphClass}>
                  In the event of a Personal Data breach likely to result in a
                  high risk to your rights and freedoms, we will notify you and
                  the Nigeria Data Protection Commission (NDPC) without undue
                  delay, and in any event within the timeframe prescribed by the
                  NDPA 2023. Our Data Protection Officer will address any
                  identified violation within 30 days of notice and take all
                  available remedies including correction, deletion, restriction
                  of further processing, or granting of access.
                </p>
                <h3 className={subheadingClass}>Your Responsibility</h3>
                <p className={paragraphClass}>
                  While we take all reasonable steps to safeguard your data,
                  account security also depends on you. Please keep your login
                  credentials and device PIN confidential, keep your devices
                  secure, and notify us immediately at the contact below if you
                  suspect unauthorised access. We will never ask you for your
                  PIN or password outside our authenticated platform.
                </p>
              </section>

              <section id="section-9" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  9. Your Rights Under the NDPA
                </h2>
                <p className={paragraphClass}>
                  As a data subject under the Nigeria Data Protection Act 2023,
                  you have the following rights with respect to your Personal
                  Data held by Biomonie:
                </p>
                <ul className={listClass}>
                  <li>
                    <strong>Right to be Informed</strong> - You have the right
                    to be told how your personal data is being used. This
                    Privacy Policy fulfils that obligation. Additional
                    information is provided at the point of collection and in
                    our Terms and Conditions.
                  </li>
                  <li>
                    <strong>Right of Access</strong> - You may request a copy of
                    the personal data we hold about you, along with information
                    on how we use it, who we share it with, and how long we keep
                    it.
                  </li>
                  <li>
                    <strong>Right to Rectification</strong> - You may ask us to
                    correct any inaccurate or incomplete personal data without
                    undue delay. Where we cannot make the correction, we will
                    note your request on file.
                  </li>
                  <li>
                    <strong>Right to Erasure</strong> - You may request deletion
                    of your personal data where the data is no longer necessary,
                    you withdraw consent, the data has been unlawfully
                    processed, erasure is required by law, or you object and
                    there are no overriding legitimate grounds.
                  </li>
                  <li>
                    <strong>Right to Object</strong> - You may object at any
                    time to processing based on our legitimate interests or for
                    direct marketing purposes.
                  </li>
                  <li>
                    <strong>Right to Restrict Processing</strong> - You may ask
                    us to restrict processing of your data where you contest its
                    accuracy, the processing is unlawful, we no longer need it
                    but you need it for a legal claim, or you have objected and
                    we are verifying our grounds.
                  </li>
                  <li>
                    <strong>Right to Data Portability</strong> - Subject to the
                    NDPC&apos;s directives and technical feasibility, you may
                    request your personal data in a commonly used,
                    machine-readable format for transfer to another service
                    provider.
                  </li>
                  <li>
                    <strong>Right to Object to Automated Decisions</strong> -
                    You have the right to object to any decision that
                    significantly affects you and is made solely by automated
                    means without human review.
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent</strong> - Where
                    processing is based on your consent, you may withdraw that
                    consent at any time, free of charge. Withdrawal does not
                    affect the lawfulness of processing carried out before
                    withdrawal.
                  </li>
                  <li>
                    <strong>Right to Lodge a Complaint</strong> - If you believe
                    your data protection rights have been violated, you may
                    lodge a complaint with the Nigeria Data Protection
                    Commission (NDPC) at{' '}
                    <a
                      className="font-semibold text-biomonie-teal underline underline-offset-2"
                      href="https://ndpc.gov.ng"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ndpc.gov.ng
                    </a>{' '}
                    or any other competent regulatory authority.
                  </li>
                </ul>
                <p className={paragraphClass}>
                  <strong>How to Exercise Your Rights</strong> - To exercise any
                  of the above rights, please contact our Data Protection
                  Officer using the details in Section 13. We will respond
                  within the timeframe required by the NDPA. We may need to
                  verify your identity before processing your request.
                </p>
              </section>

              <section id="section-10" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  10. Cookies and Tracking Technologies
                </h2>
                <p className={paragraphClass}>
                  When you visit our website, we use cookies and similar
                  technologies to improve your experience and the performance of
                  our platform.
                </p>
                <p className={paragraphClass}>
                  <strong>What are cookies?</strong> Cookies are small text
                  files placed on your device by websites you visit. They help
                  the website recognise your device, remember your preferences,
                  and understand how you use the site.
                </p>
                <h3 className={subheadingClass}>How we use cookies</h3>
                <ul className={listClass}>
                  <li>
                    <strong>Strictly necessary cookies:</strong> Essential for
                    the website to function, such as maintaining your session
                    during a visit. These cannot be disabled.
                  </li>
                  <li>
                    <strong>Functional cookies:</strong> Remember your
                    preferences (such as language or region) to personalise your
                    experience.
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Help us understand how
                    visitors interact with our website, so we can improve its
                    design and content. Information collected is aggregated and
                    anonymous.
                  </li>
                  <li>
                    <strong>Marketing cookies:</strong> Used, with your consent,
                    to deliver relevant promotions and track the effectiveness
                    of our campaigns.
                  </li>
                </ul>
                <p className={paragraphClass}>
                  <strong>Your choices</strong> - You may accept, decline, or
                  manage cookie settings through the cookie consent banner
                  displayed when you first visit our website. You can also
                  adjust cookie settings in your browser at any time. Please
                  note that disabling certain cookies may limit the
                  functionality of our website.
                </p>
                <p className={paragraphClass}>
                  We do not use cookies to track your activity outside of our
                  own website without your consent.
                </p>
              </section>

              <section id="section-11" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  11. Children&apos;s Privacy
                </h2>
                <p className={paragraphClass}>
                  Our services are not directed at, and we do not knowingly
                  collect personal data from, children under the age of 18. If
                  you are under 18, you may only use our platform under the
                  supervision and with the express consent of a parent or legal
                  guardian, and only to the extent permitted by applicable
                  Nigerian law.
                </p>
                <p className={paragraphClass}>
                  If we become aware that we have inadvertently collected
                  personal data from a child under 18 without verifiable
                  parental consent, we will take prompt steps to delete that
                  data. If you believe a child has provided us with personal
                  data, please contact our Data Protection Officer immediately
                  using the details in Section 13.
                </p>
              </section>

              <section id="section-12" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  12. Changes to This Privacy Policy
                </h2>
                <p className={paragraphClass}>
                  We review this Privacy Policy periodically and whenever there
                  is a substantial change to our business practices or
                  applicable regulatory requirements. Any revised Policy will be
                  effective from the date it is published on our website.
                </p>
                <p className={paragraphClass}>
                  Where changes are material, we will notify you through our
                  communication channels (website, app notifications, email, or
                  SMS) with reasonable notice before the changes take effect.
                  Your continued use of our services after the effective date of
                  any revised Policy constitutes your acceptance of those
                  changes.
                </p>
                <p className={paragraphClass}>
                  We will retain prior versions of this Policy and make them
                  available on request. At minimum, this Policy will be reviewed
                  annually.
                </p>
              </section>

              <section id="section-13" className={sectionClass}>
                <h2 className="text-xl font-extrabold text-biomonie-text">
                  13. Contact Us
                </h2>
                <p className={paragraphClass}>
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or the handling of your personal data,
                  please contact our Data Protection Officer:
                </p>
                <div className="mt-5 rounded-xl border border-biomonie-teal/15 bg-biomonie-pale p-5">
                  <p className="font-bold text-biomonie-text">
                    Data Protection Officer
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-biomonie-text/75">
                    Biomonie Technologies Limited
                    <br />
                    Email:{' '}
                    <a
                      className="font-semibold text-biomonie-teal underline underline-offset-2"
                      href="mailto:customer@biomonie.com"
                    >
                      customer@biomonie.com
                    </a>
                    <br />
                    Website:{' '}
                    <a
                      className="font-semibold text-biomonie-teal underline underline-offset-2"
                      href="https://www.biomonie.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      www.biomonie.com
                    </a>
                  </p>
                </div>
                <p className={paragraphClass}>
                  Follow us on social media or reach out through our website for
                  updates, support, and enquiries.
                </p>
                <p className={paragraphClass}>
                  We aim to respond to all data-related requests within the
                  timeframe required by the Nigeria Data Protection Act 2023. If
                  you are not satisfied with our response, you have the right to
                  escalate your complaint to the Nigeria Data Protection
                  Commission (NDPC) at{' '}
                  <a
                    className="font-semibold text-biomonie-teal underline underline-offset-2"
                    href="https://ndpc.gov.ng"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ndpc.gov.ng
                  </a>
                  .
                </p>
              </section>
            </article>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center text-sm sm:flex-row sm:gap-6">
            <a
              href="#privacy-policy-top"
              className="font-semibold text-biomonie-teal underline-offset-4 transition hover:text-biomonie-teal-mid hover:underline"
            >
              Back to top ↑
            </a>
            <Link
              to="/"
              className="font-semibold text-biomonie-teal underline-offset-4 transition hover:text-biomonie-teal-mid hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
