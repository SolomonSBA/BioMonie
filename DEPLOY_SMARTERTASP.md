# Deploy BioMonie to SmarterASP.net

Same pattern as **EncryptKey**: one Node.js folder serves the React site and sends contact-form email via SMTP to **contact@sterlingprong.com**.

---

## 1. SMTP config (same mailbox as EncryptKey)

Forms send **from** `info@encryptkey.co.uk` (SmarterASP SMTP) **to** `contact@sterlingprong.com`.

On your PC, in the **`server`** folder:

```bash
copy .env.example .env
```

Edit **`server/.env`**:

```env
SMTP_HOST=mail5013.site4now.net
SMTP_PORT=587
SMTP_USER=info@encryptkey.co.uk
SMTP_PASS=your_mailbox_password
CONTACT_TO_EMAIL=contact@sterlingprong.com
```

**SmarterASP tip:** If `.env` is stripped on upload, copy `config.local.example.js` → `config.local.js` with the same values, or set the values in the `FALLBACK` block in `server.js` before upload (do not commit real passwords to git).

---

## 2. Test locally

**Terminal 1** — API:

```bash
cd server
npm install
npm start
```

**Terminal 2** — frontend (project root):

```bash
copy .env.local.example .env.local
npm install
npm run dev
```

Open `http://localhost:8080/contact`, submit the form, and check **contact@sterlingprong.com**.

---

## 3. Build for deploy

From the project root:

```bash
npm run build:deploy
```

This runs `vite build` and copies **`dist/`** into **`server/public/`**.

---

## 4. Upload to SmarterASP (Node.js hosting)

1. In SmarterASP, create or open a **Node.js** site.
2. Upload the **`server`** folder contents:
   - `server.js`, `run.js`, `web.config`, `package.json`
   - `public/` (built React app from step 3)
   - `config.local.js` or `.env` with SMTP settings (not in git)
3. On the server, run **`npm install`** (or upload `node_modules` if the panel requires it).
4. Set the **start file** to **`run.js`** (iisnode entry — already in `web.config`).
5. Enable **HTTPS** for your domain in the control panel.

**Do not** set `VITE_CONTACT_API_URL` for production when API and site are on the same domain — the form posts to `/api/contact` on the same origin.

---

## 5. After deploy

| Check | Expected |
|-------|----------|
| `https://yourdomain.com/` | Coming Soon homepage |
| `https://yourdomain.com/contact` | Contact page (not JSON) |
| Submit contact form | Email at **contact@sterlingprong.com** |
| Email **From** | info@encryptkey.co.uk |

---

## Quick checklist

| Step | Done |
|------|------|
| `server/.env` or `config.local.js` with SMTP + `CONTACT_TO_EMAIL=contact@sterlingprong.com` | |
| Local test (`npm start` in server + `npm run dev`) | |
| `npm run build:deploy` | |
| Upload `server/` to SmarterASP Node app | |
| `npm install` on host, start `run.js` | |
| Test live contact form | |

---

## Troubleshooting

- **404 on form submit** — Node app not running or `web.config` missing; ensure `run.js` is the iisnode entry.
- **503 email not configured** — SMTP vars missing on the server; use `config.local.js` if `.env` was stripped.
- **Contact page shows JSON** — Old build used `GET /contact` for the API; current API is **`/api/contact`** only.
- **Cert / SMTP errors** — Use `mail5013.site4now.net`, not `mail.yourdomain.co.uk`.
