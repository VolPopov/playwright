import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, INVALID_EMAIL_FORMAT, generateUserCredentials, ERRORS } from '../../../fixtures';
import { RegisterAPI } from '../../../pom/modules/api/registerAPI';

test.describe('negative register API tests', () => {
  let registerAPI;
  const {username, password} = generateUserCredentials(5);

  test.beforeEach('visit register page', ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test('attempt to register user with an invalid email format', async ({ page }) => {
    const response = await registerAPI.register(username, INVALID_EMAIL_FORMAT["EMAIL"], password);
    expect(response.message).toBe(ERRORS["INVALID_MAIL"]);
  });
});
