import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, INVALID_SHORT_PASSWORD, generateUserCredentials, ERRORS } from '../../../fixtures';
import { RegisterAPI } from '../../../pom/modules/api/registerAPI';

test.describe('negative register API tests', () => {
  let registerAPI;
  const {username, email} = generateUserCredentials(5);

  test.beforeEach('visit register page', ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test('attempt to register a user with a password shorther than 6 characters', async ({ page }) => {
    const response = await registerAPI.register(username, email, INVALID_SHORT_PASSWORD["PASSWORD"]);    
    expect(response.message).toBe(ERRORS["SHORT_PASSWORD"]);
  });
});
