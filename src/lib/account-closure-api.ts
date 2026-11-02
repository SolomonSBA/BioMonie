import { getContactApiUrl } from '@/lib/contact-api';

export type AccountClosureRequest = {
  name: string;
  phone: string;
  email: string;
  accountType: string;
  reasons: string[];
  otherReason?: string;
  confirmed: boolean;
};

export async function submitAccountClosureRequest(
  data: AccountClosureRequest,
): Promise<{ ok: boolean; reference?: string; error?: string }> {
  const baseUrl = getContactApiUrl() ?? '';

  try {
    const response = await fetch(`${baseUrl}/api/request-account-closure`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      reference?: string;
      error?: string;
    };

    if (!response.ok || !result.ok) {
      return {
        ok: false,
        error: result.error || (response.status === 404
          ? 'The account closure service is unavailable. Please email dpo@biomonie.com.'
          : 'We could not submit your request. Please try again or email dpo@biomonie.com.'),
      };
    }

    return { ok: true, reference: result.reference };
  } catch {
    return {
      ok: false,
      error: 'We could not reach the account closure service. Please try again or email dpo@biomonie.com.',
    };
  }
}
