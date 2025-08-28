import {test, expect} from "@playwright/test";

test.describe("Login page Tests", () => {
    test("Verify that login page is successfully loaded", async ({page}) => {
            await page.goto("https://test.busnetwork.net/");
            await expect(page.getByRole('button', {name: 'flag'})).toBeVisible();
            await expect(page.getByRole('button', {name: 'Help '})).toBeVisible();
            await expect(page.locator('div').filter({hasText: /^BusNetwork$/})).toBeVisible();
            await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
            await expect(page.getByText('Email address')).toBeVisible();
            await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toBeVisible();
            await expect(page.getByText('Password', {exact: true})).toBeVisible();
            await expect(page.getByRole('textbox', {name: 'Password'})).toBeVisible();
            await expect(page.getByText('Forgot your password?')).toBeVisible();
            await expect(page.getByRole('button', {name: 'Sign in '})).toBeVisible();
        }
    );

    test("Verify that user is able to insert user name and password", async ({page })=>{
        await page.goto('https://test.busnetwork.net/auth/signin');
        await expect(page.getByRole('textbox', { name: 'Enter your email address' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Enter your email address' }).click();
        await page.getByRole('textbox', { name: 'Enter your email address' }).fill('share_food@yopmail.com');
        await expect(page.getByRole('textbox', { name: 'Enter your email address' })).toHaveValue('share_food@yopmail.com');
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('Pass@1234');
        await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('Pass@1234');
        await page.getByRole('button', { name: 'Sign in ' }).click();
        await page.goto('https://test.busnetwork.net/request-trip?organization=');
    })
});