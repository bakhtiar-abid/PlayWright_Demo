import {expect, test} from '@playwright/test';

test.describe('Requests Tests', () => {
    test('Verify that requests page is loaded successfully', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await expect(page.locator('#pv_id_5')).toBeVisible();
        await expect(page.getByRole('textbox', {name: 'Search'})).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'All items unselected'}).locator('div').nth(3)).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Trip ID'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Company'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Pax'})).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Trip start time'})).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Trip duration'})).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'From'})).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Via points'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'To'})).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Price (excl. VAT)'})).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Action'})).toBeVisible();
    });

    test('Verify that user is able to search trip successfully', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await expect(page.locator('#pv_id_5')).toBeVisible();
        await expect(page.getByRole('textbox', {name: 'Search'})).toBeVisible();

        await page.locator('#pv_id_5 div').click();
        await expect(page.getByRole('searchbox')).toBeVisible();

        await page.getByRole('searchbox').click();
        await page.getByRole('searchbox').fill('RANDOM TEXT');
        await expect(page.getByRole('option')).toContainText('No results found');
        await page.getByRole('searchbox').click();

        await page.getByRole('textbox', {name: 'Search'}).click();
        await page.getByRole('textbox', {name: 'Search'}).fill('BT-0234sd35-S01-N001');
        await page.getByRole('textbox', {name: 'Search'}).press('Enter');
        await expect(page.locator('#app')).toMatchAriaSnapshot(`
            - button "First Page" [disabled]
            - button "Previous Page" [disabled]
            - button "Next Page" [disabled]
            - button "Last Page" [disabled]
            - combobox "Rows per page" [disabled]
    `);
    });
});