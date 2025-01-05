import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { EmailBuilderSettingsPage } from '../pages/EmailBuilderSettingsPage';
import { EMAIL_CONTENT_CANDIDATE, EMAIL_CONTENT_INTERVIEWER, EMAIL_TEMPLATE_NAME, INTERVIEWER_EMAIL_TEMPLATE_NAME } from '../../texts';



let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const emailUrl = 'settings/email/builder'
const organizationName = process.env.ORGANIZATION_NAME
const templateCandidateName = EMAIL_TEMPLATE_NAME
const subjectCandidate = 'Candidate'
const contentCandidate = EMAIL_CONTENT_CANDIDATE
const templateInterviewerName = INTERVIEWER_EMAIL_TEMPLATE_NAME
const subjectInterviewer = 'Interviewer'
const contentInterviewer = EMAIL_CONTENT_INTERVIEWER
const ruleCandidateName = 'Rule Candidate'
const ruleInterviewerName = 'Rule Interviewer'

test.describe.serial('Email Builder Settings', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ headless: false, slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
  });




  test('Create new Email templates for candidate and interviewer', async () => {
    const emailBuilderSettingsPage = new EmailBuilderSettingsPage(page);

    await emailBuilderSettingsPage.gotoSettingsORG(email, password, organizationName);

    //This timeout is because the AMR system returns after one second to the dashboard!
    await page.waitForLoadState('domcontentloaded')



    await page.waitForTimeout(3000)
    let url = await emailBuilderSettingsPage.getURL()
    if (!url.endsWith(emailUrl)) {
      await emailBuilderSettingsPage.clickSettingsPage()
      await emailBuilderSettingsPage.clickEmailSettingsPage()
    }



    await emailBuilderSettingsPage.clickEmailTemplateSubTab();
    await emailBuilderSettingsPage.addNewEmailTemplate(templateCandidateName, subjectCandidate, contentCandidate);

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(emailBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });

    
    await emailBuilderSettingsPage.clickCloseMessageButton();



    await emailBuilderSettingsPage.addNewEmailTemplate(templateInterviewerName, subjectInterviewer, contentInterviewer);
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(emailBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
    await expect(emailBuilderSettingsPage.templateRowName.getByText(templateCandidateName).first()).toHaveText(templateCandidateName)
    await expect(emailBuilderSettingsPage.templateRowName.getByText(templateInterviewerName).first()).toHaveText(templateInterviewerName)

    await emailBuilderSettingsPage.clickCloseMessageButton();

  });

  

  test('Create new Email rules for candidate and interviewer', async () => {
    const emailBuilderSettingsPage = new EmailBuilderSettingsPage(page);

    await emailBuilderSettingsPage.clickEmailSendingRulesSubTab()
    await emailBuilderSettingsPage.addNewEmailRule(ruleCandidateName, 'Personal interview', 'Assigned to Personal evaluation', templateCandidateName, 'Candidate')


    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await page.waitForTimeout(500)
    if (await emailBuilderSettingsPage.successSaveMessage.isVisible()) {
      await expect(emailBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
      await emailBuilderSettingsPage.clickCloseMessageButton();
    }
    else if (await emailBuilderSettingsPage.alreadyExistingRuleMessage.isVisible()) {
      await expect(emailBuilderSettingsPage.alreadyExistingRuleMessage).toBeVisible({ timeout: 2000 });
      await emailBuilderSettingsPage.clickCloseMessageButton();
      await emailBuilderSettingsPage.cancelRuleButton.click()
    }



    await emailBuilderSettingsPage.addNewEmailRule(ruleInterviewerName, 'Personal interview', 'Assigned to Personal evaluation', templateInterviewerName, 'Interviewer')


    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await page.waitForTimeout(500)
    if (await emailBuilderSettingsPage.successSaveMessage.isVisible()) {
      await expect(emailBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
      await expect(emailBuilderSettingsPage.ruleNameRow.getByText(ruleCandidateName).first()).toHaveText(ruleCandidateName)
      await expect(emailBuilderSettingsPage.ruleNameRow.getByText(ruleInterviewerName).first()).toHaveText(ruleInterviewerName)
    }
    else if (await emailBuilderSettingsPage.alreadyExistingRuleMessage.isVisible()) {
      await expect(emailBuilderSettingsPage.alreadyExistingRuleMessage).toBeVisible({ timeout: 2000 });
    }


  });


});






