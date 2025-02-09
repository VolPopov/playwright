import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, generateUserCredentials } from '../../../fixtures';
import { RegisterAPI } from '../../../pom/modules/api/registerAPI';

test.describe('negative register API tests', () => {
  let registerAPI;
  const {email, password} = generateUserCredentials(5);

  test.beforeEach('visit register page', ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test('attempt to register user without a username', async ({ page }) => {
    const response = await registerAPI.register("", email, password);    
    expect(response.message).toBe('The username field is required.');
  });
});
