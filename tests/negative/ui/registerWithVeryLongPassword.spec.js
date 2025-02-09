import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, INVALID_LONG_PASSWORD, generateUserCredentials, utils } from '../../../fixtures';
import { RegisterPage } from '../../../pom/modules/ui/registerPage';

test.describe('incorrect register tests', () => {
  let registerPage;
  const {username, email} = generateUserCredentials(5);

  test.beforeEach('visit the register page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER']);
  });

  test('attempt to register a user with a password longer than 100 characters', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(username, email, INVALID_LONG_PASSWORD["PASSWORD"]);

    await expect(page).toHaveURL(URLS['REGISTER']);
  });
});
