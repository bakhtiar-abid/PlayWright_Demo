import {expect, test} from "@playwright/test";

test("Runs after all tests", async ({page, baseURL}) => {
    await page.context().clearCookies();
    await page.context().storageState({path: 'storageState.json'});
});