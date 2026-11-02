import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Loader2, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { submitAccountClosureRequest } from '@/lib/account-closure-api';

const accountTypes = ['Customer', 'Agent', 'Merchant', 'Sales Relationship Manager (SRM)'];
const requestReasons = [
  'No longer using the service',
  'Privacy concerns',
  'Switching to another provider',
  'Business closure',
  'Other',
];
const fieldClass = 'w-full rounded-lg border border-[#dde8f0] bg-white px-4 py-3 text-biomonie-text shadow-sm transition placeholder:text-biomonie-muted/55 focus:border-biomonie-teal focus:outline-none focus:ring-2 focus:ring-biomonie-teal/25';
const paragraphClass = 'text-sm leading-6 text-biomonie-text/75 sm:text-base sm:leading-7';

export default function AccountClosurePage({ appVersion = false }: { appVersion?: boolean }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${appVersion ? 'App ' : ''}Request Account Closure | Biomonie`;
    return () => { document.title = previousTitle; };
  }, [appVersion]);

  function toggleReason(reason: string) {
    setReasons((current) => current.includes(reason)
      ? current.filter((item) => item !== reason)
      : [...current, reason]);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!reasons.length) {
      setStatus('error');
      setError('Select at least one reason for your request.');
      return;
    }
    if (!confirmed) {
      setStatus('error');
      setError('Confirm that you understand account closure may be irreversible and some records may be retained before submitting.');
      return;
    }

    setStatus('sending');
    const result = await submitAccountClosureRequest({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      accountType,
      reasons,
      otherReason: otherReason.trim(),
      confirmed,
    });

    if (!result.ok) {
      setStatus('error');
      setError(result.error || 'We could not submit your request. Please try again.');
      return;
    }

    setReference(result.reference || '');
    setStatus('ok');
    setName('');
    setPhone('');
    setEmail('');
    setAccountType('');
    setReasons([]);
    setOtherReason('');
    setConfirmed(false);
  }

  return (
    <>
      {!appVersion && <Navbar />}
      <main className={`min-h-screen pb-16 sm:pb-20 ${appVersion ? 'bg-[linear-gradient(to_bottom,theme(colors.biomonie.teal)_0,theme(colors.biomonie.teal)_2rem,theme(colors.biomonie.pale)_9rem)] pt-8 sm:pt-12' : 'bg-[linear-gradient(to_bottom,theme(colors.biomonie.teal)_0,theme(colors.biomonie.teal)_5rem,theme(colors.biomonie.pale)_15rem)] pt-28 sm:pt-32'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-[5%]">
          <header className="relative mb-8 overflow-hidden rounded-3xl bg-biomonie-teal-dark px-6 py-8 text-white shadow-biomonie-md sm:mb-10 sm:px-10 sm:py-11">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-biomonie-teal/40 blur-3xl" />
            <div className="relative max-w-3xl">
              <p className="mb-3 inline-flex items-center rounded-full border border-biomonie-lemon/30 bg-biomonie-lemon/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-biomonie-lemon">Account closure &amp; privacy</p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Request account closure</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/65">
                <span>Biomonie Technologies Limited</span><span aria-hidden="true" className="text-biomonie-lemon">·</span><span>Effective: October 2026</span>
              </div>
              <p className="mt-2 max-w-3xl text-xs leading-5 text-white/60">In accordance with the Nigeria Data Protection Act (NDPA) 2023 and applicable CBN AML/CFT/CPF and record-retention requirements.</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">You have the right to request closure of your Biomonie account. Once your request is verified and all applicable closure requirements are met, your account will be closed and access disabled. Certain personal data and financial records may be retained where required or permitted by law.</p>
            </div>
          </header>

          <div className="mb-8 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950 sm:p-6">
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-red-700" />
            <div>
              <h2 className="font-bold">Account closure may be irreversible. It does not erase records Biomonie must lawfully retain.</h2>
              <p className="mt-1 text-sm leading-6 sm:text-base">Any remaining funds, earned commissions, and outstanding obligations must be resolved in accordance with applicable law and contractual terms. Please read the account-closure requirements below before submitting.</p>
            </div>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)] lg:gap-8">
            <div className="space-y-6">
              <InfoCard title="What account closure means">
                <p className={paragraphClass}>After a successful and verified closure request, Biomonie will:</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-biomonie-text/75 sm:text-base sm:leading-7">
                  <li>Close or deactivate your Biomonie account and Biowallet after outstanding balances and obligations are resolved.</li>
                  <li>Disable access to the account and associated services.</li>
                  <li>Revoke active login sessions and authentication tokens, subject to security and audit requirements.</li>
                  <li>Stop ordinary account activity and access following closure.</li>
                  <li>Assess associated personal data for deletion where no lawful basis for continued retention exists.</li>
                  <li>Retain records that must be preserved under applicable law.</li>
                </ul>
              </InfoCard>

              <InfoCard title="Eligible personal data and legal retention">
                <p className={paragraphClass}>Account closure does not automatically require deletion of all personal data. Biomonie will delete personal data eligible for erasure under applicable data protection law, but may retain KYC, identification, transaction, account, tax, audit, and compliance records where legally required or otherwise lawfully justified. Under section 8 of the Money Laundering (Prevention and Prohibition) Act 2022, transaction records generally must be retained for at least five (5) years after a transaction, and customer identification records for at least five (5) years after the business relationship ends. Other applicable requirements or lawful holds may require longer retention. Retained information will be protected and used only for lawful purposes.</p>
              </InfoCard>

              <InfoCard title="Eligibility conditions">
                <p className={paragraphClass}>Your account-closure request will be processed only if all of the following conditions are met:</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-biomonie-text/75 sm:text-base sm:leading-7">
                  <li>You are the verified account holder. Requests can only be made by the person whose account it is.</li>
                  <li>Your Biowallet balance is zero, or all remaining funds have been withdrawn, transferred, or otherwise lawfully resolved before closure.</li>
                  <li>Any active subscription has expired or been cancelled.</li>
                  <li>There are no unresolved commissions awaiting review or settlement. Accrued but undisbursed commissions will not automatically be forfeited merely because you submit a request.</li>
                  <li>Your account is not subject to a regulatory or compliance hold, law-enforcement directive, or active fraud investigation. If it is, your request will be paused until the hold is lifted.</li>
                </ul>
              </InfoCard>

              <InfoCard title="Submission requirements">
                <p className={paragraphClass}>To initiate an account-closure request, provide your registered full name, phone number and email address; select your account type and all applicable reasons; and confirm that you understand closure may be irreversible and some records may lawfully be retained.</p>
              </InfoCard>

              <InfoCard title="Processing timeline">
                <p className={`mb-3 ${paragraphClass}`}>These are operational target timelines, not statutory deadlines:</p>
                <ol className="space-y-3 text-sm leading-6 text-biomonie-text/75 sm:text-base sm:leading-7">
                  <li><strong className="text-biomonie-teal">Within 24 hours:</strong> We acknowledge your request and provide a unique reference number.</li>
                  <li><strong className="text-biomonie-teal">Within 2 business days:</strong> We verify your identity and confirm you are the account holder.</li>
                  <li><strong className="text-biomonie-teal">Within 5 business days:</strong> We complete account closure, provided all eligibility conditions and checks are satisfied.</li>
                </ol>
                <p className={`mt-3 ${paragraphClass}`}>If outstanding transactions, unresolved financial obligations, regulatory restrictions, or compliance investigations delay closure, we will notify you of the reason and provide an update. After closure, personal data eligible for deletion will be erased without undue delay, while records subject to statutory retention requirements will be securely preserved for the applicable period.</p>
              </InfoCard>

              <InfoCard title="Contact and escalation">
                <p className={paragraphClass}>For questions about this process, or to request access, correction, or portability of your personal data, contact our Data Protection Officer at <a className="font-semibold text-biomonie-teal underline underline-offset-2" href="mailto:dpo@biomonie.com">dpo@biomonie.com</a>.</p>
              </InfoCard>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-[#dde8f0] bg-white p-5 shadow-biomonie-sm sm:p-8">
              <div>
                <h2 className="text-xl font-extrabold text-biomonie-text sm:text-2xl">Submit an account-closure request</h2>
                <p className="mt-2 text-sm leading-6 text-biomonie-text/65">Provide the details registered to your account so we can verify your request. You can submit this form at <Link className="font-semibold text-biomonie-teal underline underline-offset-2" to="/request-account-closure">biomonie.com/request-account-closure</Link>.</p>
              </div>

              <Field label="Full name as registered" htmlFor="removal-name">
                <input id="removal-name" autoComplete="name" required maxLength={160} value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} />
              </Field>
              <Field label="Registered phone number" htmlFor="removal-phone">
                <input id="removal-phone" type="tel" autoComplete="tel" required maxLength={40} value={phone} onChange={(event) => setPhone(event.target.value)} className={fieldClass} placeholder="The phone number linked to your account" />
              </Field>
              <Field label="Account email address" htmlFor="removal-email">
                <input id="removal-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} />
              </Field>
              <Field label="Account type" htmlFor="removal-account-type">
                <select id="removal-account-type" required value={accountType} onChange={(event) => setAccountType(event.target.value)} className={fieldClass}>
                  <option value="" disabled>Select your account type</option>
                  {accountTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </Field>

              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-biomonie-text">Reason for request <span className="font-normal text-biomonie-text/55">(select all that apply)</span></legend>
                <div className="space-y-2">
                  {requestReasons.map((reason) => (
                    <label key={reason} className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e3edf1] px-3 py-2.5 text-sm text-biomonie-text/80 transition hover:bg-biomonie-pale/60">
                      <input type="checkbox" checked={reasons.includes(reason)} onChange={() => toggleReason(reason)} className="mt-0.5 h-4 w-4 shrink-0 accent-biomonie-teal" />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {reasons.includes('Other') && (
                <Field label="Please tell us more (optional)" htmlFor="removal-other-reason" required={false}>
                  <textarea id="removal-other-reason" rows={3} maxLength={500} value={otherReason} onChange={(event) => setOtherReason(event.target.value)} className={`${fieldClass} resize-y`} />
                </Field>
              )}

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-red-200 bg-red-50/70 p-4 text-sm leading-6 text-red-950">
                <input type="checkbox" required checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-red-700" />
                <span>I confirm I am the account holder and understand account closure may be irreversible. I understand that outstanding funds and obligations must be resolved, and that some personal data and financial records may be retained where required or permitted by law.</span>
              </label>

              {status === 'ok' && (
                <div role="status" className="flex gap-3 rounded-xl border border-biomonie-teal/20 bg-biomonie-teal/[0.08] p-4 text-sm leading-6 text-biomonie-teal">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>Your account-closure request was submitted{reference && <> with reference <strong>{reference}</strong></>}. We will verify your identity and eligibility before closing your account. This form does not close your account immediately.</p>
                </div>
              )}
              {status === 'error' && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">{error}</p>}

              <button type="submit" disabled={status === 'sending'} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-biomonie-teal px-6 py-3.5 font-bold text-white shadow-biomonie-sm transition duration-200 hover:bg-biomonie-teal-mid hover:shadow-biomonie-md disabled:cursor-not-allowed disabled:opacity-60">
                {status === 'sending' ? <><Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />Submitting request…</> : <><Send aria-hidden="true" className="h-5 w-5" />Submit account-closure request</>}
              </button>
              <p className="text-center text-xs leading-5 text-biomonie-text/55">You may also email <a className="font-semibold text-biomonie-teal underline underline-offset-2" href="mailto:dpo@biomonie.com?subject=Account%20Closure%20Request">dpo@biomonie.com</a> with the subject “Account Closure Request”.</p>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-biomonie-text/55">
            {!appVersion && <Link to="/" className="font-semibold text-biomonie-teal underline-offset-4 transition hover:text-biomonie-teal-mid hover:underline">← Back to home</Link>}
          </p>
        </div>
      </main>
      {!appVersion && <Footer />}
    </>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#dde8f0] bg-white p-5 shadow-biomonie-sm sm:p-7">
      <h2 className="mb-3 text-lg font-extrabold text-biomonie-text sm:text-xl">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, htmlFor, children, required = true }: { label: string; htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-biomonie-text">{label}{required && <> <span aria-hidden="true" className="text-red-700">*</span></>}</label>
      {children}
    </div>
  );
}
