import { test, expect } from '@playwright/test';
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD, generateUserCredentials, ERRORS } from '../../../fixtures';
import { RegisterAPI } from '../../../pom/modules/api/registerAPI';

test.describe('negative register API tests', () => {
  let registerAPI;

  test.beforeEach('visit register page', ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test('attempt to register user with an already existing email', async ({ page }) => {
    const response = await registerAPI.register("NewTestUsername", VALID_LOGIN_PAYLOAD["EMAIL"], VALID_LOGIN_PAYLOAD["PASSWORD"]);
    expect(response.message).toBe(ERRORS["TAKEN_MAIL"]);
  });
});
