import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { GeneralDetailsSettingsPage } from "./GeneralDetailsSettingsPage";
import VeritasIntegrationSettingsLocators from "../locators/VeritasIntegrationSettingsLocator";
import MassActionsLocators from "../../src/locators/MassActionsLocator";
import AddCandidateLocators from "../../src/locators/AddCandidateLocator";




export class MassActionsPage extends BasePage {





    private uploadHeader: Locator;
    private updateHeader: Locator;
    DownloadUploadTemplate: Locator;
    private DownloadUpdateTemplate: Locator;
    candidateDetailsTitle: Locator;

    private saveButton: Locator;
    connectionSuccessfulMessage: Locator;
    successSaveMessage: Locator;

    constructor(page: Page) {
        super(page)
        this.uploadHeader = this.page.locator(MassActionsLocators.uploadHeader).getByText('Mass upload');
        this.updateHeader = this.page.locator(MassActionsLocators.updateHeader).getByText('Mass update');
        this.DownloadUploadTemplate = this.page.getByRole('link', { name: ' Download a template' }).first();
        this.DownloadUpdateTemplate = this.page.getByRole('link', { name: ' Download a template' }).nth(1);
        this.candidateDetailsTitle = this.page.locator(AddCandidateLocators.candidateDetailsTitle);

        this.saveButton = this.page.locator(VeritasIntegrationSettingsLocators.saveButton);
        this.connectionSuccessfulMessage = this.page.locator(VeritasIntegrationSettingsLocators.connectionSuccessfulMessage);
        this.successSaveMessage = this.page.locator(VeritasIntegrationSettingsLocators.successSaveMessage);
    }

    async gotoAddCandidatePage(name: string, password: string, organizationName: string) {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.gotoDashboardWithLogin(name, password);
        await mainDashboardPage.navigateToYourOrganization(organizationName);
        await mainDashboardPage.openAddCandidatePage();
    }


    async clickAddCandidatePage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openAddCandidatePage();
    }

    async downloadUploadTemplate() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.DownloadUploadTemplate.click()
        ]);

        const filePath = await download.path();
        return filePath;
    }

    async downloadUpdateTemplate() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.DownloadUploadTemplate.click()
        ]);

        const filePath = await download.path();
        return filePath;
    }


    async clickSave() {
        await this.saveButton.click();
    }




    async getURL() {
        const url = this.page.url()
        return url;
    }
}