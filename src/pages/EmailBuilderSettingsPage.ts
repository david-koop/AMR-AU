import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";
import { GeneralDetailsSettingsPage } from "./GeneralDetailsSettingsPage";
import PositionsSettingsLocators from "../locators/PositionsSettingsLocator";
import EmailBuilderSettingsLocators from "../locators/EmailBuilderSettingsLocator";


export type tags = 'CV review' | 'Evaluation center step tag' | 'Group step tag' | 'Initial evaluation' |
    'Online Survey' | 'Personal evaluation' | 'Personal interview' | 'Phone Interview' | 'Sign' | 'Veritas evaluation step tag'

export type status = 'Approved' | 'Assigned to Personal evaluation' | 'Declined' | 'Duplicated' |
    'Form Sent' | 'In Progress' | 'New' | 'Not Required' | 'Waived'

export type recipient = 'Candidate' | 'Interviewer'


export class EmailBuilderSettingsPage extends BasePage {





    private EmailTab: Locator;
    private emailSendingRulesSubTab: Locator;
    private emailTemplateSubTab: Locator;
    private emailQueueSubTab: Locator;
    private addEmailTemplateButton: Locator;
    private templateNameField: Locator;
    private templateSubjectField: Locator;
    private templateContentField: Locator;
    private addTagDropdown: Locator;
    private rtlTemplateCheckBox: Locator;
    private saveTemplateButton: Locator;
    private addEmailRule: Locator;
    private ruleNameField: Locator;
    private selectTagsDropDown: Locator;
    private tagsName: Locator;
    private selectStatusesDropDown: Locator;
    private statusName: Locator;
    private selectTemplateDropDown: Locator;
    private selectRecipientDropDown: Locator;
    private templateAndRecipientName: Locator;
    private saveRuleButton: Locator;
    private XButton: Locator;
    templateRowName: Locator;
    ruleNameRow: Locator;
    successSaveMessage: Locator;
    alreadyExistingRuleMessage: Locator;
    cancelRuleButton: Locator;


    constructor(page: Page) {
        super(page)
        this.EmailTab = this.page.locator(EmailBuilderSettingsLocators.EmailTab);
        this.emailSendingRulesSubTab = this.page.locator(EmailBuilderSettingsLocators.emailSendingRulesSubTab);
        this.emailTemplateSubTab = this.page.locator(EmailBuilderSettingsLocators.emailTemplateSubTab);
        this.emailQueueSubTab = this.page.locator(EmailBuilderSettingsLocators.emailQueueSubTab);
        this.addEmailTemplateButton = this.page.locator(EmailBuilderSettingsLocators.addEmailTemplateButton);
        this.templateNameField = this.page.locator(EmailBuilderSettingsLocators.templateNameField);
        this.templateSubjectField = this.page.locator(EmailBuilderSettingsLocators.templateSubjectField);
        this.templateContentField = this.page.locator(EmailBuilderSettingsLocators.templateContentField);
        this.addTagDropdown = this.page.locator(EmailBuilderSettingsLocators.addTagDropdown);
        this.rtlTemplateCheckBox = this.page.locator(EmailBuilderSettingsLocators.rtlTemplateCheckBox);
        this.saveTemplateButton = this.page.locator(EmailBuilderSettingsLocators.saveTemplateButton);
        this.successSaveMessage = this.page.locator(EmailBuilderSettingsLocators.successSaveMessage);
        this.templateRowName = this.page.locator(EmailBuilderSettingsLocators.templateRowName);
        this.addEmailRule = this.page.locator(EmailBuilderSettingsLocators.addEmailRule);
        this.ruleNameField = this.page.locator(EmailBuilderSettingsLocators.ruleNameField);
        this.selectTagsDropDown = this.page.locator(EmailBuilderSettingsLocators.selectTagsDropDown);
        this.tagsName = this.page.locator(EmailBuilderSettingsLocators.tagsName);
        this.selectStatusesDropDown = this.page.locator(EmailBuilderSettingsLocators.selectStatusesDropDown);
        this.statusName = this.page.locator(EmailBuilderSettingsLocators.statusName);
        this.selectTemplateDropDown = this.page.locator(EmailBuilderSettingsLocators.selectTemplateDropDown);
        this.selectRecipientDropDown = this.page.locator(EmailBuilderSettingsLocators.selectRecipientDropDown);
        this.templateAndRecipientName = this.page.locator(EmailBuilderSettingsLocators.templateAndRecipientName);
        this.saveRuleButton = this.page.locator(EmailBuilderSettingsLocators.saveRuleButton);
        this.cancelRuleButton = this.page.locator(EmailBuilderSettingsLocators.cancelRuleButton);
        this.ruleNameRow = this.page.locator(EmailBuilderSettingsLocators.ruleNameRow);
        this.alreadyExistingRuleMessage = this.page.locator(EmailBuilderSettingsLocators.alreadyExistingRuleMessage).getByText('matching the already existing rule');
        this.XButton = this.page.locator(EmailBuilderSettingsLocators.XButton);

    }

    async gotoSettingsORG(name: string, password: string, organizationName: string) {
        const generalDetailsPage = new GeneralDetailsSettingsPage(this.page);
        await generalDetailsPage.gotoGeneralSettingsORG(name, password, organizationName);
    }


    async clickSettingsPage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openSettingsPage();
    }


    async clickEmailSettingsPage() {
        await this.EmailTab.click();
    }


    async clickEmailSendingRulesSubTab() {
        await this.emailSendingRulesSubTab.click();
    }

    async clickEmailTemplateSubTab() {
        await this.emailTemplateSubTab.click();
    }


    async addNewEmailTemplate(templateName: string, subject: string, content: string) {
        await this.addEmailTemplateButton.click();
        await clickAndFill(this.templateNameField, templateName);
        await clickAndFill(this.templateSubjectField, subject);
        await clickAndFill(this.templateContentField, content);
        await this.rtlTemplateCheckBox.check();
        await this.saveTemplateButton.click()
    }

    async addNewEmailRule(ruleName: string, tagName: tags, status: status, templateName: string, recipient: recipient) {
        await this.addEmailRule.click();
        await clickAndFill(this.ruleNameField, ruleName);
        await this.selectTagsDropDown.click();
        await this.tagsName.getByText(tagName).click();
        await this.selectStatusesDropDown.click();
        await this.statusName.getByText(status).click();
        await this.page.waitForTimeout(500);
        await this.selectTemplateDropDown.click({ delay: 50 });
        await this.templateAndRecipientName.getByText(templateName).first().click({ delay: 10 });
        await this.page.waitForTimeout(500);
        await this.selectRecipientDropDown.click();
        await this.templateAndRecipientName.getByText(recipient, { exact: true }).click();
        await this.page.waitForTimeout(500);
        await this.saveRuleButton.click()
    }

    async clickCloseMessageButton() {
        await this.XButton.click();
    }




    async getURL() {
        const url = this.page.url()
        return url;
    }
}