import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, generateUserCredentials, utils } from '../fixtures';
import { RegisterPage } from '../pom/modules/ui/registerPage';

test.describe('register a user', () => {
  let registerPage;
  const { username, email, password } = generateUserCredentials(5);

  test.beforeEach('visit the register page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER']);
  });

  test('register with valid data', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(username, email, password);

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
