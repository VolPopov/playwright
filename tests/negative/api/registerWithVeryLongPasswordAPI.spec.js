import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, INVALID_LONG_PASSWORD, generateUserCredentials } from '../../../fixtures';
import { RegisterAPI } from '../../../pom/modules/api/registerAPI';

test.describe('negative register API tests', () => {
  let registerAPI;
  const {username, email} = generateUserCredentials(5);

  test.beforeEach('visit register page', ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test('attempt to register a user with a password longer than 100 characters', async ({ page }) => {
    const response = await registerAPI.register(username, email, INVALID_LONG_PASSWORD["PASSWORD"]);    
    expect(response.message).toBe('The password field must not be longer than 100 characters.');
  });
});
