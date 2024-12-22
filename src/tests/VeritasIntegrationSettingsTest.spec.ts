import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { VeritasIntegrationSettingsPage } from '../pages/VeritasIntegrationSettingsPage';

let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const VeritasUrl = 'settings/integrations'
const organizationName = process.env.ORGANIZATION_NAME
const orgUnitID = process.env.ORG_UNIT_ID
const secretKey = process.env.SECRET_KEY

test.describe.serial('Veritas Integration Settings', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ headless: false, slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
  });




  test('Connect to Veritas Organization', async () => {
    const veritasIntegrationSettingsPage = new VeritasIntegrationSettingsPage(page);

    await veritasIntegrationSettingsPage.gotoSettingsORG(email, password, organizationName);

    //This timeout is because the AMR system returns after one second to the dashboard!
    await page.waitForLoadState('domcontentloaded')



    await page.waitForTimeout(3000)
    let url = await veritasIntegrationSettingsPage.getURL()
    if (!url.endsWith(VeritasUrl)) {
      await veritasIntegrationSettingsPage.clickSettingsPage()
      await veritasIntegrationSettingsPage.clickVeritasIntegrationSettingsPage()
    }



    await veritasIntegrationSettingsPage.fillOrgUnitIDAndSecretKey(orgUnitID, secretKey);
    await veritasIntegrationSettingsPage.clickTestConnection();

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(veritasIntegrationSettingsPage.connectionSuccessfulMessage).toBeVisible({ timeout: 2000 });
    await veritasIntegrationSettingsPage.connectionSuccessfulMessage.waitFor({state:'visible'})
    await veritasIntegrationSettingsPage.clickSave();
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(veritasIntegrationSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });

  });




});






