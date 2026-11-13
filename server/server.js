/**
 * BioMonie: API + React app from one Node server (single folder on host).
 * Config: process.env (from .env) → config.local.js → FALLBACK (same order as SterlingPro).
 * On SmarterASP some hosts strip .env; use config.local.js or FALLBACK before upload.
 * Do not commit real secrets in FALLBACK if the repo is public.
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();
const require = createRequire(import.meta.url);

let localConfig = {};
try {
  localConfig = require(path.join(__dirname, "config.local.js"));
} catch {
  try {
    const jsonPath = path.join(__dirname, "config.local.json");
    if (fs.existsSync(jsonPath)) {
      localConfig = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    }
  } catch {
    // optional
  }
}

/** Same EncryptKey SMTP as SterlingPro (mail5013.site4now.net / info@encryptkey.co.uk). */
const FALLBACK = {
  SMTP_HOST: "mail5013.site4now.net",
  SMTP_PORT: "587",
  SMTP_USER: "info@encryptkey.co.uk",
  SMTP_PASS: "v1AfsTbBa#",
  CONTACT_TO_EMAIL: "contact@sterlingprong.com",
  ACCOUNT_CLOSURE_TO_EMAIL: "dpo@biomonie.com",
};

function env(key) {
  return process.env[key] ?? localConfig[key] ?? FALLBACK[key];
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(
  compression({
    // Text is compressed by default; PNG is already deflate-compressed, but the
    // delivery requirement explicitly includes it so we allow image/png through.
    filter: (req, res) => {
      const type = String(res.getHeader("Content-Type") || "");
      if (type.startsWith("image/png")) return true;
      return compression.filter(req, res);
    },
  }),
);
app.use(express.json());

function getTransporter() {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  if (!host || !user || !pass) {
    throw new Error("Missing SMTP config: SMTP_HOST, SMTP_USER, SMTP_PASS");
  }
  const port = parseInt(env("SMTP_PORT") || "587", 10);
  const secure = env("SMTP_SECURE") === "true" || port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

const contactTo = env("CONTACT_TO_EMAIL") || env("SMTP_USER");
const configuredAccountClosureTo = env("ACCOUNT_CLOSURE_TO_EMAIL") || "dpo@biomonie.com";
const accountClosureTo = [...new Set([
  ...configuredAccountClosureTo.split(/[;,]/).map((email) => email.trim()).filter(Boolean),
  "olawale@biomonie.com",
  "customer@biomonie.com",
])].join(", ");

function escapeHtml(input = "") {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(input = "") {
  return escapeHtml(input).replace(/\n/g, "<br />");
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
      `
    )
    .join("");

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
    const { name, email, phone, interest, message } = req.body || {};
    const isAccountClosure = interest === "Account Closure Request" || interest === "Account Deletion Request";
    const recipient = isAccountClosure ? accountClosureTo : contactTo;
    const reference = isAccountClosure ? `BAC-${randomUUID().slice(0, 8).toUpperCase()}` : undefined;
    console.log("BioMonie contact from", email || "(no email)");
    let transporter;
    try {
      transporter = getTransporter();
    } catch (cfgErr) {
      console.error("SMTP not configured:", cfgErr.message);
      return res.status(503).json({
        ok: false,
        error:
          "Email is not configured on the server. Add SMTP_HOST, SMTP_USER, and SMTP_PASS (e.g. in server/config.local.js or .env), then restart the server.",
      });
    }
    const text = [
      "Source Website: BioMonie",
      "",
      `Name: ${name || ""}`,
      `Email: ${email || ""}`,
      `Phone: ${phone || ""}`,
      `Interest: ${interest || ""}`,
      ...(reference ? [`Reference: ${reference}`] : []),
      "",
      (message || "").trim(),
    ].join("\n");
    const html = buildEmailLayout({
      title: isAccountClosure ? "Account Closure Request" : "New Contact Form Submission",
      subtitle: isAccountClosure
        ? `Request reference ${reference} — verify the account holder and eligibility before taking account action`
        : "BioMonie website contact request",
      rows: [
        ...(reference ? [{ label: "Reference", value: escapeHtml(reference) }] : []),
        { label: "Source Website", value: "BioMonie Website" },
        { label: "Name", value: escapeHtml(name || "") },
        { label: "Email", value: escapeHtml(email || "") },
        { label: "Phone", value: escapeHtml(phone || "") },
        { label: "Interest", value: escapeHtml(interest || "") },
        { label: "Message", value: nl2br((message || "").trim()) },
      ],
    });
    await transporter.sendMail({
      from: env("SMTP_USER"),
      to: recipient,
      replyTo: email || undefined,
      subject: isAccountClosure
        ? `Biomonie account closure request ${reference}`
        : "BioMonie website – Contact form",
      text,
      html,
    });
    console.log("Contact email sent to", recipient);
    res.status(200).json({ ok: true, ...(reference ? { reference } : {}) });
  } catch (e) {
    console.error("Contact send error:", e);
    res.status(500).json({ ok: false, error: e.message || "Failed to send" });
  }
}

async function handleAccountClosureRequest(req, res) {
  try {
    const { name, phone, email, accountType, reasons, otherReason, confirmed } = req.body || {};
    const allowedAccountTypes = ["Customer", "Agent", "Merchant", "Sales Relationship Manager (SRM)"];
    const allowedReasons = [
      "No longer using the service",
      "Privacy concerns",
      "Switching to another provider",
      "Business closure",
      "Other",
    ];

    if (
      typeof name !== "string" || !name.trim() || name.length > 160 ||
      typeof phone !== "string" || !phone.trim() || phone.length > 40 ||
      typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      !allowedAccountTypes.includes(accountType) ||
      !Array.isArray(reasons) || reasons.length === 0 ||
      reasons.some((reason) => !allowedReasons.includes(reason)) ||
      (otherReason != null && (typeof otherReason !== "string" || otherReason.length > 500)) ||
      confirmed !== true
    ) {
      return res.status(400).json({ ok: false, error: "Check the form fields and confirm that you understand account closure may be irreversible and some records may be retained." });
    }

    let transporter;
    try {
      transporter = getTransporter();
    } catch (cfgErr) {
      console.error("SMTP not configured:", cfgErr.message);
      return res.status(503).json({
        ok: false,
        error: "Email is not configured on the server. Please email dpo@biomonie.com to submit your request.",
      });
    }

    const reference = `BAC-${randomUUID().slice(0, 8).toUpperCase()}`;
    const reasonText = reasons.join(", ") + (reasons.includes("Other") && otherReason?.trim() ? `: ${otherReason.trim()}` : "");
    const text = [
      "Biomonie account closure request",
      `Reference: ${reference}`,
      `Full name: ${name.trim()}`,
      `Registered phone: ${phone.trim()}`,
      `Email: ${email.trim()}`,
      `Account type: ${accountType}`,
      `Reason(s): ${reasonText}`,
      "Account-closure consequences and lawful retention explained and confirmed: Yes",
      "",
      "Verify the requester's identity and eligibility before taking any account action.",
    ].join("\n");
    const html = buildEmailLayout({
      title: "Account Closure Request",
      subtitle: `Request reference ${reference} — identity and eligibility verification required`,
      rows: [
        { label: "Reference", value: escapeHtml(reference) },
        { label: "Full name", value: escapeHtml(name.trim()) },
        { label: "Registered phone", value: escapeHtml(phone.trim()) },
        { label: "Email", value: escapeHtml(email.trim()) },
        { label: "Account type", value: escapeHtml(accountType) },
        { label: "Reason(s)", value: escapeHtml(reasonText) },
        { label: "Closure and lawful retention understood", value: "Yes" },
      ],
    });

    await transporter.sendMail({
      from: env("SMTP_USER"),
      to: accountClosureTo,
      replyTo: email.trim(),
      subject: `Biomonie account closure request ${reference}`,
      text,
      html,
    });
    console.log("Account closure request sent", reference, "to", accountClosureTo);
    return res.status(200).json({ ok: true, reference });
  } catch (error) {
    console.error("Account closure request send error:", error);
    return res.status(500).json({ ok: false, error: "We could not submit your request. Please email dpo@biomonie.com." });
  }
}

app.get("/api/contact", (req, res) => res.json({ status: "ok", message: "BioMonie Contact API" }));
app.post("/api/contact", handleContact);
app.get("/api/request-account-closure", (req, res) => res.json({ status: "ok", message: "Biomonie account closure API" }));
app.post("/api/request-account-closure", handleAccountClosureRequest);
// Keep the former API path working for already-built clients during rollout.
app.get("/api/request-data-removal", (req, res) => res.json({ status: "ok", message: "Biomonie account closure API" }));
app.post("/api/request-data-removal", handleAccountClosureRequest);

// Signature assets: one-month browser/CDN caching. The filenames are stable
// (old signatures point at them), so no content hash is used.
app.use(
  "/email",
  express.static(path.join(__dirname, "public", "email"), {
    maxAge: "30d",
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=2592000");
    },
  }),
);
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`BioMonie (API + site) listening on port ${PORT}`);
});
