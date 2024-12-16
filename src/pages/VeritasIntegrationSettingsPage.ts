import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";
import { GeneralDetailsSettingsPage } from "./GeneralDetailsSettingsPage";
import VeritasIntegrationSettingsLocators from "../locators/VeritasIntegrationSettingsLocator";




export class VeritasIntegrationSettingsPage extends BasePage {





    private VeritasIntegrationTab: Locator;
    private orgUnitIdField: Locator;
    private secretKeyField: Locator;
    private testConnectionButton: Locator;
    private saveButton: Locator;
    connectionSuccessfulMessage: Locator;
    successSaveMessage: Locator;

    constructor(page: Page) {
        super(page)
        this.VeritasIntegrationTab = this.page.locator(VeritasIntegrationSettingsLocators.VeritasIntegrationTab);
        this.orgUnitIdField = this.page.locator(VeritasIntegrationSettingsLocators.OrgUnitIdField);
        this.secretKeyField = this.page.locator(VeritasIntegrationSettingsLocators.SecretKeyField);
        this.testConnectionButton = this.page.locator(VeritasIntegrationSettingsLocators.testConnectionButton);
        this.saveButton = this.page.locator(VeritasIntegrationSettingsLocators.saveButton);
        this.connectionSuccessfulMessage = this.page.locator(VeritasIntegrationSettingsLocators.connectionSuccessfulMessage);
        this.successSaveMessage = this.page.locator(VeritasIntegrationSettingsLocators.successSaveMessage);
    }

    async gotoSettingsORG(name: string, password: string, organizationName: string) {
        const generalDetailsPage = new GeneralDetailsSettingsPage(this.page);
        await generalDetailsPage.gotoGeneralSettingsORG(name, password, organizationName);
    }


    async clickSettingsPage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openSettingsPage();
    }


    async clickVeritasIntegrationSettingsPage() {
        await this.VeritasIntegrationTab.click();
    }

    async fillOrgUnitIDAndSecretKey(orgUnitID: string, secretKey: string) {
        await clickAndFill(this.orgUnitIdField, orgUnitID);
        await clickAndFill(this.secretKeyField, secretKey);
    }

    async clickTestConnection() {
        await this.testConnectionButton.click();
    }
    async clickSave() {
        await this.saveButton.click();
    }





    async getURL() {
        const url = this.page.url()
        return url;
    }
}