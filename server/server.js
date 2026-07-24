/**
 * BioMonie: API + React app from one Node server (single folder on host).
 * Config: process.env (from .env) → config.local.js → FALLBACK (same order as SterlingPro).
 * On SmarterASP some hosts strip .env; use config.local.js or FALLBACK before upload.
 * Do not commit real secrets in FALLBACK if the repo is public.
 */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();
const require = createRequire(import.meta.url);

let localConfig = {};
try {
  localConfig = require(path.join(__dirname, 'config.local.js'));
} catch {
  try {
    const jsonPath = path.join(__dirname, 'config.local.json');
    if (fs.existsSync(jsonPath)) {
      localConfig = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    }
  } catch {
    // optional
  }
}
function formatDate() {
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Lagos',
  }).format(new Date());
}

/** Same EncryptKey SMTP as SterlingPro (mail5013.site4now.net / info@encryptkey.co.uk). */
const FALLBACK = {
  SMTP_HOST: 'mail5006.site4now.net',
  SMTP_PORT: '587',
  SMTP_USER: 'contact@biomonie.com',
  SMTP_PASS: 'Password10$',
  CONTACT_TO_EMAIL: 'contact@biomonie.com',
};

function env(key) {
  return process.env[key] ?? localConfig[key] ?? FALLBACK[key];
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

function getTransporter() {
  const host = env('SMTP_HOST');
  const user = env('SMTP_USER');
  const pass = env('SMTP_PASS');
  if (!host || !user || !pass) {
    throw new Error('Missing SMTP config: SMTP_HOST, SMTP_USER, SMTP_PASS');
  }
  const port = parseInt(env('SMTP_PORT') || '587', 10);
  const secure = env('SMTP_SECURE') === 'true' || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

const contactTo = env('CONTACT_TO_EMAIL') || env('SMTP_USER');

function escapeHtml(input = '') {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(input = '') {
  return escapeHtml(input).replace(/\n/g, '<br />');
}

function buildEmailLayout({ title, subtitle, rows }) {
  const rowHtml = rows
    .filter((r) => r.value)
    .map(
      (r) => `
        <tr>
          <td style="padding:8px 0;color:#5a7a8a;font-size:13px;width:170px;vertical-align:top;">${escapeHtml(r.label)}</td>
          <td style="padding:8px 0;color:#0f1e26;font-size:14px;font-weight:500;vertical-align:top;">${r.value}</td>
        </tr>
      `,
    )
    .join('');

  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#EBF3F7;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid #dde8f0;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="height:6px;background:linear-gradient(90deg,#295C72,#F5FF00);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:18px 24px;background:#0f1e26;color:#ffffff;">
                    <div style="display:inline-block;padding:4px 10px;border-radius:999px;background:rgba(245,255,0,0.12);color:#F5FF00;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">BioMonie Website</div>
                    <div style="font-size:20px;font-weight:700;letter-spacing:0.2px;margin-top:10px;color:#ffffff;">BioMonie</div>
                    <div style="margin-top:6px;color:#d6e7f2;font-size:13px;">Secure • Fast • Biometric Financial Solutions
</div>
                    <div style="font-size:13px;opacity:0.95;margin-top:4px;color:rgba(255,255,255,0.9);">${escapeHtml(subtitle)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 24px;">
                    <h2 style="margin:0 0 14px;font-size:18px;color:#0f1e26;">${escapeHtml(title)}</h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${rowHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

async function handleContact(req, res) {
  try {
    const { name, email, phone, interest, message, _subject } = req.body || {};

    const submittedAt = formatDate();

    const ipAddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

    const browser = req.headers['user-agent'] || 'Unknown';
    // const { name, email, phone, interest, message, _subject } = req.body || {};
    console.log('BioMonie contact from', email || '(no email)');
    const subject = `BioMonie Website Enquiry | ${escapeHtml(interest || 'General')} | ${escapeHtml(name || 'Unknown')}`;
    // const subject = _subject || 'BioMonie website – Contact form';
    let transporter;
    try {
      transporter = getTransporter();
    } catch (cfgErr) {
      console.error('SMTP not configured:', cfgErr.message);
      return res.status(503).json({
        ok: false,
        error:
          'Email is not configured on the server. Add SMTP_HOST, SMTP_USER, and SMTP_PASS (e.g. in server/config.local.js or .env), then restart the server.',
      });
    }
    const text = [
      'Source Website: BioMonie',
      '',
      `Name: ${name || ''}`,
      `Email: ${email || ''}`,
      `Phone: ${phone || ''}`,
      `Interest: ${interest || ''}`,
      '',
      (message || '').trim(),
    ].join('\n');
    const html = buildEmailLayout({
      title: 'New Contact Form Submission',
      subtitle: 'BioMonie website contact request',
      rows: [
        { label: 'Source Website', value: 'BioMonie Website' },
        { label: 'Name', value: escapeHtml(name || '') },
        {
          label: 'Email',
          value: `<a href="mailto:${escapeHtml(email || '')}" style="color:#295C72;text-decoration:none;">${escapeHtml(email || '')}</a>`,
        },
        {
          label: 'Phone',
          value: `<a href="tel:${escapeHtml(phone || '')}" style="color:#295C72;text-decoration:none;">${escapeHtml(phone || '')}</a>`,
        },
        { label: 'Interest', value: escapeHtml(interest || '') },
        { label: 'Message', value: nl2br((message || '').trim()) },
        { label: 'Submitted', value: submittedAt },
        { label: 'IP Address', value: escapeHtml(ipAddress) },
        { label: 'Browser', value: escapeHtml(browser) },
      ],
    });
    await transporter.sendMail({
      // from: env('SMTP_USER'),
      from: `"BioMonie Website" <${env('SMTP_USER')}>`,
      to: contactTo,
      replyTo: email || undefined,
      subject,
      text,
      html,
    });
    // console.log('Contact email sent to', contactTo);
    console.log(`✔ Contact form submitted by ${name} <${email}>`);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Contact send error:', e);
    res.status(500).json({ ok: false, error: e.message || 'Failed to send' });
  }
}

app.get('/api/contact', (req, res) =>
  res.json({ status: 'ok', message: 'BioMonie Contact API' }),
);
app.get('/api', (req, res) =>
  res.json({ status: 'ok', message: 'BioMonie API' }),
);
app.post('/api/contact', handleContact);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`BioMonie (API + site) listening on port ${PORT}`);
});
