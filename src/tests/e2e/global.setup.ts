import {expect, test} from "@playwright/test";
import {Amplify, Auth} from "aws-amplify";

export const token = async (username: string, password: string) => {
    Amplify.configure({
        Auth: {
            region: "eu-west-1",
            userPoolId: "eu-west-1_4zjeomGCG",
            userPoolWebClientId: "7rh8b727r4kjsjo877q3ei9525"
        },
    });

    try {
        await Auth.signIn(username, password);
        const session = await Auth.currentSession();
        return `Bearer ${session.getAccessToken().getJwtToken()}`;
    } catch (error) {
        console.error('Error signing in: ', error);
        throw error;
    }
}

test("Runs before all tests", async ({page, baseURL, request, playwright}) => {
    await page.goto(baseURL!);
    await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
    await expect(page.getByText('Email address')).toBeVisible();
    await page.getByRole('textbox', {name: 'Enter your email address'}).click();
    await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
    await page.getByRole('textbox', {name: 'Password'}).click();
    await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
    await page.getByRole('button', {name: 'Sign in '}).click();
    await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});
    await page.context().storageState({path: 'storageState.json'});
});