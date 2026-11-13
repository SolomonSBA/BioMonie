import { signatureAssets } from '../src/lib/signatureConfig.ts';
import { normalizeOrigin } from '../src/lib/storeLinks.ts';

function testSavings() {
  const origin = 'https://biomonie1.onrender.com';
  const u = `${origin}/email`;
  const bannerLink = `${origin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
  const a = signatureAssets.images;

  const fb = 'https://facebook.com/biomonie';
  const x = 'https://x.com/biomonie';
  const ig = 'https://instagram.com/biomonie';
  const yt = 'https://youtube.com/biomonie';
  const li = 'https://linkedin.com/company/biomonie';
  const tt = 'https://tiktok.com/@biomonie';

  const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
  const w = 'color:#fff;text-decoration:none';
  const imgB = 'display:block;border:0';

  // Can we make the social icons row more concise?
  // What about shortening URLs or styles?
  // Let's test!
}
