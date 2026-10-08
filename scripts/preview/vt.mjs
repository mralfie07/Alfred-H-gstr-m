import { chromium } from 'playwright';
const [,, out, from, clickSel, w, h, rate = '0.1', frames = '14', gap = '250'] = process.argv;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, hasTouch: +w < 600, isMobile: +w < 600 });
await ctx.addInitScript(() => { try { sessionStorage.setItem('o7-intro', '1'); } catch (e) {} });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => m.type() === 'error' && !m.text().includes('404') && errors.push(m.text()));
await page.goto('http://localhost:4321' + from, { waitUntil: 'load' });
await page.waitForTimeout(2500);
const cdp = await ctx.newCDPSession(page);
await cdp.send('Animation.enable');
await cdp.send('Animation.setPlaybackRate', { playbackRate: +rate });
await page.click(clickSel, { noWaitAfter: true });
for (let i = 0; i < +frames; i++) {
  await page.waitForTimeout(+gap);
  await page.screenshot({ path: `${out}/vt-${String(i).padStart(2, '0')}.png` }).catch((e) => errors.push('shot ' + i + ' ' + e.message));
}
console.log(page.url());
console.log(errors.join('\n'));
await browser.close();
