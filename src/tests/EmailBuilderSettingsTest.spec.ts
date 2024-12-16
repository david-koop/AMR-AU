import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { EmailBuilderSettingsPage } from '../pages/EmailBuilderSettingsPage';

let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const emailUrl = 'settings/email/builder'
const organizationName = process.env.ORGANIZATION_NAME
const templateCandidateName = process.env.EMAIL_TEMPLATE_NAME
const subjectCandidate = 'Candidate'
const contentCandidate = process.env.EMAIL_CONTENT_CANDIDATE
const templateInterviewerName = process.env.INTERVIEWER_EMAIL_TEMPLATE_NAME
const subjectInterviewer = 'Interviewer'
const contentInterviewer = process.env.EMAIL_CONTENT_INTERVIEWER
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

    //this timeout is because the AMR system return after 1 second to dashboard!
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
    
    await emailBuilderSettingsPage.successSaveMessage.waitFor({state:'hidden'})

    await emailBuilderSettingsPage.addNewEmailTemplate(templateInterviewerName, subjectInterviewer, contentInterviewer);
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(emailBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
    await expect(emailBuilderSettingsPage.templateRowName.getByText(templateCandidateName).first()).toHaveText(templateCandidateName)
    await expect(emailBuilderSettingsPage.templateRowName.getByText(templateInterviewerName).first()).toHaveText(templateInterviewerName)
    
    await emailBuilderSettingsPage.successSaveMessage.waitFor({state:'hidden'})

  });

  test('Create new Email rules for candidate and interviewer', async () => {
    const emailBuilderSettingsPage = new EmailBuilderSettingsPage(page);
  
    await emailBuilderSettingsPage.clickEmailSendingRulesSubTab()
    await emailBuilderSettingsPage.addNewEmailRule(ruleCandidateName,'Personal interview','Assigned to Personal evaluation',templateCandidateName,'Candidate')
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(emailBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
    
    await emailBuilderSettingsPage.successSaveMessage.waitFor({state:'hidden'})
    

    await emailBuilderSettingsPage.addNewEmailRule(ruleInterviewerName,'Personal interview','Assigned to Personal evaluation',templateInterviewerName,'Interviewer')
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(emailBuilderSettingsPage.successSaveMessage).toBeVisible({ timeout: 2000 });
    await expect(emailBuilderSettingsPage.ruleNameRow.getByText(ruleCandidateName).first()).toHaveText(ruleCandidateName)
    await expect(emailBuilderSettingsPage.ruleNameRow.getByText(ruleInterviewerName).first()).toHaveText(ruleInterviewerName)
  });

  
});






