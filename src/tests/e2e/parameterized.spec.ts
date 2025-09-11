import {test} from "@playwright/test";

test.describe("Parameterized Tests", () => {

    test("Login with different credentials", async ({page, baseURL}) => {
        await page.goto(baseURL);
        await page.pause()
    });

});