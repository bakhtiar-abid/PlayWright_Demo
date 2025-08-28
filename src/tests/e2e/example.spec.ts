import {expect, test} from "@playwright/test";

test.describe.configure({mode: 'parallel'});

test("Example test1", async ({page}) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    let getStartedLink = page.locator("//a[text()='Get started']");
});

test("Example test2", async ({page}) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    let getStartedLink = page.locator("//a[text()='Get started']");

});
test("Example test3", async ({page}) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    let getStartedLink = page.locator("//a[text()='Get started']");
});
test("Example test4", async ({page}) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
    let getStartedLink = page.locator("//a[text()='Get started']");

});

