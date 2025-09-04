import {expect, Page} from "@playwright/test";

export default class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    emailField = () => this.page.getByRole('textbox', {name: 'Enter your email address'});
    passField = () => this.page.getByRole('textbox', {name: 'Password'})
    signInBtn = () => this.page.getByRole('button', {name: 'Sign in '});
    guideBtn = () => this.page.locator('#guide_button').getByRole('button');

    async visit(url: string) {
        await this.page.goto(url)
        await expect(this.page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
    }

    async loginWithCredentials(email: string, password: string) {
        await this.emailField().click();
        await this.emailField().fill(email);
        await this.passField().click();
        await this.passField().fill(password);
        await this.signInBtn().click();
        await this.page.waitForTimeout(10_000)
    }

    async verifyLoginSuccess() {
        await expect(this.guideBtn()).toBeVisible();
    }
}