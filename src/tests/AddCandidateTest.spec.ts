import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { AddCandidatePage, generateID, getDay, getMonth, getRandomLetters, getYear } from '../pages/AddCandidatePage';

let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const Url = '/#/'
const organizationName = process.env.ORGANIZATION_NAME
const positionName = 'position automation'//'QA Position 1'
const firstName = 'dudua' + getRandomLetters()
const lastName = 'QAAqq' + getRandomLetters()
const mobilePhone = '054' + generateID()
const candidateEmail = 'dudu@ravtech.co.il' + getRandomLetters()
const candidateID = generateID() + ''
const street = 'hartom'
const house = '16'
const birthYear = '2000'
const cityName = 'bnei brak'
const year = getYear() + ''
const month = getMonth() + ''
const day = getDay() + ''
const extraTime = '2'
const mobilePhone1 = '054' + generateID()
const candidateID1 = generateID() + ''




test.describe.serial('Add Candidate', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
  });




  test('add new candidate', async () => {
    const addCandidatePage = new AddCandidatePage(page);

    await addCandidatePage.gotoAddCandidatePage(email, password, organizationName);

    //This timeout is because the AMR system returns after one second to the dashboard!
    await addCandidatePage.page.waitForLoadState('load')
    let url = await addCandidatePage.getURL()
    await addCandidatePage.page.waitForTimeout(3000)



    if (await addCandidatePage.candidateDetailsTitle.isHidden()) {
      await addCandidatePage.clickAddCandidatePage()
    }


    await addCandidatePage.clickAndFillPersonalDetails(firstName, lastName, mobilePhone, candidateEmail, candidateID, street, house);
    await addCandidatePage.selectBirthAndGenderAndCity(birthYear, 'Male', cityName);
    await addCandidatePage.insertProcessStartDate(year, month, day);
    await addCandidatePage.fillEvaluationDetails(positionName, 'English', extraTime);
    await addCandidatePage.saveCandidate();
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(addCandidatePage.successSaveMessage).toBeVisible({ timeout: 2000 });
    await addCandidatePage.clickCloseMessageButton()
  });


  test('Check merge candidate', async () => {
    const addCandidatePage = new AddCandidatePage(page);

    await addCandidatePage.clickAddCandidatePage()
    await addCandidatePage.clickAndFillPersonalDetails(firstName, lastName, mobilePhone1, candidateEmail, candidateID1, street, house);
    await addCandidatePage.selectBirthAndGenderAndCity(birthYear, 'Male', cityName);
    await addCandidatePage.insertProcessStartDate(year, month, day);
    await addCandidatePage.fillEvaluationDetails(positionName, 'English', extraTime);
    await addCandidatePage.saveCandidate();
    await addCandidatePage.checkMerge();
    await addCandidatePage.saveCandidate();

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(addCandidatePage.successSaveMessage).toBeVisible({ timeout: 2000 });



  });


});



