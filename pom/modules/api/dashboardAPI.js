export class Dashboard {
    constructor(page) {
      this.page = page;
    }

    async getAllItemsInCart(cartID, token) {
      let response = await this.page.request.get(`/api/v1/cart/${cartID}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
  
      let responseJSON = await response.json();
      return responseJSON;
    }

    async addItemToCart(cartID, productID, token) {
      let response = await this.page.request.post(`/api/v1/cart/${cartID}/products/${productID}`, {
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      });
  
      let responseJSON = await response.json();
      return responseJSON;
    }

    async deleteItemFromCart(cartID, productID, token) {
      let response = await this.page.request.delete(`/api/v1/cart/${cartID}/products/${productID}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}`},
      });

      let responseJSON = await response.json();
      return responseJSON;
    }
  }
  