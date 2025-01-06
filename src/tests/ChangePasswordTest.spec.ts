import { test, expect, Page, chromium } from '@playwright/test';
import { MainDashboardPage } from '../pages/MainDashboardPage';

let page: Page;
let context;


const email = process.env.EMAIL
const password = process.env.PASSWORD


test.describe.serial('Change Password', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext({})
    page = await context.newPage()

  });




  test('Send reset link', async () => {
    const dashboardPage = new MainDashboardPage(page);

    await dashboardPage.gotoDashboardWithLogin(email, password);
    await dashboardPage.sendChangePasswordLink();
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(dashboardPage.successSendMessage).toBeVisible({ timeout: 2000 })

  });

});
