import { test, expect, Page, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainDashboardPage } from '../pages/MainDashboardPage';

let page: Page;
let context;


const email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const Baseurl =


  test.describe.serial('Change Password', () => {

    test.beforeAll(async ({ browser }) => {

      browser = await chromium.launch({ headless: false });
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
