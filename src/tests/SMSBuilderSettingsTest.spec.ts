import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { SMSBuilderSettingsPage } from '../pages/SMSBuilderSettingsPage';
import { SMS_CONTENT, SMS_TEMPLATE_NAME } from '../../texts';

let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const SMSUrl = 'settings/sms/builder'
const organizationName = process.env.ORGANIZATION_NAME
const templateName = SMS_TEMPLATE_NAME
const content = SMS_CONTENT
const ruleName = 'Rule SMS'

test.describe.serial('SMS Builder Settings', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
  });




  test('Create new SMS template for candidate', async () => {
    const smsBuilderSettingsPage = new SMSBuilderSettingsPage(page);

    await smsBuilderSettingsPage.gotoSettingsORG(email, password, organizationName);

    //This timeout is because the AMR system returns after one second to the dashboard!
    await page.waitForLoadState('domcontentloaded')



    await page.waitForTimeout(3000)
    let url = await smsBuilderSettingsPage.getURL()
    if (!url.endsWith(SMSUrl)) {
      await smsBuilderSettingsPage.clickSettingsPage()
      await smsBuilderSettingsPage.clickSMSSettingsPage()
    }



    await smsBuilderSettingsPage.clickSMSTemplateSubTab();
    await smsBuilderSettingsPage.addNewSMSTemplate(templateName, content);

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(smsBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
    await smsBuilderSettingsPage.clickCloseMessageButton()
    await expect(smsBuilderSettingsPage.templateRowName.getByText(templateName).first()).toHaveText(templateName)


  });

  test('Create new SMS rule for candidate ', async () => {
    const smsBuilderSettingsPage = new SMSBuilderSettingsPage(page);

    await smsBuilderSettingsPage.clickSMSSendingRulesSubTab()
    await smsBuilderSettingsPage.addNewSMSRule(ruleName, 'Personal interview', 'Assigned to Personal evaluation', templateName)
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    if (await smsBuilderSettingsPage.successSaveMessage.isVisible()) {
      await expect(smsBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
      await smsBuilderSettingsPage.clickCloseMessageButton()
      await expect(smsBuilderSettingsPage.ruleNameRow.getByText(ruleName).first()).toHaveText(ruleName)
    }
    if (await smsBuilderSettingsPage.alreadyExistingRuleMessage.isVisible()) {
      await expect(smsBuilderSettingsPage.alreadyExistingRuleMessage).toBeVisible({ timeout: 2000 });
    }

  });


});






