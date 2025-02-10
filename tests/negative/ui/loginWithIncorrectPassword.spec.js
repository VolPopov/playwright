import { test, expect } from '@playwright/test';
import { ERRORS, HEADINGS, INCORRECT_PASSWORD, URLS, utils, VALID_LOGIN_PAYLOAD } from '../../../fixtures';
import { LoginPage } from '../../../pom/modules/ui/loginPage';

test.describe('Incorrect login tests', () => {
  let loginPage;

  test.beforeEach('visit the login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(URLS['LOGIN']);
  });

  test('attempt to log in with wrong password', async ({ page }) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS['LOGIN']);

    loginPage.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      INCORRECT_PASSWORD["PASSWORD"],
    );

    await page.waitForURL(URLS['LOGIN']);
    await expect(page.locator("p")).toHaveText(ERRORS["WRONG_MAIL_OR_PASSWORD"])
  });
});
