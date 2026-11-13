import { buildSignatureHtml, buildExchangeSignatureHtml } from '../src/lib/signatureBuilder.ts';

const samples = {
  web: buildSignatureHtml({
    name: 'Solomon Chukwuka Emmanuel',
    title: 'Senior Software Engineer / Technical Lead',
    email: 'solomon.chukwuka.emmanuel@biomonie.com',
    phone: '+234 (0) 801 234 5678',
    secondPhone: '+234 (0) 809 876 5432',
  }),
  webOnePhone: buildSignatureHtml({
    name: 'Miracle Amos',
    title: 'UX Designer',
    email: 'miracle@biomonie.com',
    phone: '+234 807 739 4817',
  }),
  exchange1: buildExchangeSignatureHtml({ twoPhones: false }),
  exchange2: buildExchangeSignatureHtml({ twoPhones: true }),
};

for (const [label, html] of Object.entries(samples)) {
  const tds = Array.from(html.matchAll(/<td\b[^>]*>/g)).map((m) => m[0]);
  const missing = tds.filter((tag) => !/\bwidth\s*=/.test(tag));
  const imgs = Array.from(html.matchAll(/<img\b[^>]*>/g)).map((m) => m[0]);
  const badImgs = imgs.filter(
    (tag) =>
      !/\bwidth\s*=/.test(tag) ||
      !/\bheight\s*=/.test(tag) ||
      !/\bborder\s*=\s*["']?0/.test(tag) ||
      !/display:\s*block/.test(tag) ||
      !/-ms-interpolation-mode:\s*bicubic/.test(tag),
  );
  console.log(
    `${label}: length=${html.length} tds=${tds.length} missingWidth=${missing.length} imgs=${imgs.length} badImgs=${badImgs.length}`,
  );
  if (missing.length) console.log('  missing width:', missing);
  if (badImgs.length) console.log('  bad images:', badImgs);
}
