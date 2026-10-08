import { test, expect } from './fixtures';
test.beforeEach(async ({ loginPage }) => { await loginPage.login(); });
test('sort name A to Z', async ({ inventory }) => {
  await inventory.sortBy('az');
  const n = await inventory.names();
  expect(n).toEqual([...n].sort());
});
test('sort name Z to A', async ({ inventory }) => {
  await inventory.sortBy('za');
  const n = await inventory.names();
  expect(n).toEqual([...n].sort().reverse());
});
test('sort price low to high', async ({ inventory }) => {
  await inventory.sortBy('lohi');
  const p = await inventory.prices();
  expect(p).toEqual([...p].sort((a, b) => a - b));
});
test('sort price high to low', async ({ inventory }) => {
  await inventory.sortBy('hilo');
  const p = await inventory.prices();
  expect(p).toEqual([...p].sort((a, b) => b - a));
});
