# Biomonie web

## Email signature

The internal generator is available at `/signature`. It is intentionally not linked from the main navigation and has no authentication in the current app. If this must be staff-only, protect the route at the hosting layer with a shared password or an allowlist for `@biomonie.com` accounts before publishing it.

The email template is built by `src/lib/signatureBuilder.ts` from the image/social URL configuration in `src/lib/signatureConfig.ts`.

### Architecture & Layout Parity

The signature is generated from a single `SIGNATURE_SCALE` constant in `src/lib/signatureConfig.ts` (currently **1.25**). Every dimension is `Math.round(base × scale)` and every font is `Math.max(9, Math.floor(base × scale))`, so Word/Outlook always get whole pixels and nothing drops below 9px. The base design is 600×285px; at 1.25 the result is **750×356px**:

- **Total width**: 750px (left 356px + banner 394px). The left column and banner are always the same height (`356px`).
- **Left Column (356px wide, exactly 356px total height)**:
  - **Navy block (256px total height, `#1B3A50`)**: 8px top/bottom and 15px left/right padding, leaving a 326×240px inner table. Contains:
    - Yellow brand mark (88×123) vertically centred across the navy block (`rowspan="3"`, `valign="middle"`) with a 10px gap to the text column (98px logo column).
    - A three-row text column (228px wide): the **name row (40px)** is a fixed two-line cell with `valign="bottom"`, so a one-line name sits directly above the title and a two-line name fills the box. Name font: 16px default, 15px mid, 13px small for long names, 20px line height. The **title row (38px)** reserves two 15px lines plus the 8px title→contact gap (12px Arial). The **bottom row (162px, top-anchored)** stacks everything from the top, so spare height sits below the last row.
    - Bottom-row order: email, phone, optional second phone (8px between contact rows, 18px line height), 10px, the company name block, 8px, then the website row (`www.biomonie.com`) as the final row, then 13px bottom padding.
    - Optional second phone number: rendered only when provided; zero extra rows or spacing when blank.
    - Company name: exactly two uppercase lines (`BIOMONIE TECHNOLOGIES` then `LIMITED`), each its own `white-space:nowrap` div, left-aligned to the text column edge (`COMPANY_ALIGN = 'left'`), bold 11px white Arial with `letter-spacing:0` and 15px line height.
    - Contact/email/website text is 11px, 10px for the email row, with the auto-shrink rule (≤26 chars full size, ≤32 one tier down, longer two tiers down) clamped at 9px. The email row also carries `letter-spacing:-0.4px`.
    - Total height is strictly preserved at 356px across all four permutations (short/long name × 1/2 phones).
  - **Grey block (100px total height, `#D9D9D9`)**: 80px content with 10px padding (`GREY_HEIGHT = 100`). Contains:
    - Wordmark (88×39) vertically centred.
    - Six social icons in one row with a 5px gap (23px tiles).
    - Exactly three non-breaking text link lines (`Facebook.com/biomonie | X.com/biomonie`, `Instagram.com/biomonie | Youtube.com/biomonie`, `Linkedin.com/biomonie`) formatted at 10px Arial (`line-height: 14px`) with zero clipping.
  - **Total Left Column Height**: 256px + 100px = exactly 356px (`TOTAL_LEFT_HEIGHT = 356`).
- **Right Column (394px wide, `#14262F`)**:
  - One single banner image (`banner.gif`, displayed at 394×356px; the asset is rendered at 591×534 = 1.5×) that covers the entire right column.
  - Slide photography, hero headline/sub with brand highlight tokens (`biomonie-lemon`), Google Play and App Store badges (`StoreBadges`), and the 4 language taglines ("Finger Na Money!", "Tẹ̀ka Gbowó.", "Yatsan Kuɗi.", "Ákà Ègò.") are all baked inside the banner canvas.
  - Linked directly to `BANNER_LINK_URL` (`${SITE_ORIGIN}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`).
  - Frame 1 is the approved Figma design (`'hard'`: "YOU work hard for your money..."), which serves as the static fallback for Outlook desktop (which only displays the first frame of GIFs).

### App Store Links & `/download` Landing Page

