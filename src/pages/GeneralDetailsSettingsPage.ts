import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import GeneralDetailsSettingsLocators from "../locators/GeneralDetailsSettingsLocator";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";

// const name = process.env.EMAIL
// const password = process.env.PASSWORD


export class GeneralDetailsSettingsPage extends BasePage {


    private editButton: Locator;
    private imageLogo: Locator;
    private inputImageLogo: Locator;
    private testSMTPButton: Locator;
    private emailAddressField: Locator;
    private OKSendButton: Locator;
    private saveButton: Locator;
    private branchesTab: Locator;
    private addBranchButton: Locator;
    private branchNameField: Locator;
    private saveBranchButton: Locator;
    private XButton: Locator;
    turnOnBranchesButton: Locator;
    successSendMessage: Locator;
    successSaveMessage: Locator;
    branchNameRow: Locator;

    constructor(page: Page) {
        super(page)
        this.editButton = this.page.locator(GeneralDetailsSettingsLocators.editButton);
        this.imageLogo = this.page.locator(GeneralDetailsSettingsLocators.imageLogo);
        this.inputImageLogo = this.page.locator(GeneralDetailsSettingsLocators.inputImageLogo);
        this.testSMTPButton = this.page.locator(GeneralDetailsSettingsLocators.testSMTPButton);
        this.emailAddressField = this.page.locator(GeneralDetailsSettingsLocators.emailAddressField);
        this.OKSendButton = this.page.locator(GeneralDetailsSettingsLocators.OKSendButton);
        this.saveButton = this.page.locator(GeneralDetailsSettingsLocators.saveButton);
        this.branchesTab = this.page.locator(GeneralDetailsSettingsLocators.branchesTab);
        this.addBranchButton = this.page.locator(GeneralDetailsSettingsLocators.addBranchButton);
        this.branchNameField = this.page.locator(GeneralDetailsSettingsLocators.branchNameField);
        this.saveBranchButton = this.page.locator(GeneralDetailsSettingsLocators.saveBranchButton);
        this.turnOnBranchesButton = this.page.locator(GeneralDetailsSettingsLocators.turnOnBranchesButton);
        this.successSendMessage = this.page.locator(GeneralDetailsSettingsLocators.successSendMessage);
        this.successSaveMessage = this.page.locator(GeneralDetailsSettingsLocators.successSaveMessage);
        this.branchNameRow = this.page.locator(GeneralDetailsSettingsLocators.branchNameRow);
        this.XButton = this.page.locator(GeneralDetailsSettingsLocators.XButton);

    }

    async gotoGeneralSettingsORG(name: string, password: string, organizationName: string) {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.gotoDashboardWithLogin(name, password)
        await mainDashboardPage.navigateToYourOrganization(organizationName)
        await this.page.waitForLoadState("load")
        await this.page.waitForTimeout(500)
        await mainDashboardPage.openSettingsPage()
    }


    async clickSettingsPage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openSettingsPage()
    }


    async clickEditDetails() {
        await this.editButton.click();
    }

    async clickSaveDetails() {
        await this.saveButton.click();
    }


    async uploadLogo() {
        await this.imageLogo.hover({ timeout: 1500 });
        // promise of upload logo request
        const responsePromise = this.page.waitForResponse(response =>
            /\/upload_logo.*/.test(response.url()) && response.status() === 200);

        await this.inputImageLogo.setInputFiles('C:/Users/DavidKoop/OneDrive - RavTech/Desktop/AU-AMR/upload-files/mediaQuestion2.jpg');

        const response = await responsePromise;
        await this.clickSaveDetails();
    }

    async checkSMTPEmail(email: string) {
        await this.clickEditDetails()
        await this.testSMTPButton.click();
        await clickAndFill(this.emailAddressField, email);
        await this.OKSendButton.click();
    }

    async navigateToBranchesTab() {
        await this.branchesTab.click();
    }

    async addNewBranch(branchName: string) {
        await this.addBranchButton.click();
        await clickAndFill(this.branchNameField, branchName);
        await this.saveBranchButton.click();
    }

    async clickTurnOnBranches() {
        await this.turnOnBranchesButton.check();
    }


    async clickCloseMessageButton() {
        await this.XButton.click();
    }


    async getURL() {
        const url = this.page.url()
        return url;
    }
}