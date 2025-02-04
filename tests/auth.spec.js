const { test, expect, beforeEach } = require('@playwright/test');
const { generateRandomString } = require('../fixtures/utils');

test.describe.configure({ mode: 'serial' });

test.describe('Register a user and log in', () => {
  let username = generateRandomString(8);
  let email = `${username}@gmail.com`;
  let password = 'lozinka123';

  test('register with valid data', async ({ page }) => {
    /* steps:
    visit register page
    fill in the form
    click on submit button
    */
    await page.goto('/register');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Register!');

    await page.locator('#username').fill(username);
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('button').click();
  });

  test('login with registered user', async ({ page }) => {
    /* steps:
    visit login page
    fill in the form
    click on submit button
    */
    await page.goto('/login');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('Welcome Back! 👋🏻');

    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('button').click();

    await expect(page).toHaveURL('/dashboard');
  });
});
