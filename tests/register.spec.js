import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, generateUserCredentials, utils } from '../fixtures';

test.describe('register a user', () => {
  const { username, email, password } = generateUserCredentials(5);
  test.beforeEach('visit the register page', async ({ page }) => {
    await page.goto(URLS['REGISTER']);
  });

  test('register with valid data', async ({ page }) => {
    const heading = page.locator('h1');
    await heading.waitFor();
    await expect(heading).toHaveText(HEADINGS['REGISTER']);

    // fill in the form
    utils.fillAndSubmitForm(page, 'input', [username, email, password]);

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
