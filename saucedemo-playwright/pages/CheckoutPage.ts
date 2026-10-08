import { Page } from '@playwright/test';
export class CheckoutPage {
  constructor(private page: Page) {}
  async startCheckout() { await this.page.locator('[data-test="checkout"]').click(); }
  async fillInfo(first: string, last: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(first);
    await this.page.locator('[data-test="lastName"]').fill(last);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }
  async finish() { await this.page.locator('[data-test="finish"]').click(); }
  get confirmation() { return this.page.locator('[data-test="complete-header"]'); }
  get error() { return this.page.locator('[data-test="error"]'); }
}
