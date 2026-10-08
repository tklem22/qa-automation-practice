import { test, expect } from './fixtures';

test.describe('problem_user', () => {
  test.beforeEach(async ({ loginPage }) => { await loginPage.login('problem_user'); });

  test('KNOWN BUG: product images are all different and correct', async ({ page }) => {
    test.fail(); // site bug: remove this line when fixed
    const srcs = await page.locator('.inventory_item_img img').evaluateAll(els => els.map(e => (e as HTMLImageElement).src));
    expect(new Set(srcs).size).toBe(6);
  });
  test('KNOWN BUG: sort price low to high works', async ({ inventory }) => {
    test.fail(); // site bug: remove this line when fixed
    await inventory.sortBy('lohi');
    const p = await inventory.prices();
    expect(p).toEqual([...p].sort((a, b) => a - b));
  });
  test('can add two items to the cart', async ({ page, inventory }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(inventory.cartBadge).toHaveText('2');
  });
  test('KNOWN BUG: add then remove empties the cart badge', async ({ page, inventory }) => {
    test.fail(); // site bug: remove this line when fixed
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await expect(inventory.cartBadge).toHaveCount(0);
  });
  test('KNOWN BUG: checkout accepts a last name', async ({ page, inventory, checkout }) => {
    test.fail(); // site bug: remove this line when fixed
    await inventory.addFirstItem();
    await inventory.openCart();
    await checkout.startCheckout();
    await checkout.fillInfo('Test', 'User', '12345');
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('[data-test="lastName"]')).toHaveCount(0);
  });
});

test.describe('performance_glitch_user', () => {
  test('login succeeds, though slowly', async ({ loginPage, inventory }) => {
    await loginPage.login('performance_glitch_user');
    await expect(inventory.items).toHaveCount(6, { timeout: 15000 });
  });
  test('KNOWN BUG: products appear within 2 seconds of login', async ({ loginPage, inventory }) => {
    test.fail(); // site bug: remove this line when fixed
    const t = Date.now();
    await loginPage.login('performance_glitch_user');
    await expect(inventory.items).toHaveCount(6, { timeout: 15000 });
    expect(Date.now() - t).toBeLessThan(2000);
  });
});

test.describe('error_user', () => {
  test.beforeEach(async ({ loginPage }) => { await loginPage.login('error_user'); });
  test('KNOWN BUG: can remove an item from the cart', async ({ page, inventory }) => {
    test.fail(); // site bug: remove this line when fixed
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(inventory.cartBadge).toHaveCount(0);
  });
  test('KNOWN BUG: can complete checkout', async ({ inventory, checkout }) => {
    test.fail(); // site bug: remove this line when fixed
    await inventory.addFirstItem();
    await inventory.openCart();
    await checkout.startCheckout();
    await checkout.fillInfo('Test', 'User', '12345');
    await checkout.finish();
    await expect(checkout.confirmation).toHaveText('Thank you for your order!');
  });
});
