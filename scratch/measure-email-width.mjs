import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(
  '<!DOCTYPE html><html><body style="margin:0">' +
    ['solomon.chukwuka.emmanuel@biomonie.com', 'solomon.chukwuka@biomonie.com', 'solomon@biomonie.com']
      .map(
        (text) =>
          `<div id="${text.length}">` +
          [7, 7.5, 8, 8.5, 9]
            .map(
              (size) =>
                `<span data-size="${size}" data-len="${text.length}" style="font-family:Arial;font-size:${size}px;white-space:nowrap;display:inline-block">${text}</span><br>`,
            )
            .join('') +
          `</div>`,
      )
      .join('') +
    '</body></html>',
);
const rows = await page.evaluate(() =>
  Array.from(document.querySelectorAll('span')).map((el) => ({
    len: Number(el.dataset.len),
    size: Number(el.dataset.size),
    width: Number(el.getBoundingClientRect().width.toFixed(1)),
  })),
);
console.log(rows);
await browser.close();
