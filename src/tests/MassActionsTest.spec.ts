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
const downloadDirectory = path.resolve('./downloads');
const today = new Date().toISOString().split('T')[0];



test.describe.serial('Mass actions', () => {

  test.beforeAll(async () => {

    browser = await chromium.launch({ slowMo: 40 });

    context = await browser.newContext({
      acceptDownloads: true,
    });
    
    page = await context.newPage();


    // create download folder (if not exist)
    if (!fs.existsSync(downloadDirectory)) {
      fs.mkdirSync(downloadDirectory);
    }

  });


  test.afterAll(async () => {
    await page.close();
    await browser.close();
  });





  test('Download upload template', async () => {
    const massActionPage = new MassActionsPage(page);



    await massActionPage.gotoAddCandidatePage(email, password, organizationName);



    //This timeout is because the AMR system returns after one second to the dashboard!
    await massActionPage.page.waitForLoadState('load')
    await massActionPage.page.waitForTimeout(3000)

    if (await massActionPage.candidateDetailsTitle.isHidden()) {
      await massActionPage.clickAddCandidatePage()
    }


    // click download template upload file
    const filePath = await massActionPage.downloadUploadTemplate()

    // Save in the download folder
    const newFilePath = path.join(downloadDirectory, `Upload_${today}.xlsx`);
    fs.renameSync(filePath, newFilePath);
    
    


  
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    expect(fs.existsSync(newFilePath)).toBe(true);


  });




  // change test
  test('Download update template', async () => {
    const massActionPage = new MassActionsPage(page);


    if (await massActionPage.candidateDetailsTitle.isHidden()) {
      await massActionPage.clickAddCandidatePage()
    }

    // click download upload file
    const filePath = await massActionPage.downloadUpdateTemplate()

     // Save in the download folder
     const newFilePath = path.join(downloadDirectory, `Update_${today}.xlsx`);
     fs.renameSync(filePath, newFilePath);


    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    expect(fs.existsSync(newFilePath)).toBe(true);


  });


});



