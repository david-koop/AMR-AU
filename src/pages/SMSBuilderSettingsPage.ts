import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";
import { GeneralDetailsSettingsPage } from "./GeneralDetailsSettingsPage";
import SMSBuilderSettingsLocators from "../locators/SMSBuilderSettingsLocator";


export type tags = 'CV review' | 'Evaluation center step tag' | 'Group step tag' | 'Initial evaluation' |
    'Online Survey' | 'Personal evaluation' | 'Personal interview' | 'Phone Interview' | 'Sign' | 'Veritas evaluation step tag'

export type status = 'Approved' | 'Assigned to Personal evaluation' | 'Declined' | 'Duplicated' |
    'Form Sent' | 'In Progress' | 'New' | 'Not Required' | 'Waived'



export class SMSBuilderSettingsPage extends BasePage {





    private SMSTab: Locator;
    private SMSSendingRulesSubTab: Locator;
    private SMSTemplateSubTab: Locator;
    private SMSQueueSubTab: Locator;
    private addEmailTemplateButton: Locator;
    private templateNameField: Locator;
    private templateContentField: Locator;
    private addTagDropdown: Locator;
    private saveTemplateButton: Locator;
    private addEmailRule: Locator;
    private ruleNameField: Locator;
    private selectTagsDropDown: Locator;
    private tagsName: Locator;
    private selectStatusesDropDown: Locator;
    private statusName: Locator;
    private selectTemplateDropDown: Locator;
    private templateName: Locator;
    private saveRuleButton: Locator;
    private XButton: Locator;
    templateRowName: Locator;
    ruleNameRow: Locator;
    successSaveMessage: Locator;
    cancelRuleButton: Locator;
    alreadyExistingRuleMessage: Locator;



    constructor(page: Page) {
        super(page)
        this.SMSTab = this.page.locator(SMSBuilderSettingsLocators.SMSTab);
        this.SMSSendingRulesSubTab = this.page.locator(SMSBuilderSettingsLocators.SMSSendingRulesSubTab);
        this.SMSTemplateSubTab = this.page.locator(SMSBuilderSettingsLocators.SMSTemplateSubTab);
        this.SMSQueueSubTab = this.page.locator(SMSBuilderSettingsLocators.SMSQueueSubTab);
        this.addEmailTemplateButton = this.page.locator(SMSBuilderSettingsLocators.addSMSTemplateButton);
        this.templateNameField = this.page.locator(SMSBuilderSettingsLocators.templateNameField);
        this.templateContentField = this.page.locator(SMSBuilderSettingsLocators.templateContentField);
        this.addTagDropdown = this.page.locator(SMSBuilderSettingsLocators.addTagDropdown);
        this.saveTemplateButton = this.page.locator(SMSBuilderSettingsLocators.saveTemplateButton);
        this.successSaveMessage = this.page.locator(SMSBuilderSettingsLocators.successSaveMessage);
        this.templateRowName = this.page.locator(SMSBuilderSettingsLocators.templateRowName);
        this.addEmailRule = this.page.locator(SMSBuilderSettingsLocators.addEmailRule);
        this.ruleNameField = this.page.locator(SMSBuilderSettingsLocators.ruleNameField);
        this.selectTagsDropDown = this.page.locator(SMSBuilderSettingsLocators.selectTagsDropDown);
        this.tagsName = this.page.locator(SMSBuilderSettingsLocators.tagsName);
        this.selectStatusesDropDown = this.page.locator(SMSBuilderSettingsLocators.selectStatusesDropDown);
        this.statusName = this.page.locator(SMSBuilderSettingsLocators.statusName);
        this.selectTemplateDropDown = this.page.locator(SMSBuilderSettingsLocators.selectTemplateDropDown);
        this.templateName = this.page.locator(SMSBuilderSettingsLocators.templateName);
        this.saveRuleButton = this.page.locator(SMSBuilderSettingsLocators.saveRuleButton);
        this.ruleNameRow = this.page.locator(SMSBuilderSettingsLocators.ruleNameRow);
        this.cancelRuleButton = this.page.locator(SMSBuilderSettingsLocators.cancelRuleButton);
        this.alreadyExistingRuleMessage = this.page.locator(SMSBuilderSettingsLocators.alreadyExistingRuleMessage).getByText('matching the already existing rule');
        this.XButton = this.page.locator(SMSBuilderSettingsLocators.XButton);

    }

    async gotoSettingsORG(name: string, password: string, organizationName: string) {
        const generalDetailsPage = new GeneralDetailsSettingsPage(this.page);
        await generalDetailsPage.gotoGeneralSettingsORG(name, password, organizationName);
    }


    async clickSettingsPage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openSettingsPage();
    }


    async clickSMSSettingsPage() {
        await this.SMSTab.click();
    }


    async clickSMSSendingRulesSubTab() {
        await this.SMSSendingRulesSubTab.click();
    }

    async clickSMSTemplateSubTab() {
        await this.SMSTemplateSubTab.click();
    }


    async addNewSMSTemplate(templateName: string, content: string) {
        await this.addEmailTemplateButton.click();
        await clickAndFill(this.templateNameField, templateName);
        await clickAndFill(this.templateContentField, content);
        await this.saveTemplateButton.click()
    }

    async addNewSMSRule(ruleName: string, tagName: tags, status: status, templateName: string,) {
        await this.addEmailRule.click();
        await clickAndFill(this.ruleNameField, ruleName);
        await this.selectTagsDropDown.click();
        await this.tagsName.getByText(tagName).click();
        await this.selectStatusesDropDown.click();
        await this.statusName.getByText(status).click();
        await this.page.waitForTimeout(500);
        await this.selectTemplateDropDown.click({ delay: 50 });
        await this.templateName.getByText(templateName).first().click({ delay: 10 });
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