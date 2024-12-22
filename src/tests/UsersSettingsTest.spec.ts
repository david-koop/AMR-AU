import { test, expect, Page, chromium, BrowserContext } from '@playwright/test';
import { GeneralDetailsSettingsPage } from '../pages/GeneralDetailsSettingsPage';
import { permissions, UsersSettingsPage } from '../pages/UsersSettingsPage';
import { MainDashboardPage } from '../pages/MainDashboardPage';
import { generateTwoNumbers } from '../../src/pages/AddCandidatePage';
import { baseURL, ROLE_NAME } from '../../texts';

let page: Page;
let context: BrowserContext;


let email = process.env.EMAIL
const password = process.env.PASSWORD
const orgUserEmail = process.env.ORG_USER_EMAIL
const orgUserPassword = process.env.ORG_USER_PASSWORD
const firstName = 'automation' + generateTwoNumbers()
const lastName = 'user'
const zoomLink = 'https://adam-milo.zoom.us/j/81610876632?pwd=WkBJL383QF52IO6WNafltkSAfTrw5k.1'
const BaseUrl = baseURL
const settingsUrl = '?#/settings/users/list'
const organizationName = process.env.ORGANIZATION_NAME
const roleName = ROLE_NAME
const duplicateEmail = true

test.describe.serial('Users Settings', () => {

  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ headless: false, slowMo: 40 });
    context = await browser.newContext({});
    page = await context.newPage();

  });

  test.afterAll(async () => {
    await page.close();
  });




  test('Create new Interviewer role', async () => {
    const usersSettingsPage = new UsersSettingsPage(page);

    await usersSettingsPage.gotoSettingsORG(email, password, organizationName);
    


    //This timeout is because the AMR system returns after one second to the dashboard!
    await page.waitForLoadState('domcontentloaded')
    
    
    await page.waitForTimeout(3000)
    let url = await usersSettingsPage.getURL()
    if (!url.endsWith(settingsUrl)) {
      await usersSettingsPage.clickSettingsPage()
      await usersSettingsPage.clickUsersSettingsPage()
    }

 


    await usersSettingsPage.clickRolesSubTab();
    await usersSettingsPage.createNewInterviewerRole(roleName, permissions);

    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(usersSettingsPage.successMessage).toBeVisible({ timeout: 2000 });
    await expect(usersSettingsPage.usersOrRolesNameRow.getByText(roleName).first()).toHaveText(roleName, { useInnerText: true })

  });



  test('Create new user with the new role', async () => {
    const usersSettingsPage = new UsersSettingsPage(page);

    await usersSettingsPage.successMessage.waitFor({ state: 'hidden' })

    await usersSettingsPage.clickUserListSubTab();
    await usersSettingsPage.addNewUser(firstName, lastName, orgUserEmail, roleName, zoomLink, orgUserPassword)


    while(duplicateEmail){
      if(await usersSettingsPage.duplicateEmail.isVisible({timeout:2000})){
        email =   await usersSettingsPage.changeNewUserEmail(email);
        await usersSettingsPage.duplicateEmail.waitFor({state:'hidden'})
        await usersSettingsPage.updateEmailField(email);
      } else {
        break
      }
    }


    /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
    await expect(usersSettingsPage.successMessage).toBeVisible({ timeout: 2000 });
    await expect(usersSettingsPage.usersOrRolesNameRow.getByText(firstName).first()).toContainText(firstName)

    await context.close();
  });



});

test('Login with the new user', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const mainDashboardPage = new MainDashboardPage(page);

  await mainDashboardPage.gotoDashboardWithLogin(orgUserEmail, orgUserPassword);
  /*---------------------------------------------------------- ASSERT -----------------------------------------------------------------------------------*/
  await expect(mainDashboardPage.addCandidateButton).toBeVisible({ timeout: 30000 })
  await expect(mainDashboardPage.addPositionButton).toBeHidden({ timeout: 1500 })

  await context.close();
});






