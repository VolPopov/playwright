import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD, ERRORS, INVALID_EMAIL_ADDRESS } from '../../../fixtures';
import { LoginAPI } from '../../../pom/modules/api/loginAPI';

test.describe('negative login API tests', () => {
  let loginAPI;

  test.beforeEach('visit login page', ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test('attempt to log in with an incorrect email', async ({ page }) => {
    const response = await loginAPI.login(
      INVALID_EMAIL_ADDRESS["EMAIL"],
      VALID_LOGIN_PAYLOAD['PASSWORD'],
    );    
    expect(response.error).toBe(ERRORS["UNAUTHORIZED"]);
  });
});
