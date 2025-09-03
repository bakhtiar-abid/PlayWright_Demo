import {expect, test} from "@playwright/test";

test.describe('Employee Tests', () => {
    test('Verify that employee information are displayed properly', async ({page, baseURL}) => {
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

        await page.getByRole('menuitem', {name: 'Employee'}).click();
        await expect(page.getByRole('heading', {name: 'Employee'})).toBeVisible();
        await expect(page.getByText('See, edit or create new users')).toBeVisible();
        await expect(page.getByRole('button', {name: ' Add employee'})).toBeVisible();
        await expect(page.locator('#app')).toContainText('Add employee');
        await expect(page.getByRole('columnheader', {name: 'Name'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Email address'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Phone'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Type'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Appless'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Status'}).locator('span')).toBeVisible();
        await expect(page.getByRole('columnheader', {name: 'Action'}).locator('span')).toBeVisible();
        await expect(page.getByRole('button', {name: ' Edit'})).toBeVisible();
    });

    test('Verify that user is able to add new employee successfully', async ({page, baseURL}) => {
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
        await page.getByRole('menuitem', {name: 'Employee'}).click();
        await expect(page.getByRole('heading', {name: 'Employee'})).toBeVisible();

        await page.getByRole('button', {name: ' Add employee'}).click();
        await expect(page.getByRole('dialog')).toMatchAriaSnapshot({name: 'add_employee_dialog.aria.yml'});
        await page.getByRole('button', {name: 'Cancel'}).click();
        await page.getByRole('button', {name: ' Add employee'}).click();
        await page.getByRole('button', {name: 'Close', exact: true}).click();
    });

    test('Verify that user is able to edit new employee successfully', async ({page, baseURL}) => {
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
        await page.getByRole('menuitem', {name: 'Employee'}).click();
        await expect(page.getByRole('heading', {name: 'Employee'})).toBeVisible();
        await page.getByRole('button', {name: ' Edit'}).first().click();
        await page.getByRole('button', {name: 'Cancel'}).click();
        await page.getByRole('button', {name: ' Edit'}).first().click();
        await page.getByRole('button', {name: 'Close', exact: true}).click();
        await page.getByRole('button', {name: ' Edit'}).first().click();
        await expect(page.getByRole('button', {name: 'Close', exact: true})).toBeVisible();

        await page.getByRole('button', {name: 'Edit employee'}).click();
        await expect(page.getByRole('alert')).toContainText('User updated successfully');
    });

    test('Verify that user is able to view and add vehicle successfully', async ({page, baseURL}) => {
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

        await page.getByRole('menuitem', {name: 'Vehicle'}).click();
        await expect(page.getByRole('menuitem', {name: 'Vehicle'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Vehicles'})).toBeVisible();
        await expect(page.getByText('See, edit or create new')).toBeVisible();
        await expect(page.getByRole('button', {name: ' Add vehicle'})).toBeVisible();
        await expect(page.getByText('Name')).toBeVisible();
        await expect(page.getByText('Registration number')).toBeVisible();
        await expect(page.getByText('Seat capacity')).toBeVisible();
        await expect(page.getByText('Action')).toBeVisible();
        await page.getByRole('button', {name: ' Add vehicle'}).click();
        await expect(page.getByRole('dialog')).toMatchAriaSnapshot({name: 'add_vehicle_dialog.aria.yml'});
        await page.getByRole('button', {name: 'Close', exact: true}).click();
        await page.getByRole('button', {name: ' Add vehicle'}).click();
        await expect(page.getByRole('button', {name: 'Close', exact: true})).toBeVisible();
        await page.getByRole('button', {name: 'Cancel'}).click();
    });

    test('Verify that user is able to view and update notification successfully', async ({page, baseURL}) => {
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
        await page.getByRole('menuitem', {name: 'Notifications'}).click();
        await expect(page.getByRole('heading', {name: 'Notifications'})).toBeVisible();
        await expect(page.getByText('Customise your email')).toBeVisible();
        await expect(page.getByRole('heading', {name: 'New network trip request'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Subcontractor trip update'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Price change'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Network trip is deleted or'})).toBeVisible();
        await page.locator('div').filter({hasText: /^New network trip requestOn$/}).locator('span').click();
        await page.locator('div').filter({hasText: /^Off$/}).locator('span').click();
        await page.locator('div').filter({hasText: /^Subcontractor trip updateOn$/}).locator('span').click();
        await page.locator('div').filter({hasText: /^Off$/}).locator('span').click();
        await page.locator('div').filter({hasText: /^Price changeOn$/}).locator('span').click();
        await page.locator('div').filter({hasText: /^Off$/}).locator('span').click();
        await page.locator('div').filter({hasText: /^Network trip is deleted or cancelledOn$/}).locator('span').click();
        await page.locator('div').filter({hasText: /^Off$/}).locator('span').click();
        await expect(page.getByRole('button', {name: 'Update'})).toBeVisible();
        await page.getByRole('button', {name: 'Update'}).click();
        await expect(page.getByRole('alert')).toContainText('Notification settings updated successfully');
    });
});