All app store links live in **one single place**: `src/lib/storeLinks.ts`.

1. **Where to update the store URLs**:
   In `src/lib/storeLinks.ts`:
   - `GOOGLE_PLAY_STORE_URL`: Currently set to `https://play.google.com/store/apps/details?id=com.biomonie.purse`.
   - `APP_STORE_URL`: Currently set to placeholder `https://apps.apple.com`. Replace this with the official production iOS App Store URL once available (e.g. `https://apps.apple.com/app/biomonie/idXXXXXXXXXX`).
2. **How `/download` behaves**:
   - Detects the visitor's device platform from the user agent:
     - **iPhone, iPad, iPod**:
       - When `APP_STORE_URL` is the placeholder (`https://apps.apple.com`), visitors are **not** redirected to Apple's generic homepage. They stay on `/download` and see *"The iPhone app is coming soon."* with Google Play active and the App Store badge disabled.
       - When a real App Store URL is set, visitors are immediately redirected via `window.location.replace` to the App Store with campaign tracking tags.
     - **Android**: Immediately redirects via `window.location.replace` to Google Play with UTM tracking in the `referrer` parameter.
     - **Desktop / Other**: Stays on `/download` and displays a clean branded page with direct badges for both Google Play and App Store, plus a scannable QR code pointing to `/download`.
   - Preserves and passes through all incoming `utm_*` query parameters, ensuring attribution is retained from marketing campaigns.
   - Provides accessible fallback buttons in case automatic redirects are blocked by a mobile browser.
3. **Banner Link Target**:
   - `BANNER_LINK_URL` in `src/lib/signatureConfig.ts` is dynamically derived from `SITE_ORIGIN` (`${SITE_ORIGIN}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`) so banner clicks route through device detection and campaign attribution.

### Banner Rendering & Build Automation

1. **Standalone Canvas Route**:
   - `/banner-render?slide=<id>` renders a fixed 630×570px canvas.
   - Reuses hero slides from `src/data/heroSlides.tsx`, real Tailwind tokens (`biomonie-lemon`), `StoreBadges`, and static `LanguageTaglines`.
   - Signals `data-ready="true"` only after web fonts and slide imagery have fully loaded.
2. **Build Banner GIF**:
   - Run `npm run build:banner` to screenshot the configured slides (`BANNER_SLIDE_IDS`) in headless Chromium via Playwright and assemble `public/email/v4/banner.gif` (396.4 KB, 591×534, 4 slides, 3s–3.5s per slide, infinite loop) and `public/email/v4/banner.png` (static first frame, palette-optimised).
   - The GIF is rendered from the 630×570 canvas with `deviceScaleFactor = 788 / 630` so text is painted at 2×, then optimised down this ladder while reporting the size at each step: **2× (788×712) → 1.5× (591×534) → 4 frames → 3 frames → 128 → 96 colours**. It targets **under 500 KB** and fails rather than writing an oversized GIF. At 1.25 the 2× render is 632.4 KB, so the ladder stops at step 2: 1.5×, 4 frames, 128 colours, no slides dropped.
   - Run `npm run build:email-assets` to copy every unchanged v3 icon/logo into `public/email/v4/` and mirror it to `server/public/email/v4/`, then `npm run build:banner` to write the new banner. Run `npm run check:icons` to render `scratch/icon-contact-sheet.png` and inspect every image at 2× on `#1B3A50`, `#3E5A74`, `#D9D9D9` and `#262626`.
   - Source sharpness at the 1.25 display sizes: logo mark 168×236 for 88×123 (1.92×), wordmark 184×80 for 88×39 (2.09×), contact icons 32×32 for 18×18 (1.78×), social tiles 36×36 for 23×23 (1.57×). All are ≥1.5×, so no Figma re-export is needed.
   - If Playwright browsers are not yet downloaded on a new machine:
     ```bash
     npx playwright install chromium
     ```

### Scripts & Exchange Mail Flow Rule Templates

