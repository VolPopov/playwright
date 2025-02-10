import { test, expect } from '@playwright/test';
import {
  HEADINGS,
  URLS,
  generateUserCredentials,
  utils,
  VALID_LOGIN_PAYLOAD,
  ERRORS,
  INVALID_EMAIL_FORMAT,
  INVALID_SHORT_PASSWORD,
  INVALID_LONG_PASSWORD,
} from '../../../fixtures';
import { RegisterPage } from '../../../pom/modules/ui/registerPage';

test.describe('register a user', () => {
  let registerPage;
  const { username, email, password } = generateUserCredentials(5);

  test.beforeEach('visit the register page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER']);
  });

  test('attempt to register with an aleady existing user email', async ({
    page,
  }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(
      'RandomUserName',
      VALID_LOGIN_PAYLOAD['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator('p')).toHaveText(ERRORS['TAKEN_MAIL']);
  });

  test('attempt to register user with an invalid email format', async ({
    page,
  }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(username, INVALID_EMAIL_FORMAT['EMAIL'], password);

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator('p')).toHaveText(ERRORS['INVALID_MAIL']);
  });

  test('attempt to register user without a username', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register('', email, password);

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator('p')).toHaveText(ERRORS['NO_USERNAME']);
  });

  test('attempt to register user with a password shorter than 6 characters', async ({
    page,
  }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(username, email, INVALID_SHORT_PASSWORD['PASSWORD']);

    await expect(page).toHaveURL(URLS['REGISTER']);
    await expect(page.locator('p')).toHaveText(ERRORS['SHORT_PASSWORD']);
  });

  test('attempt to register a user with a password longer than 100 characters', async ({
    page,
  }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    await registerPage.register(
      username,
      email,
      INVALID_LONG_PASSWORD['PASSWORD']
    );

    await expect(page).toHaveURL(URLS['REGISTER']);
  });

  test('register with valid data', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    registerPage.register(username, email, password);

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
