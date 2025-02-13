import { test, expect } from '@playwright/test';
import { URLS } from '../../../fixtures';
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
    let broj = 4;

    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    console.log(await dashboard.textOfItem);
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.textOfItem).toBeVisible();
  });
});
