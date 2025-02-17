import { test, expect } from '@playwright/test';
import { LoginAPI } from '../../../pom/modules/api/loginAPI';
import { Dashboard } from '../../../pom/modules/api/dashboardAPI';
import { ERRORS, SUCCESS, VALID_LOGIN_PAYLOAD } from '../../../fixtures';

test.describe("Dashboard tests", () => {
  let loginAPI;
  let dashboard;
  let bearerToken;

  test.beforeEach("Log in", async ({ page }) => {
    loginAPI = new LoginAPI(page);
    dashboard = new Dashboard(page);
    const response = await loginAPI.login(
        VALID_LOGIN_PAYLOAD['EMAIL'],
        VALID_LOGIN_PAYLOAD['PASSWORD']
      );
      expect(response.status).toBe(SUCCESS["API_SUCCESS"]);
      expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD['EMAIL']);
      bearerToken = response.auth.token;
      
  });

  test("Attempt to add item to cart that is out of stock", async ({}) => {
    const cartID = 119;
    const itemID = 1;
    const response = await dashboard.addItemToCart(cartID, itemID, bearerToken);
    expect(response.status).toBe(ERRORS["API_ERROR"]);
    expect(response.message).toBe(ERRORS["API_NOT_IN_STOCK"]);
  });

  test("Attempt to remove item that isn't in the cart", async ({}) => {
    const cartID = 119;
    const itemID = 4;
    const response = await dashboard.deleteItemFromCart(cartID, itemID, bearerToken);
    expect(response.status).toBe(ERRORS['API_ERROR']);
    expect(response.message).toBe(ERRORS["API_NO_PRODUCT_FOUND"]);
  });

  test("Add an item to cart", async ({}) => {
    const cartID = 119;
    const itemID = 14;
    const response = await dashboard.addItemToCart(cartID, itemID, bearerToken);
    expect(response.status).toBe(SUCCESS["API_SUCCESS"]);
    expect(response.message).toBe(SUCCESS["API_PRODUCT_ADDED_TO_CART"]);
    const allItems = await dashboard.getAllItemsInCart(cartID, bearerToken);
    const doesItemExist = dashboard.checkIfItemIsInCart(allItems, itemID);
    expect(doesItemExist).toBe(true);
  });

  test("Remove item from cart", async ({}) => {
    const cartID = 119;
    const itemID = 14;
    const response = await dashboard.deleteItemFromCart(cartID, itemID, bearerToken);
    expect(response.status).toBe(SUCCESS["API_SUCCESS"]);
    const successMessages = response.message == SUCCESS["API_PRODUCT_REMOVED_FROM_CART"] || response.message == SUCCESS["API_PRODUCT_QUANTITY_DECREASED"];
    expect(successMessages).toBe(true);
  });

});
