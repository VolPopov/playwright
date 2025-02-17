import { test, expect } from '@playwright/test';
import { SUCCESS, URLS } from '../../../fixtures';
import { Dashboard } from '../../../pom/modules/ui/dashboard';
import { Header } from '../../../pom/modules/ui/header';
import { LoginPage } from '../../../pom/modules/ui/loginPage';
import { VALID_LOGIN_PAYLOAD } from '../../../fixtures';

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

  test('Add a product to the cart', async ({ page }) => {
    let broj = 8;
    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    const ime = (await page.textContent('[test-data="product-container"] >> h1 >> nth='+ broj, { strict: true }));
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(ime);
  });

  test("Delete all products from cart", async({ page }) => {
    let broj = 14;
    let cartID = 119;
    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    await expect(dashboard.clearButton).toBeVisible();
    await dashboard.deleteAllItemsFromCart();
    const responsePromise = await page.waitForResponse(`/api/v1/cart/${cartID}`);
    const response = await responsePromise;
    const responseBody = await response.json();
    expect(responseBody.status).toBe(SUCCESS["API_SUCCESS"]);
    expect(responseBody.cart).toStrictEqual([]);
    await expect(page.locator("div[class='z-10 text-3xl font-semibold sm:mt-12 md:mt-12 lg:mt-16']")).toHaveText("No items in cart. Add some!");
  });
});

