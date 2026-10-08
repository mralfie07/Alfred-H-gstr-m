import { chromium } from 'playwright';
const [,, out, w = '390', h = '844'] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errors.push(m.type() + ': ' + m.text()));
const t0 = Date.now();
await page.goto('http://localhost:4321/', { waitUntil: 'commit' });
for (const t of (process.env.TIMES || '250,900,1700,2150,2450,2800,3300,4200,5600').split(',').map(Number)) {
  const wait = t - (Date.now() - t0);
  if (wait > 0) await page.waitForTimeout(wait);
  await page.screenshot({ path: `${out}/intro-${w}-${String(t).padStart(4, '0')}.png` });
}
console.log(await page.evaluate(() => document.documentElement.className));
console.log(errors.join('\n'));
await browser.close();
