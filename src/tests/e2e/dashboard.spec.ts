import {expect, test} from '@playwright/test';

test.describe('Dashboard Tests', () => {
    test('Verify that dashboard page is loaded successfully', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await expect(page.locator('#guide_button')).toBeVisible();
        await expect(page.locator('#guide_button').getByRole('button')).toBeVisible();
        await expect(page.locator('#settings_button')).toBeVisible();
        await expect(page.locator('#userDropdown')).toContainText(/\w+/);

        await expect(page.getByText('Powered by')).toBeVisible();
        await expect(page.getByRole('img', {name: 'Ferdia'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Download Ferdia BusNetwork'})).toBeVisible();
        await page.getByRole('link', {name: 'Download Ferdia BusNetwork'}).click();
        await expect(page.getByText('Get it on your preferred')).toBeVisible();
        await expect(page.getByRole('link', {name: ''})).toBeVisible();
        await expect(page.getByRole('link', {name: ''})).toBeVisible();

        const googlePlayPromise = page.waitForEvent('popup');
        await page.getByRole('link', {name: ''}).click();
        const googlePlay = await googlePlayPromise;
        await expect(googlePlay).toHaveURL('https://play.google.com/store/apps/details?id=app.ferdia.busnetwork_driver');
        await googlePlay.close();

        const appleStorePromise = page.waitForEvent('popup');
        await page.getByRole('link', {name: ''}).click();
        const appleStore = await appleStorePromise;
        await expect(appleStore).toHaveURL('https://apps.apple.com/app/ferdia-busnetwork-driver/id6478439271');
        await appleStore.close();

        await expect(page.getByRole('link', {name: 'Contact us'})).toBeVisible();
        const contactPromise = page.waitForEvent('popup');
        await page.getByRole('link', {name: 'Contact us'}).click();
        const contactPage = await contactPromise;
        await expect(contactPage).toHaveURL(/^https:\/\/www.zendesk.com\/help-center-closed/);
        await contactPage.close();
    });

    test('Verify that user is able to navigate all the tabs successfully', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await page.getByRole('button', {name: 'Active trips'}).click();
        await expect(page.locator('#request_trip')).toContainText('Requests');
        await expect(page.locator('#active_trip')).toContainText('Active trips');
        await expect(page.locator('#closed_trip')).toContainText('Closed trips');
        await expect(page.locator('#invoice_list')).toContainText('Invoice list');

        await page.getByRole('button', {name: 'Closed trips'}).click();
        await expect(page.locator('#request_trip')).toContainText('Requests');
        await expect(page.locator('#active_trip')).toContainText('Active trips');
        await expect(page.locator('#closed_trip')).toContainText('Closed trips');
        await expect(page.locator('#invoice_list')).toContainText('Invoice list');

        await page.getByRole('button', {name: 'Invoice list'}).click();
        await expect(page.locator('#request_trip')).toContainText('Requests');
        await expect(page.locator('#active_trip')).toContainText('Active trips');
        await expect(page.locator('#closed_trip')).toContainText('Closed trips');
        await expect(page.locator('#invoice_list')).toContainText('Invoice list');

        await page.getByRole('button', {name: 'Requests'}).click();
        await expect(page.locator('#request_trip')).toContainText(/Requests \d+/);
        await expect(page.locator('#active_trip')).toContainText('Active trips');
        await expect(page.locator('#closed_trip')).toContainText('Closed trips');
        await expect(page.locator('#invoice_list')).toContainText('Invoice list');
    });

    test('Verify that user guide is working successfully', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await expect(page.locator('#guide_button').getByRole('button')).toBeVisible();
        await page.locator('#guide_button').getByRole('button').click();
        await expect(page.getByRole('heading', {name: 'Welcome to BusNetwork!'})).toBeVisible();
        await expect(page.getByRole('img', {name: 'Guide logo'})).toBeVisible();

        await page.getByRole('button', {name: 'Start guide '}).click();
        await expect(page.getByRole('heading', {name: 'Step'})).toBeVisible();
        await expect(page.getByText('Receive, review and accept')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Next step'})).toBeVisible();

        await page.getByRole('button', {name: 'Next step'}).click();
        await expect(page.getByRole('heading', {name: 'Step'})).toBeVisible();
        await expect(page.getByText('See your active trips and')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Next step'})).toBeVisible();
        await page.getByRole('button', {name: 'Next step'}).click();

        await expect(page.getByRole('heading', {name: 'Step'})).toBeVisible();
        await page.getByText('Complete trips by making a').click();
        await expect(page.getByText('Complete trips by making a')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Next step'})).toBeVisible();
        await page.getByRole('button', {name: 'Next step'}).click();

        await expect(page.getByRole('heading', {name: 'Step'})).toBeVisible();
        await expect(page.getByText('This list contains all your')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Next step'})).toBeVisible();
        await page.getByRole('button', {name: 'Next step'}).click();

        await expect(page.getByRole('heading', {name: 'Step'})).toBeVisible();
        await expect(page.getByText('Set your preferred language')).toBeVisible();
        await expect(page.getByRole('button', {name: 'Next step'})).toBeVisible();
        await page.getByRole('button', {name: 'Next step'}).click();

        await expect(page.getByRole('heading', {name: 'Step'})).toBeVisible();
        await expect(page.getByText('Download the Ferdia')).toBeVisible();
        await expect(page.getByRole('button', {name: 'End guide'})).toBeVisible();
        await page.getByRole('button', {name: 'End guide'}).click();

        await page.locator('#guide_button').getByRole('button').click();
        await expect(page.getByRole('heading', {name: 'Welcome to BusNetwork!'})).toBeVisible();
        await expect(page.getByRole('img', {name: 'Guide logo'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Start guide '})).toBeVisible();

        await expect(page.getByRole('link', {name: 'Skip the guide for now'})).toBeVisible();
        await page.getByRole('link', {name: 'Skip the guide for now'}).click();
        await expect(page.getByRole('heading', {name: 'Step'})).toBeVisible();
        await expect(page.getByText('You can find the guide here')).toBeVisible();
        await expect(page.getByRole('button', {name: 'End guide'})).toBeVisible();
        await page.getByRole('button', {name: 'End guide'}).click();
    });

    test('Verify that applications is support different types of language', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await expect(page.locator('#settings_button')).toBeVisible();
        await page.locator('#settings_button').click();
        await expect(page.getByText('Language')).toBeVisible();
        await expect(page.getByText('Danish')).toBeVisible();
        await expect(page.getByText('English')).toBeVisible();
        await expect(page.getByText('Norwegian')).toBeVisible();
        await expect(page.getByText('Swedish')).toBeVisible();

        await page.getByText('Danish').click();
        await expect(page.getByText('Sprog')).toBeVisible();

        await page.getByText('English').click();
        await expect(page.getByText('Language')).toBeVisible();

        await page.getByText('Norwegian').click();
        await expect(page.getByText('Språk')).toBeVisible();

        await page.getByText('Swedish').click();
        await expect(page.getByText('Språk')).toBeVisible();

        await page.getByText('Danish').click();
        await expect(page.locator('div').filter({hasText: 'Administrer virksomhed'}).nth(4)).toBeVisible();

        await page.getByText('English').click();
        await expect(page.getByText('Manage company')).toBeVisible();

        await page.getByText('Norwegian').click();
        await expect(page.locator('div').filter({hasText: 'Administrer selskapet'}).nth(4)).toBeVisible();

        await page.getByText('Swedish').click();
        await expect(page.locator('div').filter({hasText: 'Förvalta företaget'}).nth(4)).toBeVisible();
        await page.locator('#settings_button').click();
    });

    test('Verify that user profile information are displayed properly', async ({page, baseURL}) => {
        await page.goto(baseURL!);
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page.getByText('Email address')).toBeVisible();
        await page.getByRole('textbox', {name: 'Enter your email address'}).click();
        await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
        await page.getByRole('textbox', {name: 'Password'}).click();
        await page.getByRole('textbox', {name: 'Password'}).fill(process.env.USER_PASSWORD!);
        await page.getByRole('button', {name: 'Sign in '}).click();
        await expect(page.getByRole('heading', {name: 'Requests'})).toBeVisible({timeout: 15_000});

        await expect(page.locator('#userDropdown')).toContainText(/\w+/);
        await page.locator('#userDropdown').click();
        await expect(page.locator('#overlay_menu img')).toBeVisible();
        await expect(page.getByText(/Master admin|Admin/)).toBeVisible();
        await expect(page.locator("//img[@src='/img/dummy.jpg']/following-sibling::div/div/p")).toBeVisible();
        await expect(page.getByText(process.env.USER_EMAIL)).toBeVisible();
        await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
        await expect(page.getByText(/Software Version: V\d+.\d+.\d+/)).toBeVisible();
        await page.locator('#userDropdown').click();
    });
});