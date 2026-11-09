# Biomonie web

## Email signature

The internal generator is available at `/signature`. It is intentionally not linked from the main navigation and has no authentication in the current app. If this must be staff-only, protect the route at the hosting layer with a shared password or an allowlist for `@biomonie.com` accounts before publishing it.

The email template is built by `src/lib/signatureBuilder.ts` from the image/social URL configuration in `src/lib/signatureConfig.ts`.

### Architecture & Layout Parity

The signature has an exact 600×285px layout where the left and right columns align at 285px total height:
- **Left Column (285px wide)**:
  - Navy block (176px height, `#1B3A50`): Brand mark (84×118), user details with auto-scaling font sizes for long names, 2-line wrapped job title (fixed container height to keep contact rows aligned), three contact rows (email, phone, website), and bold right-aligned company name ("Biomonie Technologies Limited").
  - Grey block (109px height, `#D9D9D9`): Wordmark (80×35), six social icons in one row, and exactly three non-breaking text link lines (`Facebook.com/biomonie | X.com/biomonie`, `Instagram.com/biomonie | Youtube.com/biomonie`, `Linkedin.com/biomonie`) formatted at 8px to prevent truncation.
- **Right Column (315px wide, `#14262F`)**:
  - One single banner image (`banner.gif`, displayed at 315×285px; 630×570px at 2×) that covers the entire right column.
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
   - Run `npm run build:banner` to automatically screenshot the configured slides (`BANNER_SLIDE_IDS`) in headless Chromium via Playwright and assemble `public/email/banner.gif` (~672 KB, 3s–3.5s per slide, infinite loop) and `public/email/banner.png` (static fallback).
   - If Playwright browsers are not yet downloaded on a new machine:
     ```bash
     npx playwright install chromium
     ```

### Scripts & Exchange Mail Flow Rule Version

- **Unit tests**: Run `npm test` to verify device detection (`detectPlatform`), placeholder detection (`isAppStorePlaceholder`), escaped inputs, cleaned `tel:` links, asset URLs, image attributes (`width`, `height`, `alt`, `display:block`), banner dimensions, origin normalization, and Exchange character constraints.
- **Exchange template (Production)**: Run `npm run build:exchange` to generate `docs/exchange-signature.html`.
  - Points to `https://biomonie.com`.
  - Inserts Exchange Active Directory tokens: `%%DisplayName%%`, `%%Title%%`, `%%UserLogonName%%`, and `%%MobileNumber%%`.
  - Minified aggressively to **under 4,500 characters** (3,795 characters) with inline CSS only.
- **Exchange template (Staging)**: Run `npm run build:exchange:staging` to generate `docs/exchange-signature.staging.html`.
  - Points to `https://biomonie1.onrender.com`.
  - Character count: 3,935 characters (under 4,500 characters).

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
1. Run `npm run build:single` locally (defaults to production `https://biomonie.com` with no extra flags).
2. Zip and upload the `server/` directory to SmarterASP.
3. Assets in `server/public/email/` are served at `/email` matching all signature image references.

### Email client checklist

- [ ] **Gmail**: paste from "Copy signature"; confirm formatting, links, and animated banner.
- [ ] **Outlook desktop**: confirm first static frame of GIF (`hard`), fixed 600px width, and zero unexpected gap or padding issues.
- [ ] **Outlook web**: confirm rich HTML paste and all social and banner links.
- [ ] **Apple Mail (macOS / iOS)**: confirm fonts, retina image sharpness, and `mailto:`/`tel:` behavior.
- [ ] **Mobile phone (responsive viewport)**: verify web generator page scales the 600px preview container smoothly with no horizontal page scroll; verify signature column stacking on supporting mobile mail clients.
