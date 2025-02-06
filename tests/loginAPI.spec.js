import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD } from '../fixtures';
import { LoginAPI } from '../pom/modules/api/loginAPI';

test.describe('login API tests', () => {
  let loginAPI;

  test.beforeEach('', ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test('login via BE', async ({ page }) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD['EMAIL'],
      VALID_LOGIN_PAYLOAD['PASSWORD']
    );
    expect(response.status).toBe('Success');
    expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD['EMAIL']);
  });
});
