const { chromium } = require('C:/Users/Marijana/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const output = 'C:/Users/Marijana/.codex/visualizations/2026/10/06/01a1122e-421a-7bd0-9b32-4ce65afd6057';
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const errors = [];
    for (const width of [320, 390, 430, 768, 800, 801, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      page.on('pageerror', e => errors.push(e.message));
      page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
      await page.goto((process.env.CONCEPT_B_URL || 'http://127.0.0.1:4174/concept-b/index.html'));
      // Trigger offscreen lazy images only in the verifier.
      await page.evaluate(() => document.querySelectorAll('img').forEach(img => img.loading = 'eager'));
      await page.locator('#o-nama').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, 'page overflow ' + width);
      assert.ok(await page.locator('button, .button, .navbar a').evaluateAll(elements => elements.filter(e => e.getClientRects().length).every(e => e.getBoundingClientRect().height >= 44)), 'touch targets ' + width);
      if (width <= 800) {
        await page.locator('.menu-toggle').click();
        assert.ok(await page.locator('.navbar').isVisible());
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.navbar').isVisible(), false);
        await page.locator('.browse-next').click();
        assert.ok(await page.locator('.services-grid').evaluate(e => e.scrollLeft > 100));
      } else {
        assert.equal(await page.locator('.services-grid').evaluate(e => getComputedStyle(e).display), 'grid');
      }
      for (let i = 0; i < 4; i++) {
        await page.locator('[data-service]').nth(i).click();
        assert.ok(await page.locator('#service-details').evaluate(e => e.open));
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#service-details').evaluate(e => e.open), false);
      }
      await page.locator('[data-contact]').first().click();
      assert.ok(await page.locator('#contact-details').evaluate(e => e.open));
      await page.locator('#contact-details .close-dialog').click();
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator('.services-grid').evaluate(e => e.scrollTo({ left: 0 }));
      if (width === 390 || width === 1440) await page.screenshot({ path: output + '/concept-b-' + width + '.png', fullPage: true });
      console.log('PASS ' + width + 'px: layout, images, menu, services, contact');
      await page.close();
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

