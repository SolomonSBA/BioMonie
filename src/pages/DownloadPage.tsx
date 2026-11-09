import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreBadges from '@/components/home/StoreBadges';
import LanguageTaglines from '@/components/LanguageTaglines';
import { slides } from '@/data/heroSlides';
import { QRCodeSVG } from 'qrcode.react';
import {
  GOOGLE_PLAY_STORE_URL,
  APP_STORE_URL,
  QR_DOWNLOAD_URL,
  DEFAULT_UTM_PARAMS,
  detectPlatform,
  buildStoreUrl,
  isAppStorePlaceholder,
  type DevicePlatform,
} from '@/lib/storeLinks';

export default function DownloadPage() {
  const [searchParams] = useSearchParams();
  const [redirectingPlatform, setRedirectingPlatform] = useState<DevicePlatform | null>(null);
  const [iosPlaceholderActive, setIosPlaceholderActive] = useState(false);

  // Background hero slide photo: use 'hard' slide photo & objectPosition
  const hardSlide = useMemo(
    () => slides.find((s) => s.id === 'hard') || slides[0],
    [],
  );

  // Collect and merge incoming utm_* query parameters with the signature banner defaults
  const utmParams = useMemo(() => {
    const params: Record<string, string> = { ...DEFAULT_UTM_PARAMS };
    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_')) {
        params[key] = value;
      }
    });
    return params;
  }, [searchParams]);

  const googlePlayUrl = useMemo(
    () => buildStoreUrl(GOOGLE_PLAY_STORE_URL, utmParams, true),
    [utmParams],
  );

  const appStoreUrl = useMemo(
    () => buildStoreUrl(APP_STORE_URL, utmParams, false),
    [utmParams],
  );

  const isApplePlaceholder = isAppStorePlaceholder(APP_STORE_URL);

  // Device detection and mobile redirect logic
  useEffect(() => {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const platform = detectPlatform(userAgent);

    if (platform === 'ios') {
      if (isApplePlaceholder) {
        // If APP_STORE_URL is still placeholder (https://apps.apple.com),
        // iPhone/iPad visitors must NOT redirect to Apple's generic homepage.
        // They stay on /download and see "The iPhone app is coming soon."
        setIosPlaceholderActive(true);
        return;
      }

      // Real iOS URL present: automatic redirect
      setRedirectingPlatform('ios');
      try {
        window.location.replace(appStoreUrl);
      } catch {
        window.location.href = appStoreUrl;
      }
    } else if (platform === 'android') {
      setRedirectingPlatform('android');
      try {
        window.location.replace(googlePlayUrl);
      } catch {
        window.location.href = googlePlayUrl;
      }
    }
  }, [appStoreUrl, googlePlayUrl, isApplePlaceholder]);

  // Page title and meta description
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Download the Biomonie app';

    let metaDesc = document.querySelector('meta[name="description"]');
    const created = !metaDesc;
    const prevDesc = metaDesc?.getAttribute('content') || '';

    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Download the Biomonie app for iPhone and Android. Flex, pay, or spend and earn with the first-ever global biometric cardless payment ecosystem.',
    );

    return () => {
      document.title = prevTitle;
      if (created && metaDesc) {
        metaDesc.remove();
      } else if (metaDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-biomonie-teal-dark">
        <section
          className="relative isolate min-h-[92svh] w-full overflow-hidden bg-biomonie-teal-dark font-sans"
          aria-label="Download the Biomonie app"
        >
          {/* Background photo: hard slide */}
          <div className="absolute inset-0 -z-10">
            <img
              src={hardSlide.image}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: hardSlide.objectPosition ?? '68% 25%' }}
            />
          </div>

          {/* Dark gradient overlays matching HeroSection */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,22,28,0.88)_0%,rgba(10,22,28,0.62)_45%,rgba(10,22,28,0.2)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(180deg,rgba(10,22,28,0.7),transparent)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(0deg,rgba(10,22,28,0.75),transparent)]" />

          {/* Hero content container */}
          <div className="relative mx-auto w-full max-w-[1280px] px-[5%] pb-24 pt-[140px] sm:pt-[160px] xl:px-[4%]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              {/* Left / Main text content */}
              <div className="max-w-2xl">
                {redirectingPlatform ? (
                  /* Mobile redirecting state (active store URL) */
                  <div aria-live="polite" className="text-center md:text-left">
                    <p className="mb-5 max-w-[30ch] font-sans text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold leading-snug text-biomonie-lemon mx-auto md:mx-0">
                      THE FIRST-EVER GLOBAL BIOMETRIC CARDLESS PAYMENT ECOSYSTEM
                    </p>

                    <h1 className="mb-5 font-sans text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                      Taking you to the{' '}
                      <em className="not-italic text-biomonie-lemon">
                        {redirectingPlatform === 'ios' ? 'App Store' : 'Google Play'}
                      </em>
                      ...
                    </h1>

                    <p className="mb-8 max-w-[44ch] text-[clamp(0.98rem,1.4vw,1.15rem)] leading-relaxed text-white/90 mx-auto md:mx-0">
                      Please wait while we open the store. If redirect didn&apos;t happen, tap below:
                    </p>

                    <div className="flex justify-center md:justify-start">
                      <StoreBadges
                        googlePlayUrl={googlePlayUrl}
                        appStoreUrl={appStoreUrl}
                        target="_self"
                        className="justify-center md:justify-start"
                      />
                    </div>

                    <div className="mt-8">
                      <LanguageTaglines className="shrink-0" />
                    </div>
                  </div>
                ) : iosPlaceholderActive ? (
                  /* iOS visitor when App Store URL is still placeholder */
                  <div aria-live="polite" className="text-center md:text-left">
                    <p className="mb-5 max-w-[30ch] font-sans text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold leading-snug text-biomonie-lemon mx-auto md:mx-0">
                      THE FIRST-EVER GLOBAL BIOMETRIC CARDLESS PAYMENT ECOSYSTEM
                    </p>

                    <h1 className="mb-5 font-sans text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                      The iPhone app is{' '}
                      <em className="not-italic text-biomonie-lemon">coming soon</em>.
                    </h1>

                    <p className="mb-8 max-w-[44ch] text-[clamp(0.98rem,1.4vw,1.15rem)] leading-relaxed text-white/90 mx-auto md:mx-0">
                      We are putting the final touches on our iOS app. Google Play is available now.
                    </p>

                    <div className="flex justify-center md:justify-start">
                      <StoreBadges
                        googlePlayUrl={googlePlayUrl}
                        appStoreUrl={appStoreUrl}
                        appStoreDisabled={true}
                        target="_self"
                        className="justify-center md:justify-start"
                      />
                    </div>

                    <div className="mt-8">
                      <LanguageTaglines className="shrink-0" />
                    </div>
                  </div>
                ) : (
                  /* Desktop / direct view state */
                  <div>
                    <p className="mb-5 max-w-[30ch] font-sans text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold leading-snug text-biomonie-lemon text-center md:text-left mx-auto md:mx-0">
                      THE FIRST-EVER GLOBAL BIOMETRIC CARDLESS PAYMENT ECOSYSTEM
                    </p>

                    <h1 className="mb-5 max-w-[13ch] font-sans text-[clamp(2.5rem,6.4vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white text-center md:text-left mx-auto md:mx-0">
                      Get the <em className="not-italic text-biomonie-lemon">Biomonie</em> app.
                    </h1>

                    <p className="mb-8 max-w-[44ch] text-[clamp(0.98rem,1.4vw,1.15rem)] leading-relaxed text-white/90 text-center md:text-left mx-auto md:mx-0">
                      Flex, pay or spend and earn. Available on iPhone and Android.
                    </p>

                    <div className="flex justify-center md:justify-start">
                      <StoreBadges
                        googlePlayUrl={googlePlayUrl}
                        appStoreUrl={appStoreUrl}
                        appStoreDisabled={isApplePlaceholder}
                        target="_self"
                        className="justify-center md:justify-start"
                      />
                    </div>

                    <div className="mt-8">
                      <LanguageTaglines className="shrink-0" />
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop QR Code: hidden on mobile */}
              {!redirectingPlatform && !iosPlaceholderActive && (
                <div className="hidden lg:flex flex-col items-center gap-3 shrink-0 self-center">
                  <div className="rounded-2xl bg-white p-4 shadow-2xl">
                    <QRCodeSVG
                      value={QR_DOWNLOAD_URL}
                      size={160}
                      level="M"
                      aria-label="QR code to download Biomonie app"
                    />
                  </div>
                  <p className="font-sans text-xs font-semibold tracking-wider text-white/80 uppercase">
                    Scan with your phone
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
