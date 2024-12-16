import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import MainDashboardLocators from "../locators/MainDashboardLocator";
import { LoginPage } from "./LoginPage";

// const name = process.env.EMAIL
// const password = process.env.PASSWORD


export class MainDashboardPage extends BasePage {


    private openChangePassword: Locator;
    private yesButton: Locator;
    private openOrganizationsListIcon: Locator;
    private organizationsName: Locator;
    addCandidateButton: Locator;
    private candidateButton: Locator;
    private calendarButton: Locator;
    private settingsButton: Locator;
    addPositionButton: Locator;
    private searchField: Locator;
    successSendMessage: Locator;

    constructor(page: Page) {
        super(page)
        this.openChangePassword = this.page.locator(MainDashboardLocators.openChangePassword);
        this.yesButton = this.page.locator(MainDashboardLocators.yesButton);
        this.openOrganizationsListIcon = this.page.locator(MainDashboardLocators.openOrganizationsListIcon);
        this.organizationsName = this.page.locator(MainDashboardLocators.organizationsName);
        this.addCandidateButton = this.page.locator(MainDashboardLocators.addCandidateButton);
        this.candidateButton = this.page.locator(MainDashboardLocators.candidateButton);
        this.calendarButton = this.page.locator(MainDashboardLocators.calendarButton);
        this.settingsButton = this.page.locator(MainDashboardLocators.settingsButton);
        this.addPositionButton = this.page.locator(MainDashboardLocators.addPositionButton);
        this.searchField = this.page.locator(MainDashboardLocators.searchField);
        this.successSendMessage = this.page.locator(MainDashboardLocators.successSendMessage);
    }

    async gotoDashboardWithLogin(name:string,password:string) {
        const loginPage = new LoginPage(this.page);
        await loginPage.gotoLoginPage()
        await loginPage.selectEnglishLanguage()
        await loginPage.fillNameAndPassword(name, password)
        await loginPage.clickLoginButton()
    }


    async sendChangePasswordLink() {
        await this.openChangePassword.click();
        await this.yesButton.click();
    }

    async navigateToYourOrganization(organizationName: string) {
        await this.openOrganizationsListIcon.click()
        await this.organizationsName.getByText(organizationName).click()
    }

    async openSettingsPage() {
        await this.settingsButton.click()
    }

    
    async openAddPositionPage() {
        await this.addPositionButton.click()
    }


    async openAddCandidatePage() {
        await this.addCandidateButton.click()
    }




}