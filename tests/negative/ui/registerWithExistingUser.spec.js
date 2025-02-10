import { test, expect } from '@playwright/test';
import { ERRORS, HEADINGS, URLS, VALID_LOGIN_PAYLOAD, utils } from '../../../fixtures';
import { RegisterPage } from '../../../pom/modules/ui/registerPage';

test.describe('incorrect register tests', () => {
  let registerPage;

  test.beforeEach('visit the register page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER']);
  });

  test('attempt to register with an aleady existing user email', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register("RandomUserName", VALID_LOGIN_PAYLOAD["EMAIL"], VALID_LOGIN_PAYLOAD["PASSWORD"]);

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator("p")).toHaveText(ERRORS["TAKEN_MAIL"]);
  });
});
