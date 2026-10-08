import { test, expect } from './fixtures';
test('adding an item updates the cart badge', async ({ loginPage, inventory }) => {
  await loginPage.login();
  await inventory.addFirstItem();
  await expect(inventory.cartBadge).toHaveText('1');
});
