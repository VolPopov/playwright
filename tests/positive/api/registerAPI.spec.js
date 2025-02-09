import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD, generateUserCredentials } from '../../../fixtures';
import { RegisterAPI } from '../../../pom/modules/api/registerAPI';

test.describe('register API tests', () => {
  let registerAPI;
  const {username, email, password} = generateUserCredentials(5);

  test.beforeEach('visit register page', ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test('register via BE', async ({ page }) => {
    const response = await registerAPI.register(username, email, password);
    
    expect(response.status).toBe('Success');
    expect(response.user.username).toBe(username);
    expect(response.user.email).toBe(email);
  });
});
