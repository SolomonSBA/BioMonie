import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { slides } from '@/data/heroSlides';
import StoreBadges from '@/components/home/StoreBadges';
import LanguageTaglines from '@/components/LanguageTaglines';
import { setRobotsMeta } from '@/lib/seo';

/**
 * ============================================================================
 * BANNER OVERLAY CONSTANTS (BANNER CANVAS ONLY - DOES NOT AFFECT WEBSITE HERO)
 * Tune opacities and gradient heights here without hunting through the JSX.
 * ============================================================================
 */

/** Left-to-right gradient: ensures text contrast on left while letting photo colors show on right */
export const OVERLAY_LEFT = {
  start: 0.50, // rgba(10,22,28, 0.50) at 0%
  mid: 0.28,   // rgba(10,22,28, 0.28) at 45%
  end: 0.0,    // transparent at 100%
};

/** Top gradient: subtle vignette along the top edge */
export const OVERLAY_TOP = {
  height: 90,    // px
  opacity: 0.30, // rgba(10,22,28, 0.30) at top edge
};

/** Bottom gradient: covers store badges and taglines for clean legibility */
export const OVERLAY_BOTTOM = {
  height: 130,   // px
  opacity: 0.55, // rgba(10,22,28, 0.55) at bottom edge
};

/**
 * Per-slide overlay overrides.
 * If a slide's text falls on a particularly bright photo background,
 * override its specific overlay here instead of darkening all slides.
 */
export const SLIDE_OVERLAY_OVERRIDES: Record<
  string,
  {
    left?: Partial<typeof OVERLAY_LEFT>;
    top?: Partial<typeof OVERLAY_TOP>;
    bottom?: Partial<typeof OVERLAY_BOTTOM>;
  }
> = {
  // If any slide needs a slightly stronger left overlay, tune here:
  // e.g. 'access': { left: { start: 0.55, mid: 0.30 } }
};

/**
 * Soft text shadows to preserve crisp legibility over lighter photo backgrounds
 * without hard outlines.
 */
export const BANNER_TEXT_SHADOW = {
  eyebrow: '0 2px 8px rgba(0, 0, 0, 0.55)',
  headline: '0 2px 12px rgba(0, 0, 0, 0.50), 0 1px 3px rgba(0, 0, 0, 0.40)',
  sub: '0 2px 8px rgba(0, 0, 0, 0.50)',
};

export default function BannerRenderPage() {
  const [searchParams] = useSearchParams();
  const slideId = searchParams.get('slide') || 'hard';

  const slide = useMemo(
    () => slides.find((s) => s.id === slideId) || slides[0],
    [slideId],
  );

  const [fontReady, setFontReady] = useState(false);
  const [imgReady, setImgReady] = useState(false);

  useEffect(() => {
    const cleanupRobots = setRobotsMeta('noindex, nofollow');
    document.title = `Banner Render: ${slide.id}`;

    document.fonts.ready.then(() => setFontReady(true));

    return () => {
      cleanupRobots();
    };
  }, [slide.id]);

  const isReady = fontReady && imgReady;

  // Resolve overlay settings for this slide (default + any per-slide overrides)
  const overrides = SLIDE_OVERLAY_OVERRIDES[slide.id] || {};
  const leftOverlay = { ...OVERLAY_LEFT, ...(overrides.left || {}) };
  const topOverlay = { ...OVERLAY_TOP, ...(overrides.top || {}) };
  const bottomOverlay = { ...OVERLAY_BOTTOM, ...(overrides.bottom || {}) };

  const leftGradient = `linear-gradient(90deg, rgba(10,22,28,${leftOverlay.start}) 0%, rgba(10,22,28,${leftOverlay.mid}) 45%, rgba(10,22,28,${leftOverlay.end}) 100%)`;
  const topGradient = `linear-gradient(180deg, rgba(10,22,28,${topOverlay.opacity}) 0%, transparent 100%)`;
  const bottomGradient = `linear-gradient(0deg, rgba(10,22,28,${bottomOverlay.opacity}) 0%, rgba(10,22,28,${(bottomOverlay.opacity * 0.65).toFixed(2)}) 45%, transparent 100%)`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070e12] p-4">
      {/* Fixed 630x570 canvas */}
      <div
        id="banner-canvas"
        data-ready={isReady ? 'true' : undefined}
        className="relative isolate h-[570px] w-[630px] overflow-hidden bg-biomonie-teal-dark font-sans"
        style={{ width: '630px', height: '570px' }}
      >
        {/* Background photo */}
        <img
          src={slide.image}
          alt=""
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) {
              setImgReady(true);
            }
          }}
          onLoad={() => setImgReady(true)}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: slide.objectPosition ?? '65% 20%' }}
        />

        {/* Lighter readability gradients (banner canvas only) */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: leftGradient }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10"
          style={{ height: `${topOverlay.height}px`, background: topGradient }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
          style={{ height: `${bottomOverlay.height}px`, background: bottomGradient }}
        />

        {/* Content layout: 3 balanced vertical sections */}
        <div className="flex h-full flex-col justify-between px-[36px] pt-[30px] pb-[26px]">
          {/* Top: Eyebrow */}
          <div className="shrink-0">
            <p
              id="banner-eyebrow"
              style={{ textShadow: BANNER_TEXT_SHADOW.eyebrow }}
              className="max-w-[480px] font-sans text-[17px] font-extrabold uppercase leading-[1.25] tracking-[0.04em] text-biomonie-lemon"
            >
              THE FIRST-EVER GLOBAL BIOMETRIC CARDLESS PAYMENT ECOSYSTEM
            </p>
          </div>

          {/* Middle-to-lower text block: headline + sub with soft text shadow */}
          <div id="banner-text-block" className="my-auto pt-6 pb-2">
            <h1
              id="banner-headline"
              style={{ textShadow: BANNER_TEXT_SHADOW.headline }}
              className="mb-3.5 max-w-[410px] font-sans text-[52px] font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
            >
              {slide.headline}
            </h1>

            <p
              id="banner-sub"
              style={{ textShadow: BANNER_TEXT_SHADOW.sub }}
              className="max-w-[390px] font-sans text-[22px] font-medium leading-[1.3] text-white/90"
            >
              {slide.sub}
            </p>
          </div>

          {/* Bottom brand elements: centered on canvas center line */}
          <div id="banner-bottom" className="shrink-0 flex flex-col gap-[14px] w-full">
            <div id="banner-badges" className="flex justify-center w-full">
              <StoreBadges className="justify-center" />
            </div>
            <div id="banner-taglines" className="w-full">
              <LanguageTaglines staticAll align="center" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
