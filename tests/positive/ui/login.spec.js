import { test, expect } from '@playwright/test';
import {
  HEADINGS,
  URLS,
  utils,
  VALID_LOGIN_PAYLOAD,
  ERRORS,
  INCORRECT_PASSWORD,
  INVALID_EMAIL_ADDRESS,
} from '../../../fixtures';
import { LoginPage } from '../../../pom/modules/ui/loginPage';
import { Footer } from '../../../pom/modules/ui/footer';
import { Header } from '../../../pom/modules/ui/header';

test.describe('login tests', () => {
  let loginPage;
  let footer;
  let header;

  test.beforeEach('visit the login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    header = new Header(page);
    footer = new Footer(page);
    await page.goto(URLS['LOGIN']);
    await expect(header.loginAndRegisterDiv).toBeVisible();
    await expect(footer.linkedin).toBeVisible();
    await expect(footer.google).toBeVisible();
    await expect(footer.instagram).toBeVisible();
    await expect(footer.facebook).toBeVisible();
    await expect(footer.copyright).toBeVisible();
  });

  test('attempt to log in with wrong email', async ({ page }) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS['LOGIN']);

    loginPage.login(
      INVALID_EMAIL_ADDRESS['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );

    await page.waitForURL(URLS['LOGIN']);
    await expect(page.locator('p')).toHaveText(
      ERRORS['WRONG_MAIL_OR_PASSWORD']
    );
  });

  test('attempt to log in with wrong password', async ({ page }) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS['LOGIN']);

    loginPage.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      INCORRECT_PASSWORD['PASSWORD']
    );

    await page.waitForURL(URLS['LOGIN']);
    await expect(page.locator('p')).toHaveText(
      ERRORS['WRONG_MAIL_OR_PASSWORD']
    );
  });

  test('expect text form to be editable', async () => {
    await expect(loginPage.emailInput).toBeEditable();
    await expect(loginPage.passwordInput).toBeEditable();
  });

  test('expect form to have 2 text inputs', async ({ page }) => {
    const inputLocators = page.locator('form >> input');
    await expect(inputLocators).toHaveCount(2);
  });

  test('expect element to have a class', async () => {
    await expect(loginPage.emailInput).toHaveClass(
      'w-full rounded p-inputtext p-component'
    );
    await expect(loginPage.passwordInput).toHaveClass(
      'w-full rounded p-inputtext p-component'
    );
  });

  test('expect element to have id', async () => {
    await expect(loginPage.emailInput).toHaveId('email');
    await expect(loginPage.passwordInput).toHaveId('password');
  });

  test('expect element to have attributes', async () => {
    await expect(loginPage.emailInput).toHaveAttribute('placeholder');
    await expect(loginPage.passwordInput).toHaveAttribute('placeholder');

    const emailPlaceholder = 'Email address';
    const passwordPlaceholder = 'Password';

    await expect(loginPage.emailInput).toHaveAttribute(
      'placeholder',
      emailPlaceholder
    );
    await expect(loginPage.passwordInput).toHaveAttribute(
      'placeholder',
      passwordPlaceholder
    );
  });

  test('expect elements to retain values when typed into', async () => {
    const emailValue = 'filip@test.com';
    const passwordValue = 'test123';
    await loginPage.emailInput.fill(emailValue);
    await expect(loginPage.emailInput).toHaveValue(emailValue);
    await loginPage.passwordInput.fill(passwordValue);
    await expect(loginPage.passwordInput).toHaveValue(passwordValue);
  });

  test('expect element to be enabled', async () => {
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test('expect element to be focused', async () => {
    await loginPage.emailInput.click();
    await expect(loginPage.emailInput).toBeFocused();
  });

  test('expect element to be empty', async () => {
    await expect(loginPage.emailInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
  });

  test('expect form with all elements to be in viewport', async ({ page }) => {
    await expect(page.locator('form')).toBeInViewport();
    await expect(page.locator('form >> input').nth(0)).toBeInViewport();
    await expect(page.locator('form >> input').nth(1)).toBeInViewport();
    await expect(page.locator('form >> button')).toBeInViewport();
  });

  test('log in with registered user', async ({ page }) => {
    footer = new Footer(page);
    header = new Header(page);
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS['LOGIN']);

    loginPage.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
    await expect(footer.linkedin).toBeVisible();
    await expect(footer.google).toBeVisible();
    await expect(footer.instagram).toBeVisible();
    await expect(footer.facebook).toBeVisible();
    await expect(footer.copyright).toBeVisible();
    await expect(header.headerAfterLogin).toBeVisible();
    await expect((header.button).nth(0)).toBeVisible();
    await expect((header.button).nth(1)).toBeVisible();
  });
});
