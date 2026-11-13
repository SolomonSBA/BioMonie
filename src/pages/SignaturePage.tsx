import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import {
  buildSignatureHtml,
  buildSignatureDocument,
  signaturePlainText,
  TOTAL_WIDTH,
  TOTAL_LEFT_HEIGHT,
  type SignatureValues,
} from '@/lib/signatureBuilder';
import { SITE_ORIGIN, ASSET_BASE_URL } from '@/lib/signatureConfig';
import { setRobotsMeta } from '@/lib/seo';

const initialValues: SignatureValues = {
  name: '',
  title: '',
  email: '',
  phone: '',
  secondPhone: '',
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignaturePage() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [missingImages, setMissingImages] = useState<string[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Preview uses sampleState: true so empty fields show greyed sample text
  // Second phone never shows sample text (appears only when filled)
  const previewHtml = useMemo(
    () =>
      buildSignatureHtml(values, {
        siteOrigin: SITE_ORIGIN,
        assetBaseUrl: ASSET_BASE_URL,
        sampleState: true,
      }),
    [values],
  );

  const emailError = emailTouched && values.email !== '' && !isValidEmail(values.email);

  const isNameValid = values.name.trim().length > 0;
  const isTitleValid = values.title.trim().length > 0;
  const isEmailValid = values.email.trim().length > 0 && isValidEmail(values.email.trim());
  const isPhoneValid = values.phone.trim().length > 0;
  const isSecondPhoneFilled = Boolean(values.secondPhone && values.secondPhone.trim().length > 0);
  const isSecondPhoneValid = !isSecondPhoneFilled || values.secondPhone!.trim().length >= 7;
  const isFormValid =
    isNameValid && isTitleValid && isEmailValid && isPhoneValid && isSecondPhoneValid;

  // Ensure /signature remains noindex everywhere
  useEffect(() => {
    return setRobotsMeta('noindex, nofollow');
  }, []);

  // Responsive scaling observer for the fixed-width signature preview
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth;
      if (availableWidth > 0 && availableWidth < TOTAL_WIDTH) {
        setScale(availableWidth / TOTAL_WIDTH);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateScale)
        : null;
    if (containerRef.current && observer) {
      observer.observe(containerRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateScale);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    setMissingImages([]);
    const images = Array.from(preview.querySelectorAll('img'));
    const updateImage = (image: HTMLImageElement) => {
      const fileName =
        new URL(image.src, window.location.href).pathname.split('/').pop() || image.alt;
      setMissingImages((current) =>
        image.naturalWidth === 0
          ? current.includes(fileName)
            ? current
            : [...current, fileName]
          : current.filter((item) => item !== fileName),
      );
    };
    images.forEach((image) => {
      image.addEventListener('load', () => updateImage(image));
      image.addEventListener('error', () => updateImage(image));
      if (image.complete) updateImage(image);
    });
  }, [previewHtml]);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = 'Email Signature Generator | Biomonie';
    return () => {
      meta.remove();
      document.title = previousTitle;
    };
  }, []);

  const update = (field: keyof SignatureValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (field === 'email') setEmailTouched(true);
    setStatus('');
  };

  const copySignature = async () => {
    if (!isFormValid) {
      setStatus('Please fill in all required fields with valid information.');
      return;
    }
    // Production output: uses the exact same builder configuration as preview (sampleState: false)
    const html = buildSignatureHtml(values, {
      siteOrigin: SITE_ORIGIN,
      assetBaseUrl: ASSET_BASE_URL,
      sampleState: false,
    });
    try {
      if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([signaturePlainText(values)], { type: 'text/plain' }),
          }),
        ]);
      } else {
        // Fallback: copy from off-screen element containing the exact production HTML
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '-9999px';
        tempDiv.innerHTML = html;
        document.body.appendChild(tempDiv);
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy');
        selection?.removeAllRanges();
        document.body.removeChild(tempDiv);
      }
      setStatus('Copied');
    } catch {
      setStatus('Could not copy automatically. Please use the Download button.');
    }
  };

  const downloadSignature = () => {
    if (!isFormValid) {
      setStatus('Please fill in all required fields with valid information.');
      return;
    }
    // Download gets a full document with telephone=no; copy stays a fragment.
    const html = buildSignatureDocument(values, {
      siteOrigin: SITE_ORIGIN,
      assetBaseUrl: ASSET_BASE_URL,
      sampleState: false,
    });
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `biomonie-signature-${values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'signature'}.html`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    setStatus('Downloaded');
  };

  return (
    <main className="min-h-screen bg-biomonie-bg-warm py-12 px-4 sm:px-6 lg:px-8 text-biomonie-text">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-biomonie-teal">
            Internal Tool
          </p>
          <h1 className="mt-2 font-serif text-3xl font-extrabold sm:text-4xl">
            Biomonie Email Signature Generator
          </h1>
          <p className="mt-3 text-sm text-biomonie-muted">
            Enter your details below to generate your official Biomonie email signature.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <section
            className="rounded-2xl border border-[#dde8f0] bg-white p-6 shadow-biomonie-sm sm:p-8"
            aria-labelledby="form-heading"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="form-heading" className="font-serif text-2xl font-bold">
                Your details
              </h2>
            </div>
            <p className="mt-1 text-sm text-biomonie-muted">
              Name, job title, email and primary phone are required. Second phone is optional.
            </p>

            {/* Quick Preview Presets for the 4 Cases */}
            <div className="mt-4 rounded-xl border border-[#e2edf3] bg-[#f8fbfa] p-3.5">
              <p className="text-xs font-bold uppercase tracking-wider text-biomonie-teal mb-2">
                Preview Presets:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setValues({
                      name: 'Miracle Amos',
                      title: 'UX Designer',
                      email: 'miracle@biomonie.com',
                      phone: '+234 (0) 807 739 4817',
                      secondPhone: '',
                    })
                  }
                  className="rounded-lg border border-[#c9dbe3] bg-white px-2.5 py-2 text-xs font-semibold text-biomonie-text transition hover:border-biomonie-teal hover:bg-biomonie-pale text-left"
                >
                  Short Name (1 phone)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setValues({
                      name: 'Solomon Chukwuka Emmanuel',
                      title: 'Senior Software Engineer',
                      email: 'solomon@biomonie.com',
                      phone: '+234 (0) 801 234 5678',
                      secondPhone: '',
                    })
                  }
                  className="rounded-lg border border-[#c9dbe3] bg-white px-2.5 py-2 text-xs font-semibold text-biomonie-text transition hover:border-biomonie-teal hover:bg-biomonie-pale text-left"
                >
                  Long Name (1 phone)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setValues({
                      name: 'Miracle Amos',
                      title: 'UX Designer',
                      email: 'miracle@biomonie.com',
                      phone: '+234 (0) 807 739 4817',
                      secondPhone: '+234 (0) 802 345 6789',
                    })
                  }
                  className="rounded-lg border border-[#c9dbe3] bg-white px-2.5 py-2 text-xs font-semibold text-biomonie-text transition hover:border-biomonie-teal hover:bg-biomonie-pale text-left"
                >
                  Short Name (2 phones)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setValues({
                      name: 'Solomon Chukwuka Emmanuel',
                      title: 'Senior Software Engineer',
                      email: 'solomon@biomonie.com',
                      phone: '+234 (0) 801 234 5678',
                      secondPhone: '+234 (0) 809 876 5432',
                    })
                  }
                  className="rounded-lg border border-[#c9dbe3] bg-white px-2.5 py-2 text-xs font-semibold text-biomonie-text transition hover:border-biomonie-teal hover:bg-biomonie-pale text-left"
                >
                  Long Name (2 phones)
                </button>
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="sig-name" className="block text-xs font-bold uppercase tracking-wider text-biomonie-text">
                  Full name *
                </label>
                <input
                  id="sig-name"
                  type="text"
                  value={values.name}
                  onChange={update('name')}
                  placeholder="e.g. Miracle Amos"
                  required
                  className="mt-1 w-full rounded-lg border border-[#c9dbe3] px-3.5 py-2.5 text-sm outline-none transition focus:border-biomonie-teal focus:ring-2 focus:ring-biomonie-teal/20"
                />
              </div>

              <div>
                <label htmlFor="sig-title" className="block text-xs font-bold uppercase tracking-wider text-biomonie-text">
                  Job title *
                </label>
                <input
                  id="sig-title"
                  type="text"
                  value={values.title}
                  onChange={update('title')}
                  placeholder="e.g. Lead Product Designer"
                  required
                  className="mt-1 w-full rounded-lg border border-[#c9dbe3] px-3.5 py-2.5 text-sm outline-none transition focus:border-biomonie-teal focus:ring-2 focus:ring-biomonie-teal/20"
                />
              </div>

              <div>
                <label htmlFor="sig-email" className="block text-xs font-bold uppercase tracking-wider text-biomonie-text">
                  Email address *
                </label>
                <input
                  id="sig-email"
                  type="email"
                  value={values.email}
                  onChange={update('email')}
                  placeholder="e.g. miracle.amos@biomonie.com"
                  required
                  className={`mt-1 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    emailError
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-[#c9dbe3] focus:border-biomonie-teal focus:ring-biomonie-teal/20'
                  }`}
                />
                {emailError && (
                  <p className="mt-1 text-xs text-red-600">Please enter a valid email address.</p>
                )}
              </div>

              <div>
                <label htmlFor="sig-phone" className="block text-xs font-bold uppercase tracking-wider text-biomonie-text">
                  Phone number *
                </label>
                <input
                  id="sig-phone"
                  type="tel"
                  value={values.phone}
                  onChange={update('phone')}
                  placeholder="e.g. +234 (0) 807 739 4817"
                  required
                  className="mt-1 w-full rounded-lg border border-[#c9dbe3] px-3.5 py-2.5 text-sm outline-none transition focus:border-biomonie-teal focus:ring-2 focus:ring-biomonie-teal/20"
                />
              </div>

              <div>
                <label htmlFor="sig-second-phone" className="block text-xs font-bold uppercase tracking-wider text-biomonie-text">
                  Second phone number (optional)
                </label>
                <input
                  id="sig-second-phone"
                  type="tel"
                  value={values.secondPhone || ''}
                  onChange={update('secondPhone')}
                  placeholder="e.g. +234 (0) 802 345 6789"
                  className="mt-1 w-full rounded-lg border border-[#c9dbe3] px-3.5 py-2.5 text-sm outline-none transition focus:border-biomonie-teal focus:ring-2 focus:ring-biomonie-teal/20"
                />
              </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copySignature}
                disabled={!isFormValid}
                className="rounded-lg bg-biomonie-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-biomonie-teal-mid disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy signature
              </button>
              <button
                type="button"
                onClick={downloadSignature}
                disabled={!isFormValid}
                className="rounded-lg border border-biomonie-teal px-5 py-3 text-sm font-bold text-biomonie-teal transition hover:bg-biomonie-pale disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download .html
              </button>
            </div>
            {!isFormValid && (
              <p className="mt-3 text-xs text-biomonie-muted">
                Please complete all required fields to copy or download your signature.
              </p>
            )}
            <p
              className={`mt-4 min-h-6 text-sm font-semibold ${
                status === 'Copied' ? 'text-green-700' : 'text-red-700'
              }`}
              aria-live="polite"
            >
              {status}
            </p>
          </section>

          <section
            className="min-w-0 rounded-2xl border border-[#dde8f0] bg-white p-6 shadow-biomonie-sm sm:p-8"
            aria-labelledby="preview-heading"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="preview-heading" className="font-serif text-2xl font-bold">
                Live preview
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-biomonie-muted">
                {TOTAL_WIDTH}px email layout
              </span>
            </div>
            <p className="mt-2 text-sm text-biomonie-muted">
              Empty fields show grey sample text in preview. Second phone appears only when filled.
            </p>
            {missingImages.length > 0 && (
              <p
                role="alert"
                className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900"
              >
                Missing images: {missingImages.join(', ')}
              </p>
            )}

            {/* Container that scales the fixed-width signature down on narrow viewports */}
            <div className="mt-6 rounded-lg border border-[#d6e3e9] bg-white p-3 sm:p-5">
              <div ref={containerRef} className="w-full overflow-hidden">
                <div
                  style={{
                    height: `${TOTAL_LEFT_HEIGHT * scale}px`,
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                      width: `${TOTAL_WIDTH}px`,
                    }}
                  >
                    <div ref={previewRef} dangerouslySetInnerHTML={{ __html: previewHtml }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
