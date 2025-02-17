import { test, expect } from '@playwright/test';
import { LoginAPI } from '../../../pom/modules/api/loginAPI';
import { Dashboard } from '../../../pom/modules/api/dashboardAPI';
import { VALID_LOGIN_PAYLOAD } from '../../../fixtures';

test.describe("Dashboard tests", () => {
  let loginAPI;
  let dashboard;
  let bearerToken;

  test.beforeEach("Log in", async ({ page }) => {
    loginAPI = new LoginAPI(page);
    const response = await loginAPI.login(
        VALID_LOGIN_PAYLOAD['EMAIL'],
        VALID_LOGIN_PAYLOAD['PASSWORD']
      );
      expect(response.status).toBe('Success');
      expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD['EMAIL']);
      bearerToken = response.auth.token;
      
  });

  test("Attempt to add item to cart that is out of stock", async ({ page }) => {
    dashboard = new Dashboard(page);
    const cartID = 119;
    const itemID = 1;
    const response = await dashboard.addItemToCart(cartID, itemID, bearerToken);
    expect(response.status).toBe("Error");
    expect(response.message).toBe("Sorry, this product is currently not in stock.");
  });

  test("Attempt to remove item that isn't in the cart", async ({ page }) => {
    dashboard = new Dashboard(page);
    const cartID = 119;
    const itemID = 4;
    const response = await dashboard.deleteItemFromCart(cartID, itemID, bearerToken);
    expect(response.status).toBe("Error");
    expect(response.message).toBe("No product found.");
  });

  test("Add an item to cart", async ({ page }) => {
    dashboard = new Dashboard(page);
    let itemExists = false;
    const cartID = 119;
    const itemID = 9;
    const response = await dashboard.addItemToCart(cartID, itemID, bearerToken);
    expect(response.status).toBe("Success");
    expect(response.message).toBe("Product successfully added to cart");
    const allItems = await dashboard.getAllItemsInCart(cartID, bearerToken);
    let cartLength = Object.keys(allItems.cart).length;
    for (let i = 0; i < cartLength; i++) {
       if (allItems.cart[i].id == itemID) {
          itemExists = true;
       }
    }
     expect(itemExists).toBe(true);
  });

  test("Remove item from cart", async ({ page }) => {
    dashboard = new Dashboard(page);
    const cartID = 119;
    const itemID = 9;
    const response = await dashboard.deleteItemFromCart(cartID, itemID, bearerToken);
    expect(response.status).toBe("Success");
    expect(response.message).toBe("Product removed from cart.");
  });

});
