import { test, expect, Page, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainDashboardPage } from '../pages/MainDashboardPage';
import { GeneralDetailsSettingsPage } from '../pages/GeneralDetailsSettingsPage';

let page: Page;
let context;


const email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const settingsUrl = '?#/settings/general/org_details'
const organizationName = process.env.ORGANIZATION_NAME
const brachName1 = process.env.BRANCH_NAME1
const brachName2 = process.env.BRANCH_NAME2



test.describe.serial('Organization settings - general', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ headless: false, slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });




  test('Upload logo', async () => {
    const settingsPage = new GeneralDetailsSettingsPage(page);

    await settingsPage.gotoGeneralSettingsORG(email, password, organizationName);

    //this timeout is because the AMR system return after 1 second to dashboard!
    await page.waitForLoadState('domcontentloaded')


    await page.waitForTimeout(3000)
    let url = await settingsPage.getURL()
    if (!url.endsWith(settingsUrl)) {
      await settingsPage.clickSettingsPage()
    }


    await settingsPage.clickEditDetails();
    await settingsPage.uploadLogo();

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(settingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });

  });



  test('check SMTP email sender', async () => {
    const settingsPage = new GeneralDetailsSettingsPage(page);

    await settingsPage.successSaveMessage.waitFor({ state: 'hidden' })

    await settingsPage.checkSMTPEmail(email);

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(settingsPage.successSendMessage).toBeVisible({ timeout: 2000 });

    await settingsPage.clickSaveDetails();

  });




  test('create two branches and turn on branches', async () => {
    const settingsPage = new GeneralDetailsSettingsPage(page);

    await settingsPage.successSaveMessage.waitFor({ state: 'hidden' })

    await settingsPage.navigateToBranchesTab();
    await settingsPage.addNewBranch(brachName1);

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(settingsPage.branchNameRow.getByText(brachName1, { exact: true }).first()).toHaveText(brachName1, { useInnerText: true });


    await settingsPage.addNewBranch(brachName2);
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(settingsPage.branchNameRow.getByText(brachName2, { exact: true }).first()).toHaveText(brachName2, { useInnerText: true });

    await settingsPage.clickTurnOnBranches()
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(settingsPage.turnOnBranchesButton).toBeChecked();



  });




});
