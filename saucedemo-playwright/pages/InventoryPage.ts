import { Page } from '@playwright/test';
export type Sort = 'az' | 'za' | 'lohi' | 'hilo';
export class InventoryPage {
  constructor(private page: Page) {}
  get items() { return this.page.locator('.inventory_item'); }
  get cartBadge() { return this.page.locator('.shopping_cart_badge'); }
  async addFirstItem() { await this.page.getByRole('button', { name: 'Add to cart' }).first().click(); }
  async sortBy(v: Sort) { await this.page.locator('[data-test="product-sort-container"]').selectOption(v); }
  async names() { return this.page.locator('.inventory_item_name').allTextContents(); }
  async prices() {
    const t = await this.page.locator('.inventory_item_price').allTextContents();
    return t.map(s => parseFloat(s.replace('$', '')));
  }
  async openCart() { await this.page.locator('.shopping_cart_link').click(); }
}
