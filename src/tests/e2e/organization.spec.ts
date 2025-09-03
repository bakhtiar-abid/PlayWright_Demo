import {expect, test} from "@playwright/test";

test.describe('Organization Tests', () => {
    test('Verify that organization information are displayed properly', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await page.getByRole('button', {name: ''}).click();
        await page.getByText('Manage company').click();
        await page.getByRole('button', {name: ''}).click();

        await expect(page.getByRole('heading', {name: 'Settings'})).toBeVisible();
        await expect(page.getByRole('menuitem', {name: 'Organisation'})).toBeVisible();
        await expect(page.getByRole('menuitem', {name: 'Employee'})).toBeVisible();
        await expect(page.getByRole('menuitem', {name: 'Vehicle'})).toBeVisible();
        await expect(page.getByRole('menuitem', {name: 'Notifications'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'SHARE FOOD'})).toBeVisible();
        await expect(page.getByText('929151577')).toBeVisible();
    });
});
