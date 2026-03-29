/**
 * BioMonie contact form — posts to Node API (single-folder deploy).
 * Set VITE_CONTACT_API_URL in .env.production to your live origin if needed.
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
  data: ContactFormData
): Promise<{ ok: boolean; error?: string }> {
  const apiUrl = getContactApiUrl();
  const baseUrl = apiUrl ?? "";
  try {
    const res = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        interest: data.interest || "",
        message: data.message,
      }),
    });
    const text = await res.text();
    let json: { ok?: boolean; error?: string } = {};
    try {
      json = text ? (JSON.parse(text) as typeof json) : {};
    } catch {
      /* non-JSON body */
    }
    if (!res.ok) {
      const fromServer = typeof json.error === "string" ? json.error : "";
      const hint404 =
        res.status === 404
          ? "Contact API not found. While developing, run `npm run server` in a second terminal (API on port 3000) and keep `npm run dev` running."
          : "";
      return {
        ok: false,
        error: fromServer || hint404 || `Request failed (${res.status}). Try again or check that the server is running.`,
      };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Network error";
    if (msg === "Failed to fetch" || msg.includes("NetworkError")) {
      return {
        ok: false,
        error:
          "Cannot reach the contact service. Start the API with `npm run server` (port 3000) while using the site locally, or deploy the Node server that serves `/contact`.",
      };
    }
    return { ok: false, error: msg };
  }
}
