import {expect, test} from "@playwright/test";

test.describe("Login page Tests", () => {
    test("Verify that login page is successfully loaded", async ({page, baseURL}) => {
            await page.goto(baseURL);
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
            await expect(page.getByText('Powered by')).toBeVisible();
            await expect(page.getByRole('img', {name: 'Ferdia'})).toBeVisible();
            await expect(page.getByRole('link', {name: 'Download Ferdia BusNetwork'})).toBeVisible();
            await expect(page.getByRole('link', {name: 'Contact us'})).toBeVisible();
        }
    );

    test("Verify that user is able to insert user name and password", async ({page, baseURL}) => {
        await page.goto(baseURL);
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL);
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toHaveValue(process.env.USER_EMAIL);
        await expect(page.getByRole('textbox', {name: 'Password'})).toBeVisible();
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD);
        await expect(page.getByRole('textbox', {name: 'Password'})).toHaveValue(process.env.USER_PASSWORD);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await page.goto(`${baseURL}/request-trip?organization=`);
    })


    test('Verify that forgot password page is successfully loaded', async ({page, baseURL}) => {
        await page.goto(baseURL);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Forgot your password?')).toBeVisible();
        await page.getByText('Forgot your password?').click();
        await expect(page.getByRole('heading', {name: 'Forgot your password?'})).toBeVisible();
        await page.getByText('We will send a password reset').click();
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toBeVisible();
        await expect(page.getByRole('button', {name: ' Back to sign in'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Reset password '})).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill('test@yopmail.com');
        await expect(page.getByRole('textbox', {name: 'Enter your email address'})).toHaveValue('test@yopmail.com');
        await page.getByRole('button', {name: ' Back to sign in'}).click();
        await page.getByRole('heading', {name: 'Welcome!'}).click();
    });

    test('Verify that user is able to reset password with invalid OTP', async ({page, baseURL}) => {
        await page.goto(baseURL);
        await expect(page.getByText('Forgot your password?')).toBeVisible();
        await page.getByText('Forgot your password?').click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill('test@yopmail.com');
        await page.getByRole('button', {name: 'Reset password '}).click();
        await expect(page.getByRole('heading', {name: 'Check your e-mail'})).toBeVisible();
        await expect(page.getByText('A one-time code has been sent')).toBeVisible();
        await expect(page.getByText('Type the code from the Email:')).toBeVisible();
        await expect(page.getByText('Choose password')).toBeVisible();
        await expect(page.getByText('Confirm password')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Reset password'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Back'})).toBeVisible();
        await page.locator('input[type="text"]').click();
        await page.locator('input[type="text"]').fill('123456');
        await expect(page.locator('input[type="text"]')).toHaveValue('123456');
        await page.getByRole('textbox').nth(2).click();
        await page.getByRole('textbox').nth(2).fill('Pass@1234');
        await expect(page.getByRole('textbox').nth(2)).toHaveValue('Pass@1234');
        await page.getByRole('textbox').nth(3).click();
        await page.getByRole('textbox').nth(3).fill('Pass@1234');
        await expect(page.getByRole('textbox').nth(3)).toHaveValue('Pass@1234');
        await page.getByRole('button', {name: 'Reset password'}).click();
        await expect(page.getByText('Invalid verification code')).toBeVisible();
    });
});