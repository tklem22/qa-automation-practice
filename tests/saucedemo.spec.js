// @ts-check
const { test, expect } = require('@playwright/test');

/*
 * 5 QA Automation Tests against saucedemo.com
 * A public practice site built for testing — no real credentials involved.
 * Username/passwords are displayed on the login page itself.
 */

// ─── Test 1: Successful Login ───────────────────────────────────────────
// Verifies that the standard test user can log in and reach the products page.
test('successful login with standard user', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.title')).toHaveText('Products');
});

// ─── Test 2: Failed Login ───────────────────────────────────────────────
// Verifies that an invalid password shows the correct error message.
test('failed login shows error message', async ({ page }) => {
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');

  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Username and password do not match');
});

// ─── Test 3: Add Item to Cart ───────────────────────────────────────────
// Logs in, adds the first product to the cart, and checks the cart badge.
test('add an item to the cart', async ({ page }) => {
  // Log in first
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory/);

  // Add the first item
  await page.click('.inventory_item:first-child .btn_inventory');

  // Cart badge should show "1"
  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveText('1');
});

// ─── Test 4: Form Validation – Checkout Without Info ────────────────────
// Tries to proceed through checkout without filling in any fields.
// Expects a validation error requiring the first name.
test('checkout form shows validation error when empty', async ({ page }) => {
  // Log in and add an item so we can reach checkout
  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('.inventory_item:first-child .btn_inventory');

  // Go to cart → checkout
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  // Submit the form empty
  await page.click('[data-test="continue"]');

  // Should see a validation error
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('First Name is required');
});

// ─── Test 5: Page Load Check ────────────────────────────────────────────
// Confirms the login page loads with the expected title and key elements.
test('login page loads correctly', async ({ page }) => {
  await page.goto('/');

  // Page title
  await expect(page).toHaveTitle('Swag Labs');

  // Login form elements are present
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();

  // The site logo is visible
  await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
});
