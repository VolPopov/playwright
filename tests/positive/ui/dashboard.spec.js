import { test, expect } from '@playwright/test';
import { URLS } from '../../../fixtures';
import { Dashboard } from '../../../pom/modules/ui/dashboard';
import { Header } from '../../../pom/modules/ui/header';
import { LoginPage } from '../../../pom/modules/ui/loginPage';
import { VALID_LOGIN_PAYLOAD } from '../../../fixtures';
import { log } from 'node:console';

test.describe('dashboard tests', () => {
  let dashboard;
  let header;
  let loginPage;

  test.beforeEach('visit the dashboard page', async ({ page }) => {
    dashboard = new Dashboard(page);
    header = new Header(page);
    loginPage = new LoginPage(page);
    await page.goto(URLS['LOGIN']);

    await loginPage.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
    await expect(dashboard.searchBar).toBeEditable();
  });

  test('Add a product to the cart', async ({page}) => {
    let broj = 8;
    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    const ime = (await page.textContent('[test-data="product-container"] >> h1 >> nth='+ broj, {strict: true}));
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(ime);
  });

  test("Delete all products from cart", async({page}) => {
    let broj = 6;
    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    await expect(dashboard.clearButton).toBeVisible();
    await dashboard.deleteAllItemsFromCart();
    await page.locator("div[class='z-10 text-3xl font-semibold sm:mt-12 md:mt-12 lg:mt-16']").waitFor();
    await expect(page.locator("div[class='z-10 text-3xl font-semibold sm:mt-12 md:mt-12 lg:mt-16']")).toHaveText("No items in cart. Add some!");
  });

  test("Delete one item from cart", async({page})=> {
    let broj = 7;
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    await expect(dashboard.itemsInCart.nth(0)).toBeVisible();
    const numberOfProductsInCart = await dashboard.itemsInCart.count();
    const ime = (await page.textContent('[test-data="product-container"] >> h1 >> nth='+ broj, {strict: true}));
    for (let i = 0; i< numberOfProductsInCart; i++) {
      const currentDiv = await dashboard.itemsInCart.nth(i);
      if (await expect(dashboard.itemsInCart.nth(i)).toContainText(ime))
        await (dashboard.itemsInCart.nth(i)).locator("button").nth(0).click();
    }
  });
});
