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
    await expect(page.locator('p')).toHaveText(ERRORS['LONG_PASSWORD']);

    await registerPage.register(
      username,
      email,
      INVALID_LONG_PASSWORD['PASSWORD']
    );

    await expect(page).toHaveURL(URLS['REGISTER']);
  });

  test('expect form to be editable', async () => {
    await expect(registerPage.usernameInput).toBeEditable();
    await expect(registerPage.emailInput).toBeEditable();
    await expect(registerPage.passwordInput).toBeEditable();
  });

  test('expect form to have 3 text inputs', async ({ page }) => {
    const inputLocators = page.locator('form >> input');
    await expect(inputLocators).toHaveCount(3);
  });

  test('expect element to have a class', async () => {
    await expect(registerPage.usernameInput).toHaveClass(
      'w-full rounded p-inputtext p-component'
    );

    await expect(registerPage.emailInput).toHaveClass(
      'w-full rounded p-inputtext p-component'
    );
    await expect(registerPage.passwordInput).toHaveClass(
      'w-full rounded p-inputtext p-component'
    );
  });

  test('expect element to have id', async () => {
    await expect(registerPage.usernameInput).toHaveId('username');
    await expect(registerPage.emailInput).toHaveId('email');
    await expect(registerPage.passwordInput).toHaveId('password');
  });

  test('expect element to have attributes', async () => {
    await expect(registerPage.usernameInput).toHaveAttribute('data-pc-name');
    await expect(registerPage.emailInput).toHaveAttribute('data-pc-name');
    await expect(registerPage.passwordInput).toHaveAttribute('data-pc-name');

    const datapcname = 'inputtext';

    await expect(registerPage.usernameInput).toHaveAttribute(
      'data-pc-name',
      datapcname
    );

    await expect(registerPage.emailInput).toHaveAttribute(
      'data-pc-name',
      datapcname
    );
    await expect(registerPage.passwordInput).toHaveAttribute(
      'data-pc-name',
      datapcname
    );
  });

  test('expect elements to retain values when typed into', async () => {
    await registerPage.usernameInput.fill(username);
    await expect(registerPage.usernameInput).toHaveValue(username);
    await registerPage.emailInput.fill(email);
    await expect(registerPage.emailInput).toHaveValue(email);
    await registerPage.passwordInput.fill(password);
    await expect(registerPage.passwordInput).toHaveValue(password);
  });

  test('expect element to be enabled', async () => {
    await expect(registerPage.submitButton).toBeEnabled();
  });

  test('expect element to be focused', async () => {
    await registerPage.usernameInput.click();
    await expect(registerPage.usernameInput).toBeFocused();
    await registerPage.emailInput.click();
    await expect(registerPage.emailInput).toBeFocused();
    await registerPage.passwordInput.click();
    await expect(registerPage.passwordInput).toBeFocused();
  });

  test('expect element to be empty', async () => {
    await expect(registerPage.usernameInput).toBeEmpty();
    await expect(registerPage.emailInput).toBeEmpty();
    await expect(registerPage.passwordInput).toBeEmpty();
  });

  test('expect form with all elements to be in viewport', async ({ page }) => {
    await expect(page.locator('form')).toBeInViewport();
    await expect(page.locator('form >> input').nth(0)).toBeInViewport();
    await expect(page.locator('form >> input').nth(1)).toBeInViewport();
    await expect(page.locator('form >> input').nth(2)).toBeInViewport();

    await expect(page.locator('form >> button')).toBeInViewport();
  });

  test('register with valid data', async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS['REGISTER']);

    await registerPage.register(username, email, password);

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
