import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD } from '../fixtures';
import { LoginPage } from '../pom/modules/ui/loginPage';

test.describe('login tests', () => {
  let loginPage;

  test.beforeEach('visit the login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(URLS['LOGIN']);
  });

  test('log in with registered user', async ({ page }) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS['LOGIN']);

    loginPage.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
