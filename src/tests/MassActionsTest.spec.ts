import { test, expect, Page, chromium, BrowserContext, Browser } from '@playwright/test';
import { AddCandidatePage, generateID, getDay, getMonth, getRandomLetters, getYear } from '../pages/AddCandidatePage';
import { MassActionsPage } from '../../src/pages/MassActionsPage';
import fs from 'fs';
import path from 'path';

let browser: Browser;
let context: BrowserContext;
let page: Page;


let email = process.env.EMAIL || ''  // 'dudikoop@gmail.comm'
const password = process.env.PASSWORD || ''
const BaseUrl = ''
const Url = '/#/'
const organizationName = process.env.ORGANIZATION_NAME
const positionName = 'position automation'//'QA Position 1'
const firstName = 'dudua' + getRandomLetters()
const lastName = 'QAAqq' + getRandomLetters()
const mobilePhone = '054' + generateID()
const candidateEmail = 'dudu@daa.com' + getRandomLetters()
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

  test.beforeAll(async () => {

    browser = await chromium.launch({  slowMo: 40 });

    context = await browser.newContext({
      acceptDownloads: true,
    });

    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
    await browser.close();
  });





  test('Download upload template', async () => {
    const massActionPage = new MassActionsPage(page);

    //Set download path
    const downloadDirectory = path.resolve('./downloads');

    // create download folder (if not exist)
    if (!fs.existsSync(downloadDirectory)) {
      fs.mkdirSync(downloadDirectory);
    }



    await massActionPage.gotoAddCandidatePage(email, password, organizationName);

    //This timeout is because the AMR system returns after one second to the dashboard!
    await massActionPage.page.waitForLoadState('load')
    let url = await massActionPage.getURL()
    await massActionPage.page.waitForTimeout(3000)

    if (await massActionPage.candidateDetailsTitle.isHidden()) {
      await massActionPage.clickAddCandidatePage()
    }


    // click download upload file
    const filePath = await massActionPage.downloadUploadTemplate()

    // Save in the download folder
    let newFilePath = filePath;
    if (!path.extname(filePath)) {
      newFilePath = path.join(downloadDirectory, path.basename(filePath) + '.xlsx');
      fs.renameSync(filePath, newFilePath); // העברת הקובץ עם סיומת
    }



    // בדוק את סיומת הקובץ
    const fileExtension = path.extname(newFilePath).toLowerCase();
    console.log('סיומת הקובץ:', fileExtension);

    // אם אתה רוצה לבדוק את סוג הקובץ לפי סיומת
    if (fileExtension === '.xlsx') {
      console.log('הקובץ הוא Excel');
    } else {
      console.log('סוג הקובץ לא מוכר');
    }



    // check if the file exist
    const fileExists = fs.existsSync(newFilePath);
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    expect(fileExists).toBe(true);


  });




  // change test
  test('Download update template', async () => {
    const massActionPage = new MassActionsPage(page);

    //Set download path
    const downloadDirectory = path.resolve('./downloads');

    if (await massActionPage.candidateDetailsTitle.isHidden()) {
      await massActionPage.clickAddCandidatePage()
    }

    // click download upload file
    const filePath = await massActionPage.downloadUpdateTemplate()


    // check if the file exist
    const fileExists = fs.existsSync(filePath);
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    expect(fileExists).toBe(true);


  });


});



