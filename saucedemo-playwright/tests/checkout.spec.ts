import { test, expect } from './fixtures';
test('complete a purchase end to end', async ({ loginPage, inventory, checkout }) => {
  await loginPage.login();
  await inventory.addFirstItem();
  await inventory.openCart();
  await checkout.startCheckout();
  await checkout.fillInfo('Test', 'User', '12345');
  await checkout.finish();
  await expect(checkout.confirmation).toHaveText('Thank you for your order!');
});
test('checkout requires a first name', async ({ loginPage, inventory, checkout }) => {
  await loginPage.login();
  await inventory.addFirstItem();
  await inventory.openCart();
  await checkout.startCheckout();
  await checkout.fillInfo('', 'User', '12345');
  await expect(checkout.error).toContainText('First Name is required');
});
