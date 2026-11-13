import { buildExchangeSignatureHtml } from '../src/lib/signatureBuilder.ts';

console.log('Current in signatureBuilder:');
console.log('Prod 1:', buildExchangeSignatureHtml({ siteOrigin: 'https://biomonie.com', twoPhones: false }).length);
console.log('Prod 2:', buildExchangeSignatureHtml({ siteOrigin: 'https://biomonie.com', twoPhones: true }).length);
console.log('Staging 1:', buildExchangeSignatureHtml({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: false }).length);
console.log('Staging 2:', buildExchangeSignatureHtml({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: true }).length);
