export class Header {
    constructor(page) {
        this. page = page;
        this.loginbutton = page.locator("#loginBtn");
        this.loginAndRegisterDiv = page.locator("div[class='mr-2']");
        this.headerAfterLogin = page.locator("div[class='flex w-32 h-12 align-items-center']");
        this.button = page.locator("div[class='flex w-32 h-12 align-items-center'] >> button");
    }
}