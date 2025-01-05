import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";
import { GeneralDetailsSettingsPage } from "./GeneralDetailsSettingsPage";
import UsersSettingsLocators from "../locators/UsersSettingsLocator";

// const name = process.env.EMAIL
// const password = process.env.PASSWORD

export const permissions = ['View Dashboard', 'View Schedule', 'Edit Schedule', 'View Veritas evaluation results',
    'Interview candidates', 'Add candidates', 'View and Edit candidates']


export class UsersSettingsPage extends BasePage {


    private usersTab: Locator;
    private rolesSubTab: Locator;
    private usersListSubTab: Locator;
    private addNewRoleButton: Locator;
    private roleNameField: Locator;
    private permissionsCheckBox: Locator;
    private okButton: Locator;
    private addNewUserButton: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private emailUserField: Locator;
    private personalZoomLinkField: Locator;
    private selectRoleDropdown: Locator;
    private rolesList: Locator;
    private resetNotRequiredCheckBox: Locator;
    private activateWithoutConfirmationCheckBox: Locator;
    private newPasswordField: Locator;
    private confirmPasswordField: Locator;
    private saveUserButton: Locator;
    private XButton: Locator;
    usersOrRolesNameRow: Locator;
    successMessage: Locator;
    duplicateEmail: Locator;

    constructor(page: Page) {
        super(page)
        this.usersTab = this.page.locator(UsersSettingsLocators.usersTab);
        this.rolesSubTab = this.page.locator(UsersSettingsLocators.rolesSubTab);
        this.usersListSubTab = this.page.locator(UsersSettingsLocators.usersListSubTab);
        this.addNewRoleButton = this.page.locator(UsersSettingsLocators.addNewRoleButton);
        this.roleNameField = this.page.locator(UsersSettingsLocators.roleNameField);
        this.permissionsCheckBox = this.page.locator(UsersSettingsLocators.permissionsCheckBox);
        this.okButton = this.page.locator(UsersSettingsLocators.okButton);
        this.addNewUserButton = this.page.locator(UsersSettingsLocators.addNewUserButton);
        this.firstNameField = this.page.locator(UsersSettingsLocators.firstNameField);
        this.lastNameField = this.page.locator(UsersSettingsLocators.lastNameField);
        this.emailUserField = this.page.locator(UsersSettingsLocators.emailUserField);
        this.personalZoomLinkField = this.page.locator(UsersSettingsLocators.personalZoomLinkField);
        this.selectRoleDropdown = this.page.locator(UsersSettingsLocators.selectRoleDropdown);
        this.rolesList = this.page.locator(UsersSettingsLocators.rolesList);
        this.resetNotRequiredCheckBox = this.page.locator(UsersSettingsLocators.resetNotRequiredCheckBox);
        this.activateWithoutConfirmationCheckBox = this.page.locator(UsersSettingsLocators.activateWithoutConfirmationCheckBox);
        this.newPasswordField = this.page.locator(UsersSettingsLocators.newPasswordField);
        this.confirmPasswordField = this.page.locator(UsersSettingsLocators.confirmPasswordField);
        this.saveUserButton = this.page.locator(UsersSettingsLocators.saveUserButton);
        this.usersOrRolesNameRow = this.page.locator(UsersSettingsLocators.usersOrRolesNameRow);
        this.successMessage = this.page.locator(UsersSettingsLocators.successMessage);
        this.duplicateEmail = this.page.locator(UsersSettingsLocators.duplicateEmail).getByText('Duplicate user: "Email"');
        this.XButton = this.page.locator(UsersSettingsLocators.XButton);

    }

    async gotoSettingsORG(name: string, password: string, organizationName: string) {
        const generalDetailsPage = new GeneralDetailsSettingsPage(this.page);
        await generalDetailsPage.gotoGeneralSettingsORG(name, password, organizationName);
    }


    async clickSettingsPage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openSettingsPage();
    }


    async clickUsersSettingsPage() {
        await this.usersTab.click();
    }


    async clickRolesSubTab() {
        await this.rolesSubTab.click();
    }

    async clickUserListSubTab() {
        await this.usersListSubTab.click();
    }


    async createNewInterviewerRole(roleName: string, permissions: Array<string>) {
        await this.addNewRoleButton.click();
        await clickAndFill(this.roleNameField, roleName);
        for (const permission of permissions) {
            await this.permissionsCheckBox.getByText(permission).check()
        }
        await this.okButton.click()
    }


    async addNewUser(firstName: string, lastName: string, email: string, roleName: string, zoomLink: string, password:string) {
        await this.addNewUserButton.click()
        await clickAndFill(this.firstNameField, firstName);
        await clickAndFill(this.lastNameField, lastName);
        await clickAndFill(this.emailUserField, email);
        await this.selectRoleDropdown.click();
        await this.rolesList.getByText(roleName).first().click();
        await clickAndFill(this.personalZoomLinkField, zoomLink);
        await this.resetNotRequiredCheckBox.check();
        await this.activateWithoutConfirmationCheckBox.check();
        await this.page.waitForTimeout(500);
        await clickAndFill(this.newPasswordField, password);
        await clickAndFill(this.confirmPasswordField, password);
        await this.saveUserButton.click();
    }


    async changeNewUserEmail(email:string){
        const updatedEmail = email + "A";
        return updatedEmail;
    }
    async updateEmailField(email:string){
        await clickAndFill(this.emailUserField, email);
        await this.saveUserButton.click();
    }


    async clickCloseMessageButton() {
        await this.XButton.click();
    }


    async getURL() {
        const url = this.page.url()
        return url;
    }
}