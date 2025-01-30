const { test, expect } = require('@playwright/test');
const heading = 'AQA eShop';
const loginHeading = 'Welcome Back! 👋🏻';

test.describe('CSS selectors', () => {
  test('get by - full expression', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator("span[class='text-5xl font-bold']")
    ).toBeVisible();

    await expect(page.locator("span[class='text-5xl font-bold']")).toHaveText(
      heading
    );
  });

  test('get by - specific class', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.text-5xl')).toBeVisible();
    await expect(page.locator('.text-5xl')).toHaveText(heading);
  });

  test('get by - order', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('span').first()).toBeVisible();
    await expect(page.locator('span').first()).toHaveText(heading);
  });

  test('get by - relation', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.locator(
        "div[class='col-12 md:t-4 sm:t-2 md:col-6 p-6'] > section > span"
      )
    ).toBeVisible();

    await expect(
      page.locator(
        "div[class='col-12 md:t-4 sm:t-2 md:col-6 p-6'] > section > span"
      )
    ).toHaveText(heading);
  });
});

test.describe('built-in selectors', () => {
  test('get by-text', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(heading)).toBeVisible();
  });

  test('get by-role', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page.locator('h1')).toHaveText(loginHeading);
  });

  test('get by_placeholder', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
  });

  test('get by-label', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByLabel('Sign in')).toBeVisible();
  });
});
