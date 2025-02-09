import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, generateUserCredentials, utils } from '../../../fixtures';
import { RegisterPage } from '../../../pom/modules/ui/registerPage';

test.describe('incorrect register tests', () => {
  let registerPage;
  const {email, password} = generateUserCredentials(5);

  test.beforeEach('visit the register page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER']);
  });

  test('attempt to register user without a username', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register("", email, password);

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator("p")).toHaveText("The username field is required.");
  });
});
