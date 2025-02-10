import { test, expect } from '@playwright/test';
import { ERRORS, HEADINGS, INVALID_EMAIL_ADDRESS, URLS, utils, VALID_LOGIN_PAYLOAD } from '../../../fixtures';
import { LoginPage } from '../../../pom/modules/ui/loginPage';

test.describe('Incorrect login tests', () => {
  let loginPage;

  test.beforeEach('visit the login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(URLS['LOGIN']);
  });

  test('attempt to log in with wrong email', async ({ page }) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS['LOGIN']);

    loginPage.login(
      INVALID_EMAIL_ADDRESS['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD'],
    );

    await page.waitForURL(URLS['LOGIN']);
    await expect(page.locator("p")).toHaveText(ERRORS["WRONG_MAIL_OR_PASSWORD"])
  });
});
