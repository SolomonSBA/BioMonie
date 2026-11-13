import { signatureAssets } from '../src/lib/signatureConfig.ts';
import { normalizeOrigin } from '../src/lib/storeLinks.ts';

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
const b0 = 'display:block;border:0';

// Let's print every image URL length
console.log('Origin length:', origin.length);
console.log('u length:', u.length);
console.log('bannerLink length:', bannerLink.length);

// Count how many times origin/u appears:
// 1. bgNavy: 2
// 2. logoMark: 1
// 3. mail: 1
// 4. phone: 1
// 5. secondPhone: 1
// 6. web link (href): 1
// 7. website icon: 1
// 8. bgGrey: 2
// 9. logoWordmark: 1
// 10. social icons: 6
// 11. bgBanner: 2
// 12. bannerLink: 1
// 13. banner gif: 1
// Total asset/origin references = 22!
// 22 * 35 chars = 770 chars!
