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
  
    this.itemsInCart = page.locator("div[class='flex align-middle w-full max-w-lg']");
    this.nameOfProduct = this.itemsInCart.locator("div");
    this.removeItemButton = this.itemsInCart.locator("button");
    this.cartUpperMenu = page.locator("section[class='h-fit w-full text-center relative']");
    this.clearButton = this.cartUpperMenu.locator("button");
    this.emptyCart = this.cartMenu.locator("div:has-text('No items in cart. Add some!')");
  }

  async addAnItemToCart(broj) {
    await this.addToCartButton.nth(broj).click();
  }

  async deleteAllItemsFromCart() {
    await this.clearButton.click();
  }
  
}
