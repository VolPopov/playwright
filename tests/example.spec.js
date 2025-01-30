const { test, expect } = require('@playwright/test');

test.describe('selectors', () => {
  const heading = 'AQA eShop';

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
