# Biomonie email signature — Exchange setup

This page is the handover for the four Exchange disclaimer templates in `docs/`.
No HTML knowledge is needed to deploy them.

## 1. Which file goes to which staff

| File | Use it for |
|---|---|
| `docs/exchange-signature.html` | Staff with **one** phone number (mobile only) |
| `docs/exchange-signature.two-phones.html` | Staff with **two** phone numbers (mobile + office/landline) |
| `docs/exchange-signature.staging.html` | Same as the one-phone file, but links point at the staging/test site |
| `docs/exchange-signature.two-phones.staging.html` | Same as the two-phone file, but links point at the staging/test site |

Use the **staging** files only while testing. Use the two production files for live mail.

The signature reads four directory fields. They must be filled in for every user:

- **Name** (`%%DisplayName%%`)
- **Title** (`%%Title%%`)
- **Mobile** (`%%MobileNumber%%`)
- **Phone** (`%%PhoneNumber%%`, two-phone template only)

If a field is empty, that line will be empty in the signature.

## 2. Mail flow rule settings

In **Exchange Admin Center → Mail flow → Rules → Create a rule**:

1. **Apply this rule if**: the sender is located **Inside the organization**
   (for the pilot, add a further condition so it applies only to one test mailbox).
2. **Do the following**: **Apply a disclaimer to the message** → **append a disclaimer**.
3. **Fallback action**: **Wrap**.
4. **Apply to messages sent to**: **Outside the organization**.
5. Add an **exception**: skip the rule if the message body **already contains**
   `BIOMONIE TECHNOLOGIES`. (Exchange cannot test for HTML in a rule condition,
   so this plain-text phrase is the duplicate guard.)
6. Start the pilot **on one mailbox only** by adding that sender as a condition.
   Roll out to everyone after the test messages look correct.

The character limit for this content is **5,000 characters**, including the rule
wrapper. All four files are comfortably below it:

| File | Characters | Spare |
|---|---:|---:|
| `exchange-signature.html` | 4,361 | 539 |
| `exchange-signature.two-phones.html` | 4,747 | 153 |
| `exchange-signature.staging.html` | 4,381 | 519 |
| `exchange-signature.two-phones.staging.html` | 4,767 | 133 |

A responsive stacking `<style>` block is **not** included: the two-phone
templates only have 153 and 133 characters of headroom, and even the smallest
useful block plus the class attributes needed to scope it is ~136 characters,
so it cannot fit in all four files. The fixed-width table renders correctly in
Exchange without it.

Check a single file in PowerShell:

```powershell
(Get-Content .\docs\exchange-signature.two-phones.html -Raw).Length
```

Run `npm run count:exchange` to print all four counts and fail if any crosses
4,900.

## 3. What users will see

- The signature is added **after the message is sent**. It does **not** appear in
  the Outlook compose window.
- Uppercase names rely on CSS (`text-transform:uppercase`). **Classic Outlook on
  Windows** does not apply that rule, so the name appears exactly as stored in
  the directory. Store names in the preferred capitalisation.
- Long email addresses: the 202px email column fits about **40 characters** at
  10px Arial with the −0.4px tracking applied to the email row. The 40-character
  stress-test address in `*.long.html` measures 199.3px and fits; keep aliases
  at or below ~40 characters.
- Very long names: the name box is a fixed two 20px lines at 16px. A
  40-character all-uppercase name (like the stress preview) can wrap to a third
  line in clients that honour `text-transform:uppercase`; the row then grows by
  one line and the banner grows with it, so the two columns stay equal height.
  Keep directory names reasonably short, or store them in normal case; classic
  Outlook shows the stored text without uppercasing.
- The staging templates use the test site (`https://biomonie1.onrender.com`) for
  the banner, website and download links while still loading the production v4
  images. Do not send them to external recipients as the final signature.

## 4. How to test

1. Apply the rule to **one mailbox** first.
2. Send from that mailbox to an **external Gmail address**. Check:
   - the name, title, mobile/phone and email text,
   - all six social links and the website link,
   - the banner animation (static first frame in classic Outlook is expected),
   - no grey boxes or invisible text in Outlook dark mode.
3. Send the same message to an **Outlook.com / Microsoft 365** address and check
   the same items.
4. Reply once and confirm the signature is not added a second time (the
   `BIOMONIE TECHNOLOGIES` exception should skip the already-signed body).
5. Only after both tests pass, broaden the rule to all staff.

## 5. Local previews

Run:

```bash
npm run preview:exchange
```

This writes `docs/preview/<template>.html`, a long-name stress test
`<template>.longname.html`, and an extreme `<template>.long.html` for each
template. Open them directly in a browser. `docs/preview/` is gitignored and is
**not** part of the deployment. `npm run check:exchange` renders all of them in
quirks and standards mode at 1.0× and 1.2× zoom and asserts the left column and
banner have identical height and top, no strict-sample text overflows, and all
navy text is white.

## 6. Variables at a glance

| Variable | Meaning |
|---|---|
| `%%DisplayName%%` | Full name from the directory |
| `%%Title%%` | Job title |
| `%%UserLogonName%%` | Email address/local part (constant `EXCHANGE_EMAIL_VAR`; can be switched to `%%Email%%` if IT confirms it is supported) |
| `%%MobileNumber%%` | Mobile number |
| `%%PhoneNumber%%` | Second phone number (two-phone template only) |
