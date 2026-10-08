import { chromium } from 'playwright';
const [,, out, url, w, h, ...stops] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, hasTouch: +w < 600, isMobile: +w < 600 });
await ctx.addInitScript(() => { try { sessionStorage.setItem('o7-intro', '1'); } catch (e) {} });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errors.push(m.type() + ': ' + m.text()));
page.on('response', (r) => r.status() >= 400 && errors.push(r.status() + ' ' + r.url()));
await page.goto('http://localhost:4321' + url, { waitUntil: 'load' });
await page.waitForTimeout(1200);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
console.log('height', total);
for (const stop of stops) {
  const [y, wait = '1600'] = stop.split('@');
  // scroll in steps so scroll-driven/IO effects see real scrolling
  await page.evaluate(async (target) => {
    const start = scrollY; const steps = 12;
    for (let i = 1; i <= steps; i++) { scrollTo(0, start + (target - start) * i / steps); await new Promise(r => requestAnimationFrame(r)); }
  }, +y);
  await page.waitForTimeout(+wait);
  await page.screenshot({ path: `${out}/${w}-${url.replace(/\W+/g, '_')}-${y}.png` });
}
console.log(errors.join('\n'));
await browser.close();
