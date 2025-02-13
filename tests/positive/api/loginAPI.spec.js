import { test, expect } from '@playwright/test';
import {
  VALID_LOGIN_PAYLOAD,
  INVALID_EMAIL_ADDRESS,
  INCORRECT_PASSWORD,
  ERRORS,
} from '../../../fixtures';
import { LoginAPI } from '../../../pom/modules/api/loginAPI';

test.describe('login API tests', () => {
  let loginAPI;

  test.beforeEach('visit the login page', ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test('attempt to log in with an incorrect email API', async ({}) => {
    const response = await loginAPI.login(
      INVALID_EMAIL_ADDRESS['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );
    expect(response.error).toBe(ERRORS['UNAUTHORIZED']);
  });

  test('attempt to log in with an incorrect password API', async ({}) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      INCORRECT_PASSWORD['PASSWORD']
    );
    expect(response.error).toBe(ERRORS['UNAUTHORIZED']);
  });

  test('login via BE', async ({}) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );
    expect(response.status).toBe('Success');
    expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD['EMAIL']);
  });
});
