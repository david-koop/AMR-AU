import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import LoginLocators from "../locators/LoginLocator";
import { clickAndFill } from "../utils/pageUtils";



export class LoginPage extends BasePage {

    private languageDropDown: Locator;
    private selectLanguage: Locator;
    private userNameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private forgotPasswordButton: Locator;
    private emailForgotField: Locator;
    private sendResetLinkButton: Locator;
    private logoutButton:Locator;
    successSendMessage: Locator;

    constructor(page: Page) {
        super(page)
        this.languageDropDown = this.page.locator(LoginLocators.languageDropDown);
        this.selectLanguage = this.page.locator(LoginLocators.selectLanguage);
        this.userNameField = this.page.locator(LoginLocators.userNameField);
        this.passwordField = this.page.locator(LoginLocators.passwordField);
        this.loginButton = this.page.locator(LoginLocators.loginButton);
        this.logoutButton = this.page.locator(LoginLocators.logoutButton);
        this.forgotPasswordButton = this.page.locator(LoginLocators.forgotPasswordButton);
        this.emailForgotField = this.page.locator(LoginLocators.emailForgotField);
        this.sendResetLinkButton = this.page.locator(LoginLocators.sendResetLinkButton);
        this.successSendMessage = this.page.locator(LoginLocators.successSendMessage);
    }




    async gotoLoginPage() {
        await this.page.goto('/')
    }

    async selectEnglishLanguage() {
        await this.languageDropDown.click()
        await this.selectLanguage.getByText('English').click()
    }

    async fillNameAndPassword(name: string, password: string) {
        await clickAndFill(this.userNameField, name)
        await clickAndFill(this.passwordField, password)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async clickOnForgotPassword() {
        await this.forgotPasswordButton.click()
    }

    async fillEmailForgotField(email: string) {
        await clickAndFill(this.emailForgotField, email)
    }


    async clickSendResetLink() {
        await this.sendResetLinkButton.click()
    }

    async clickLogout() {
        await this.logoutButton.click()
    }

    async getURL() {
        const url = this.page.url()
        return url;
    }




}