The repo generates four production-ready Exchange templates from the shared signature builder (`src/lib/signatureBuilder.ts` via `scripts/build-exchange.js`). All four are kept strictly under 4,900 characters (well below Microsoft 365's 5,000-character disclaimer limit: `scripts/build-exchange.js` fails the build at 4,900) and use pure inline CSS with Arial sans-serif typography:

| Template File | Target Environment | Phone Field(s) | Character Count |
|---|---|---|---|
| `docs/exchange-signature.html` | Production (`biomonie.com`) | 1 Phone (`%%MobileNumber%%`) | **4,361** chars |
| `docs/exchange-signature.two-phones.html` | Production (`biomonie.com`) | 2 Phones (`%%MobileNumber%%`, `%%PhoneNumber%%`) | **4,747** chars |
| `docs/exchange-signature.staging.html` | Staging (`biomonie1.onrender.com`) | 1 Phone (`%%MobileNumber%%`) | **4,381** chars |
| `docs/exchange-signature.two-phones.staging.html` | Staging (`biomonie1.onrender.com`) | 2 Phones (`%%MobileNumber%%`, `%%PhoneNumber%%`) | **4,767** chars |

The Exchange templates share the web layout at 1.25×: 750px total (356px left + 394px banner), 88×123 logo mark with a 10px gap, a three-row text column, the name in a fixed two-line `valign="bottom"` cell, 8px contact spacing, the company name (`BIOMONIE TECHNOLOGIES` / `LIMITED`, bold 11px) **above** the final website row, and every navy anchor (including `tel:` phones) forced to `color:#FFFFFF;text-decoration:none`. Vertical gaps are explicit Word-safe spacer rows (`mso-line-height-rule:exactly`), every `td` has an explicit width, and every image carries `width`/`height`, `border="0"`, `display:block` and a short `alt`. Every text-bearing element repeats its own font, line-height and colour instead of inheriting from the outer table, so bare-fragment and Word rendering stay black-on-white-proof. The left column and banner are both `valign="top"` and exactly 356px tall; vertical padding lives on cells without a `height` attribute so quirks and standards mode agree. Navy, grey and banner cells use `bgcolor` plus inline `background-color` only — there are no `background` attributes, `background-image` rules or `bg-*.png` tiles.

Responsive stacking is intentionally **not** added to the Exchange files. The two-phone templates only have 153 and 133 characters of headroom under the 4,900 limit; even a minimal `@media` block plus the three class attributes needed to scope it is ~136 characters and the ~300-character block asked for is ~164, so it cannot fit in all four files. The fixed-width tables keep rendering correctly because Exchange never strips the inline widths. The email placeholder is the single constant `EXCHANGE_EMAIL_VAR` in `signatureBuilder.ts` (`%%UserLogonName%%` by default; switch to `%%Email%%` if IT confirms it). Set `VITE_ASSET_BASE_URL` when building to point every image at a CDN; banner and website links stay on `VITE_SITE_ORIGIN`.

Helper commands:

```bash
npm run count:exchange    # print all four counts, fail above 4,900
npm run preview:exchange  # write local previews + long-sample stress previews to docs/preview/
npm run check:exchange    # Playwright: quirks/standards heights, white navy text, overflow
```

`docs/preview/` is gitignored. See `docs/EXCHANGE-SETUP.md` for the CTO handover (rule settings, variables, testing, limits).


#### Which Template to Use & Microsoft 365 Targeting:
1. **Single-Phone Staff (`exchange-signature.html`)**:
   - Use for users/mailboxes that only have a single mobile number or telephone entry in Microsoft 365 (`%%MobileNumber%%`).
   - If a user has no second phone in Microsoft Entra ID / Exchange directory, this template avoids displaying an empty or duplicate phone line.
2. **Dual-Phone Staff (`exchange-signature.two-phones.html`)**:
   - Use for leadership, executive, or customer-facing staff who have both a mobile number (`%%MobileNumber%%`) and a business phone/desk line (`%%PhoneNumber%%`) populated in Microsoft 365.
3. **Microsoft 365 Exchange Online Transport Rule Setup**:
   - In the **Exchange Admin Center** (`admin.exchange.microsoft.com`):
     - Navigate to **Mail flow** > **Rules**.
     - **Rule 1 (Dual-phone staff)**:
       - Priority: `0` (runs first).
       - *Apply this rule if...* The sender is a member of the distribution/security group `Dual-Phone Staff` (or sender property `Phone number is not empty`).
       - *Do the following...* "Apply a disclaimer to the message" > "Append the disclaimer". Fallback: "Wrap".
       - Paste the contents of `docs/exchange-signature.two-phones.html`.
       - Check "Stop processing more rules".
     - **Rule 2 (Default / Single-phone staff)**:
       - Priority: `1`.
       - *Apply this rule if...* The sender is external/internal or in organization `Biomonie`.
       - *Do the following...* "Append the disclaimer". Fallback: "Wrap".
       - Paste the contents of `docs/exchange-signature.html`.
4. **Rebuilding Exchange Templates**:
   - Production templates (1-phone & 2-phone):
     ```bash
     npm run build:exchange
     ```
   - Staging templates (1-phone & 2-phone):
     ```bash
     npm run build:exchange:staging
     ```

## Staging vs production

### Origin Configuration & `VITE_SITE_ORIGIN`
- Defined in `src/lib/storeLinks.ts` as `SITE_ORIGIN`.
- Automatically strips any trailing slash.
- Defaults to production: `https://biomonie.com`.
- **Render Dashboard**: Set `VITE_SITE_ORIGIN=https://biomonie1.onrender.com` in your Render Environment settings. Do not commit a `.env` file with the staging origin to Git.
- **Staging Safety**:
  - When `VITE_SITE_ORIGIN` contains `onrender.com`:
    - `<meta name="robots" content="noindex, nofollow">` is injected site-wide.
    - A visible `STAGING` badge appears next to the copyright notice in the site footer (`Footer.tsx`).
  - `/signature` and `/banner-render` are always set to `noindex, nofollow` on both staging and production.

### Asset versioning (`ASSET_VERSION`), Configuration & `VITE_ASSET_BASE_URL`
- Every signature image URL is `${ASSET_BASE_URL}/${ASSET_VERSION}/<file>` (`ASSET_VERSION = 'v4'` today). All v4 images live in `public/email/v4/`; legacy files directly under `public/email/` and `public/email/v2`/`v3` are never modified so previously delivered signatures keep working.
- v4 is the 1.25× asset set: `banner.gif`/`banner.png` are rebuilt at the new display size, while every icon, social tile and logo is a **byte-for-byte copy** of the approved v3 master (the sources are already ≥1.5× the new display size).
- The small images (logos, contact icons, social icons) are **transparent 32-bit RGBA PNGs** (colour type 6, no palette, alpha preserved) with **no baked background plates**. Outlook dark mode recolours cell backgrounds but not image pixels, so a plate would show as a coloured box; transparency avoids that. The wordmark also carries a thin light outline so its dark letters stay legible on dark grey. The X and TikTok icons are black rounded squares with white glyphs, transparent outside the shape. Palette quantisation is limited to `banner.png`/`banner.gif`.
- Backgrounds are painted with `bgcolor` and inline `background-color` only on the navy, grey and banner cells. Tiles (`bg-navy.png`, `bg-grey.png`, `bg-banner.png`) no longer exist.
- `VITE_ASSET_BASE_URL` is optional. Defined in `src/lib/signatureConfig.ts` as `ASSET_BASE_URL`.
- When set (e.g. `VITE_ASSET_BASE_URL=https://cdn.biomonie.com/email`), **every image URL** in the web signature and the four Exchange templates uses it (plus `/v4`). Banner and website links still use `VITE_SITE_ORIGIN`.
- When unset, it defaults to `<VITE_SITE_ORIGIN>/email`, then `/v4` is appended.
- Trailing slashes are stripped. Also read from `process.env` so `npm run build:exchange` picks it up in Node.
- The staging Exchange build sets `VITE_ASSET_BASE_URL=https://biomonie.com/email` (production images) so the two-phone staging template stays under the 4,900-character Exchange limit; only links stay on the staging origin.
- Rebuild the Exchange templates after changing it: `npm run build:exchange` / `npm run build:exchange:staging`.

### Caching & compression (`/email`)
- `server/web.config` now rewrites `/email/*` to the physical `public/email/*` **before** the Node catch-all, registers `gif`/`png`/`webp` MIME types, keeps IIS static + dynamic compression, and applies a 30-day client cache to the `email` URL path. Previously delivered `v1`, `v2` and `v3` filenames stay cached and untouched; `v4` is a fresh cache namespace.
- `server/server.js` keeps the Express static fallback at `/email` with `Cache-Control: public, max-age=2592000` (30 days) and compression for text and PNG responses; the rest of `public/` keeps Express defaults.
- Bump `ASSET_VERSION` in `src/lib/signatureConfig.ts` and rebuild all assets/templates when artwork changes, instead of editing a cached file in place.

### Render Deployment Setup
1. **If configured as a Static Site**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **SPA Routing Rewrite Rule**:
     - Direct navigation to `/download`, `/signature`, or `/banner-render` requires a rewrite rule in the Render Dashboard under **Redirects/Rewrites**:
       - **Source**: `/*`
       - **Destination**: `/index.html`
       - **Action**: `Rewrite`
2. **If configured as a Web Service (Node/Express)**:
   - **Build Command**: `npm run build:single`
     - **Important**: `server/public` is gitignored. Running `npm run build:single` during the build step compiles the Vite frontend into `dist/` and copies all static assets into `server/public/`.
   - **Start Command**: `node server/server.js` (or `npm run server`)
   - SPA catch-all routing is handled automatically by Express in `server/server.js`.

### SmarterASP Production Deployment
1. Run the asset/template builds, then `npm run build:single` locally (defaults to production `https://biomonie.com` with no extra flags):
   ```bash
   npm run build:email-assets
   npm run build:banner
   npm run build:exchange
   npm run build:exchange:staging
   npm run build:single
   ```
2. Zip and upload the `server/` directory to SmarterASP.
3. **Deploy list**: `server/public/email/v4/` (13 files, ~671 KB total: 2 logos, 3 contact icons, 6 social icons, `banner.gif` at 396.4 KB and the `banner.png` static fallback at 239.7 KB) plus the four regenerated files in `docs/`. A signature loads 12 of them (11 transparent PNGs + `banner.gif`, ~432 KB); `banner.png` is only a fallback. Keep the legacy files directly under `server/public/email/`, `v2/` and `v3/` in place for old signatures.
4. `server/web.config` rewrites `/email/v4/*` to the static files before the Node catch-all; Express still serves them if IIS rewriting is unavailable.
5. The v4 wordmark is `public/email/v4/logo-wordmark.png` (184×80, unchanged copy of the v3 master). `public/email/logo-wordmark.transparent.png` is the source artwork and is not referenced by the signature.
6. After deploying, verify `curl -I https://biomonie.com/email/v4/banner.gif` returns `200`, `Content-Type: image/gif`, and `Cache-Control: public, max-age=2592000`; also check `https://biomonie.com/email/v4/logo-mark.png` returns `image/png`. The response may come from IIS static handling (preferred) or the Express fallback.

### Email client checklist

- [ ] **Gmail**: paste from "Copy signature"; confirm formatting, links, and animated banner.
- [ ] **Outlook desktop**: confirm first static frame of GIF (`hard`), fixed 750px width, and zero unexpected gap or padding issues.
- [ ] **Outlook web**: confirm rich HTML paste and all social and banner links.
- [ ] **Outlook Mobile**: confirm phone numbers are not auto-linked blue. The web generator forces `color:#FFFFFF;text-decoration:none` on both the `tel:` anchor and an inner white `<span>`; the Exchange templates use white anchors directly. The downloaded full-document HTML carries `<meta name="format-detection" content="telephone=no">` (the copied fragment intentionally does not). If Outlook Mobile still recolours the number, its own phone-number detector is winning over inline CSS; the remaining mitigation is to deliver the signature through the Exchange disclaimer templates, which use the same white anchors.
- [ ] **Apple Mail (macOS / iOS)**: confirm fonts, retina image sharpness, and `mailto:`/`tel:` behavior.
- [ ] **Mobile phone (responsive viewport)**: verify the web generator page scales the 750px preview container smoothly with no horizontal page scroll (the outer table carries `max-width:100%` and the columns stack under 480px); verify Exchange signatures keep their fixed 750px width.
