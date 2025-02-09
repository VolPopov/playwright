import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD } from '../../../fixtures';
import { LoginAPI } from '../../../pom/modules/api/loginAPI';

test.describe('negative login API tests', () => {
  let loginAPI;

  test.beforeEach('visit login page', ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test('attempt to log in with an incorrect password', async ({ page }) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      "IncorrectPass"
    );    
    expect(response.error).toBe('Unauthorized');
  });
});
