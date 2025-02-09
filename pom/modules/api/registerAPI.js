export class RegisterAPI {
    constructor(page) {
      this.page = page;
    }
  
    async register(username1, email1, password1) {
      let response = await this.page.request.post('/api/v1/auth/register', {
        data: { username: username1, email: email1, password: password1 },
        headers: { Accept: 'application/json' },
      });
  
      let responseJSON = await response.json();
      return responseJSON;
    }
  }
  