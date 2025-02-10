import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, INVALID_EMAIL_FORMAT,generateUserCredentials, utils, ERRORS } from '../../../fixtures';
import { RegisterPage } from '../../../pom/modules/ui/registerPage';

test.describe('incorrect register tests', () => {
  let registerPage;
  const {username, password} = generateUserCredentials(5);

  test.beforeEach('visit the register page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER']);
  });

  test('attempt to register user with an invalid email format', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(username, INVALID_EMAIL_FORMAT["EMAIL"], password);

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator("p")).toHaveText(ERRORS["INVALID_MAIL"]);
  });
});
