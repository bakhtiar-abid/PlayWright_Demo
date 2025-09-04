import {expect, test} from "@playwright/test";

test.describe("Dashboard page Tests", () => {
    test("Verify that dashboard is displayed properly", async ({page, baseURL}) => {
        await page.goto(baseURL);
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await page.waitForTimeout(10_000)

        await expect(page.locator('#guide_button').getByRole('button')).toBeVisible();
        await expect(page.getByRole('button', {name: ''})).toBeVisible();
        await expect(page.getByRole('button', {name: 'SF'})).toBeVisible();

        await expect(page.getByText('Powered by')).toBeVisible();
        await expect(page.getByRole('img', {name: 'Ferdia'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Download Ferdia BusNetwork'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Contact us'})).toBeVisible();
        await page.getByRole('link', {name: 'Download Ferdia BusNetwork'}).click();
        await expect(page.getByText('Get it on your preferred')).toBeVisible();

        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', {name: ''}).click();
        const page1 = await page1Promise;
        await page1.close()

        const page2Promise = page.waitForEvent('popup');
        await page.getByRole('link', {name: ''}).click();
        const page2 = await page2Promise;
        await page2.close()

        const page3Promise = page.waitForEvent('popup');
        await page.getByRole('link', {name: 'Contact us'}).click();
        const page3 = await page3Promise;
        await page3.close()
    })

    test("Verify that user information is displayed properly", async ({page, baseURL}) => {
        await page.goto(baseURL);
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await page.waitForTimeout(10_000)
        await page.pause();

        await page.getByRole('button', {name: 'SF'}).click();
        await page.locator('#overlay_menu img').click();
        await expect(page.locator('#overlay_menu img')).toBeVisible();
        await expect(page.getByText('Share Food')).toBeVisible();
        await expect(page.getByText('Master admin')).toBeVisible();
        await expect(page.getByText(process.env.USER_EMAIL)).toBeVisible();
        await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
        await expect(page.getByText(/Software Version: V\d+.\d+.\d+/)).toBeVisible();
    });
})