/**
 * BioMonie contact form — posts to Node API (same pattern as EncryptKey).
 * - Same-host SmarterASP deploy: leave VITE_CONTACT_API_URL unset; forms POST to /api/contact.
 * - Local dev: set VITE_CONTACT_API_URL=http://localhost:3000 in .env.local, run `npm run server`.
 */

export function getContactApiUrl(): string | undefined {
  const url = import.meta.env.VITE_CONTACT_API_URL as string | undefined;
  return url ? url.replace(/\/$/, "") : undefined;
}

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
};

export async function submitContactForm(
  data: ContactFormData,
): Promise<{ ok: boolean; error?: string }> {
  const apiUrl = getContactApiUrl();
  const endpoint = apiUrl ? `${apiUrl}/api/contact` : "/api/contact";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        interest: data.interest || "",
        message: data.message,
        _subject: "BioMonie website – Contact form",
      }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    if (!res.ok) {
      return {
        ok: false,
        error:
          json.error ||
          (res.status === 404
            ? "Contact API not found. Run `npm run server` in a second terminal while developing locally."
            : `Request failed (${res.status}). Try again later.`),
      };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Network error";
    if (msg === "Failed to fetch" || msg.includes("NetworkError")) {
      return {
        ok: false,
        error:
          "Cannot reach the contact service. Run `npm run server` locally, or deploy the Node server folder to SmarterASP.",
      };
    }
    return { ok: false, error: msg };
  }
}
