import { signatureAssets } from '../src/lib/signatureConfig.ts';
import { normalizeOrigin } from '../src/lib/storeLinks.ts';

function analyze(origin, twoPhones) {
  const u = `${origin}/email`;
  const bannerLink = `${origin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
  const a = signatureAssets.images;
  const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
  const w = 'color:#fff;text-decoration:none';
  const b0 = 'display:block;border:0';

  const fb = 'https://facebook.com/biomonie';
  const x = 'https://x.com/biomonie';
  const ig = 'https://instagram.com/biomonie';
  const yt = 'https://youtube.com/biomonie';
  const li = 'https://linkedin.com/company/biomonie';
  const tt = 'https://tiktok.com/@biomonie';

  // Let's measure each piece
  console.log('u length:', u.length);
  console.log('bannerLink length:', bannerLink.length);
  console.log('social URLs length:', (fb + x + ig + yt + li + tt).length);
}

analyze('https://biomonie1.onrender.com', true);
