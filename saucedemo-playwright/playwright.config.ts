import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'https://www.saucedemo.com', trace: 'on-first-retry', screenshot: 'only-on-failure' },
});
