export class Dashboard {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator('#search');
    this.filterList = page.locator('.layout-root-menuitem > ul');
    this.products = page.locator('[test-data="product-container"]');
    this.addToCartButton = this.products.locator('button');
    this.productName = this.products.locator('h1');
    this.cartMenu = page.locator(
      "section[class='flex-1 overflow-y-auto px-2 py-2']"
    );
    this.textOfItem = this.cartMenu.locator(
      "[class='flex-1 overflow-y-auto px-2 py-2'] > div"
    );
  }

  async addAnItemToCart(broj) {
    await this.addToCartButton.nth(broj).click();
  }
}
