import { test, expect } from './fixtures';
test('valid user can log in and see products', async ({ page, loginPage, inventory }) => {
  await loginPage.login();
  await expect(page).toHaveURL(/inventory/);
  await expect(inventory.items).toHaveCount(6);
});
test('locked-out user sees an error', async ({ loginPage }) => {
  await loginPage.login('locked_out_user');
  await expect(loginPage.error).toContainText('locked out');
});
test('wrong password shows an error', async ({ loginPage }) => {
  await loginPage.login('standard_user', 'nope');
  await expect(loginPage.error).toContainText('do not match');
});
