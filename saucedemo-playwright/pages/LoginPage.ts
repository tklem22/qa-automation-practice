import { Page, expect } from '@playwright/test';
export class LoginPage {
  constructor(private page: Page) {}
  async goto() { await this.page.goto('/'); }
  async login(user = 'standard_user', pass = 'secret_sauce') {
    await this.goto();
    await this.page.getByPlaceholder('Username').fill(user);
    await this.page.getByPlaceholder('Password').fill(pass);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  get error() { return this.page.locator('[data-test="error"]'); }
}
