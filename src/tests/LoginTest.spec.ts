import { test, expect, Page, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { url } from 'inspector';
import { baseURL } from '../../texts';

let page: Page;
let context;


const email = process.env.EMAIL
const password = process.env.PASSWORD
const BaseUrl = baseURL


test.describe.serial('Login', () => {

test.beforeAll(async ({ browser }) => {
  
  browser = await chromium.launch({  slowMo:40 });
  context = await browser.newContext({})
  page = await context.newPage()
  
});




  test('Check login', async () => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.selectEnglishLanguage();
    await loginPage.fillNameAndPassword(email, password);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForURL(/\/\?#\/dashboard$/)    //{timeout:2500} 
    const url = await loginPage.getURL()
    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(url).toMatch(BaseUrl + '?#/dashboard')

  });

  test('Send reset link', async () => {
    const loginPage = new LoginPage(page);
    const url = await loginPage.getURL()
    
    await loginPage.gotoLoginPage();
    if (url.endsWith('dashboard')){
        await loginPage.clickLogout()
      }
      await loginPage.clickOnForgotPassword();
      await loginPage.fillEmailForgotField(email);
      await loginPage.clickSendResetLink()
      /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
      await expect(loginPage.successSendMessage).toBeVisible({ timeout: 2000 })
      
    });
    
    
  });


