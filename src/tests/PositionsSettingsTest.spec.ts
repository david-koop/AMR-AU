import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { PositionsSettingsPage, questionTypes } from '../pages/PositionsSettingsPage';

let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const positionsUrl = 'settings/positions/form_templates'
const organizationName = process.env.ORGANIZATION_NAME
const formTemplateName = process.env.FORM_TEMPLATE_NAME

test.describe.serial('Positions Settings', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ headless: false, slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
  });




  test('Create new template with all question types', async () => {
    const positionsSettingsPage = new PositionsSettingsPage(page);

    await positionsSettingsPage.gotoSettingsORG(email, password, organizationName);

    //this timeout is because the AMR system return after 1 second to dashboard!
    await page.waitForLoadState('domcontentloaded')



    await page.waitForTimeout(3000)
    let url = await positionsSettingsPage.getURL()
    if (!url.endsWith(positionsUrl)) {
      await positionsSettingsPage.clickSettingsPage()
      await positionsSettingsPage.clickPositionsSettingsPage()
    }



    await positionsSettingsPage.clickFormTemplatesSubTab();
    await positionsSettingsPage.addNewTemplate(formTemplateName, questionTypes);
    await page.waitForTimeout(1000)

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(positionsSettingsPage.templateRowName.getByText(formTemplateName).first()).toBeVisible({ timeout: 2000 });
    await expect(positionsSettingsPage.templateRowName.getByText(formTemplateName).first()).toHaveText(formTemplateName)

  });


});






