import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, INVALID_SHORT_PASSWORD,generateUserCredentials, utils } from '../../../fixtures';
import { RegisterPage } from '../../../pom/modules/ui/registerPage';

test.describe('incorrect register tests', () => {
  let registerPage;
  const {username, email} = generateUserCredentials(5);

  test.beforeEach('visit the register page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER']);
  });

  test('attempt to register user with a password shorter than 6 characters', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(username, email, INVALID_SHORT_PASSWORD["PASSWORD"]);

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator("p")).toHaveText("The password field must be at least 6 characters.");
  });
});
