import { signatureAssets } from '../src/lib/signatureConfig.ts';

const origin = 'https://biomonie1.onrender.com';
const u = `${origin}/email`;
const bannerLink = `${origin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
const a = signatureAssets.images;
const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';

console.log('bannerLink:', bannerLink.length, bannerLink);
console.log('tsa 1 invocation:', tsa.length);
console.log('social image URLs sum:', Object.keys(a).filter(k => k.startsWith('social-')).reduce((sum, k) => sum + `${u}/${a[k]}`.length, 0));
