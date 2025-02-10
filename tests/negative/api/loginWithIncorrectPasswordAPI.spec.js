import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD, ERRORS, INCORRECT_PASSWORD } from '../../../fixtures';
import { LoginAPI } from '../../../pom/modules/api/loginAPI';

test.describe('negative login API tests', () => {
  let loginAPI;

  test.beforeEach('visit login page', ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test('attempt to log in with an incorrect password', async ({ page }) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      INCORRECT_PASSWORD["PASSWORD"],
    );    
    expect(response.error).toBe(ERRORS["UNAUTHORIZED"]);
  });
});
