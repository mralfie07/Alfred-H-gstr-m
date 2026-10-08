import { chromium } from 'playwright';
// node timeline.mjs out url w h scrollSelector times...
const [,, out, url, w, h, selector, ...times] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, hasTouch: +w < 600, isMobile: +w < 600 });
await ctx.addInitScript(() => { try { sessionStorage.setItem('o7-intro', '1'); } catch (e) {} });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
await page.goto('http://localhost:4321' + url, { waitUntil: 'load' });
await page.waitForTimeout(800);
if (selector !== '-') {
  await page.evaluate(async (sel) => {
    const el = document.querySelector(sel);
    const target = el.getBoundingClientRect().top + scrollY - 70;
    const start = scrollY;
    for (let i = 1; i <= 8; i++) { scrollTo(0, start + (target - start) * i / 8); await new Promise(r => requestAnimationFrame(r)); }
  }, selector);
}
const t0 = Date.now();
for (const t of times) {
  const wait = +t - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  await page.screenshot({ path: `${out}/tl-${String(t).padStart(5, '0')}.png` });
}
console.log(errors.join('\n'));
await browser.close();
