import {expect, test} from "@playwright/test";


const loginData = [
    {
        "user": "share_food@yopmail.com",
        "password": "Pass@1234",
        "status": "passed",
        "expected": "Master Admin"
    },
    {
        "user": "faizulcse@yopmail.com",
        "password": "Pass@1234",
        "status": "passed",
        "expected": "Admin"
    },
    {
        "user": "invalid@yopmail.com",
        "password": "Pass@1234",
        "status": "failed",
        "expected": "Incorrect username or password."
    }
]

test.describe("Data Driven Login Tests", async () => {
    loginData.forEach((data, i) => {
        test(`Scenario-${i}: Login test with different credential`, async ({page, baseURL}) => {
            await page.goto(baseURL);
            await page.getByRole('textbox', {name: 'Enter your email address'}).click();
            await page.getByRole('textbox', {name: 'Enter your email address'}).fill(data["user"]);
            await page.getByRole('textbox', {name: 'Password'}).click();
            await page.getByRole('textbox', {name: 'Password'}).fill(data["password"]);
            await page.getByRole('button', {name: 'Sign in '}).click();

            if (data["status"] === 'passed') {
                await expect(page.locator('#userDropdown')).toBeVisible({timeout: 15_000});
                await page.locator('#userDropdown').click();
                await expect(page.getByText(data["expected"])).toBeVisible();
            }
            if (data["status"] === 'failed') {
                await expect(page.getByText(data["expected"])).toBeVisible();
            }
        });
    });
});