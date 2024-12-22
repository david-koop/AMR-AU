import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { SMSBuilderSettingsPage } from '../pages/SMSBuilderSettingsPage';
import { AddPositionPage } from '../pages/AddPositionPage';
import { BRANCH_NAME1, EMAIL_TEMPLATE_NAME, FORM_TEMPLATE_NAME, SMS_TEMPLATE_NAME } from '../../texts';

let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const positionUrl = 'position/0/general'
const organizationName = process.env.ORGANIZATION_NAME
const emailTemplateName = EMAIL_TEMPLATE_NAME
const SMSTemplateName = SMS_TEMPLATE_NAME
const positionTitle = 'position automation'
const branchName = BRANCH_NAME1
const groupStepName = 'group'
const veritasStepName = 'Veritas'
const customerName = 'qa tzv can be deleted'//'0 Tzvika QA'
const positionName = 'tzv 30.6'//'tzv position 8.5'
const genericName = 'generic'
const loadTemplateName = FORM_TEMPLATE_NAME
const onlineSurveyName = 'online survey'
const formTitleField = 'form Title'
const formDescriptionField = 'form Description'
const personalName = 'personal evaluation'




test.describe.serial('Add Position', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ headless: false, slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
  });




  test('Create new position', async () => {
    const addPositionPage = new AddPositionPage(page);

    await addPositionPage.gotoAddPositionPage(email, password, organizationName);

    //This timeout is because the AMR system returns after one second to the dashboard!
    await page.waitForLoadState('domcontentloaded')



    await page.waitForTimeout(3000)
    let url = await addPositionPage.getURL()
    if (!url.endsWith(positionUrl)) {
      await addPositionPage.clickAddPositionPage()
    }



    await addPositionPage.fillGeneralDetails(positionTitle, branchName);
    await addPositionPage.clickAndFillRecruitingProcess(groupStepName, 'Group', veritasStepName, 'Veritas Evaluation', customerName, positionName, emailTemplateName, SMSTemplateName);
    await addPositionPage.addGenericStepInGroup(genericName, 'Generic', 'CV review', loadTemplateName);
    await addPositionPage.addOnlineSurveyStepInGroup(onlineSurveyName, 'Online Survey', 'Email', emailTemplateName, 'SMS', SMSTemplateName, formTitleField, formDescriptionField);
    await addPositionPage.addPersonalEvaluationStepInGroup(personalName, 'Personal evaluation', 'Personal evaluation', loadTemplateName)
    await addPositionPage.activePosition('Active');
    await addPositionPage.page.pause();
    await addPositionPage.savePosition();
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(addPositionPage.successSaveMessage).toBeVisible({ timeout: 2000 });
    await addPositionPage.successSaveMessage.waitFor({ state: 'hidden' })





  });
  test('Duplicate position', async () => {
    const addPositionPage = new AddPositionPage(page);

    await addPositionPage.duplicatePosition()
    await addPositionPage.activePosition('Active')
    await addPositionPage.savePosition();


    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(addPositionPage.successSaveMessage).toBeVisible({ timeout: 2000 });



  });


});






