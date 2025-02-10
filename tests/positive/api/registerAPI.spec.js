import { test, expect } from '@playwright/test';
import {
  utils,
  VALID_LOGIN_PAYLOAD,
  generateUserCredentials,
  INVALID_SHORT_PASSWORD,
  INVALID_LONG_PASSWORD,
  INVALID_EMAIL_FORMAT,
  ERRORS,
} from '../../../fixtures';
import { RegisterAPI } from '../../../pom/modules/api/registerAPI';

test.describe('register API tests', () => {
  let registerAPI;
  const { username, email, password } = generateUserCredentials(5);

  test.beforeEach('visit register page', ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test('attempt to register user with an already existing email', async ({
    page,
  }) => {
    const response = await registerAPI.register(
      'NewTestUsername',
      VALID_LOGIN_PAYLOAD['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );
    expect(response.message).toBe(ERRORS['TAKEN_MAIL']);
  });

  test('attempt to register user with an invalid email format', async ({
    page,
  }) => {
    const response = await registerAPI.register(
      username,
      INVALID_EMAIL_FORMAT['EMAIL'],
      password
    );
    expect(response.message).toBe(ERRORS['INVALID_MAIL']);
  });

  test('attempt to register user without a username', async ({ page }) => {
    const response = await registerAPI.register('', email, password);
    expect(response.message).toBe(ERRORS['NO_USERNAME']);
  });

  test('attempt to register a user with a password shorther than 6 characters', async ({
    page,
  }) => {
    const response = await registerAPI.register(
      username,
      email,
      INVALID_SHORT_PASSWORD['PASSWORD']
    );
    expect(response.message).toBe(ERRORS['SHORT_PASSWORD']);
  });

  test('attempt to register a user with a password longer than 100 characters', async ({
    page,
  }) => {
    const response = await registerAPI.register(
      username,
      email,
      INVALID_LONG_PASSWORD['PASSWORD']
    );
    expect(response.message).toBe(ERRORS['LONG_PASSWORD']);
  });

  test('register via BE', async ({ page }) => {
    const response = await registerAPI.register(username, email, password);

    expect(response.status).toBe('Success');
    expect(response.user.username).toBe(username);
    expect(response.user.email).toBe(email);
  });
});
