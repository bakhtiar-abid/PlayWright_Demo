import {expect, test} from "@playwright/test";
import {csvData} from "../../../playwright.config";


test.describe("Parameterized Tests", () => {
    csvData.forEach((data, i) => {
        test(`Scenario ${i}: Login with different credentials ${data}`, async ({page, baseURL}) => {
            await page.goto(baseURL);
            await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
            await page.getByRole('textbox', {name: 'Enter your email address'}).click();
            await page.getByRole('textbox', {name: 'Enter your email address'}).fill(data["user"]);
            await page.getByRole('textbox', {name: 'Password'}).click();
            await page.getByRole('textbox', {name: 'Password'}).fill(data["password"]);
            await page.getByRole('button', {name: 'Sign in '}).click();
            if (data["status"] === "passed") {
                await page.waitForTimeout(5_000);
                await page.locator("#userDropdown").click();
                await expect(page.locator("//span[@class='extended-light-green-bg rounded px-2 fw-bold']")).toContainText(data["expected"]);
            } else {
                await expect(page.locator("//p[@class='text-center fw-bold text-danger p-3']")).toContainText(data["expected"]);
            }
        });
    });
});