export class Footer {
    constructor(page) {
        this.page = page;
        this.linkedin = page.locator(".pi-linkedin");
        this.google = page.locator(".pi-google");
        this.instagram = page.locator(".pi-instagram");
        this.facebook = page.locator(".pi-facebook");
        this.copyright = page.locator("span[class='sm:text-sm md:text-sm lg:text-lg xl:text-lg']");
    }
}