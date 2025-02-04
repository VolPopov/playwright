import { test, expect } from '@playwright/test';
import { generateUserCredentials, HEADINGS, URLS, utils } from '../fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('Register a user and log in', () => {
  const { username, email, password } = generateUserCredentials(7);

  test('register with valid data', async ({ page }) => {
    /* steps:
    visit register page
    fill in the form
    click on submit button
    */
    await page.goto(URLS['REGISTER']);

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText(HEADINGS['REGISTER']);

    // await page.locator('#username').fill(username);
    // await page.locator('#email').fill(email);
    // await page.locator('#password').fill(password);
    // await page.locator('button').click();
    utils.fillAndSubmitForm(page, 'input', [username, email, password]);
  });

  test('login with registered user', async ({ page }) => {
    /* steps:
    visit login page
    fill in the form
    click on submit button
    */
    await page.goto(URLS['LOGIN']);

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText(HEADINGS['LOGIN']);

    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('button').click();

    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
