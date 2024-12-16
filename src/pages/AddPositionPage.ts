import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";
import AddPositionLocators from "../locators/AddPositionLocator";

export type stepType = 'Generic' | 'Group' | 'Online Survey' | 'Personal evaluation' | 'Veritas Evaluation'
export type statusName = 'Active' | 'Closed'
export type tags = 'Veritas evaluation step tag' | 'Sign' | 'Phone Interview' | 'Personal evaluation' | 'Personal interview' | 'Online Survey' |
    'Initial evaluation' | 'Evaluation center step tag' | 'CV review'
export type method = 'Email' | 'SMS'


export class AddPositionPage extends BasePage {





    private positionTitle: Locator;
    private selectBranchDropdown: Locator;
    private branchName: Locator;
    private savePositionInGeneralDetailsButton: Locator;
    private generalDetailsSubTab: Locator;
    private recruitingProcessSubTab: Locator;
    private addNewStepButton: Locator;
    private stepNameField: Locator;
    private selectStepTypeDropdown: Locator;
    private stepTypeName: Locator;
    private addStepInGroupButton: Locator;
    private stepInGroupNameField: Locator;
    private addNewTagDropdown: Locator;
    private tagName: Locator;
    private selectCustomerDropdown: Locator;
    private customerName: Locator;
    private selectPositionDropdown: Locator;
    private positionsName: Locator;
    private selectEmailTemplateDropdown: Locator;
    private emailTemplateName: Locator;
    private SMSCheckBox: Locator;
    private selectSMSTemplateDropdown: Locator;
    private SMSTemplateName: Locator;
    private templateName: Locator;
    private savePositionInProcessButton: Locator;
    private currentPositionStatusDropdown: Locator;
    private statusName: Locator;
    private duplicateButton: Locator;
    private goToNewPosition:Locator;
    private genericLoadTemplateButton: Locator;
    private personalLoadTemplateButton:Locator;
    private loadTemplateName: Locator;
    private loadTemplateOKButton: Locator;
    private Email_SMSRadioButton: Locator;
    private sendingTypeManualRadioButton: Locator;
    private sendingTypeAutomaticRadioButton: Locator;
    private onlineSurveySelectTemplate: Locator;
    private settingsSurveyTab: Locator;
    private formsSurveyTab: Locator;
    private formTitleField: Locator;
    private formDescriptionField: Locator;
    successSaveMessage: Locator;



    constructor(page: Page) {
        super(page)
        this.positionTitle = this.page.locator(AddPositionLocators.positionTitle);
        this.selectBranchDropdown = this.page.locator(AddPositionLocators.selectBranchDropdown);
        this.branchName = this.page.locator(AddPositionLocators.branchName);
        this.savePositionInGeneralDetailsButton = this.page.locator(AddPositionLocators.savePositionInGeneralDetailsButton);
        this.generalDetailsSubTab = this.page.locator(AddPositionLocators.generalDetailsSubTab);
        this.recruitingProcessSubTab = this.page.locator(AddPositionLocators.recruitingProcessSubTab);
        this.addNewStepButton = this.page.locator(AddPositionLocators.addNewStepButton);
        this.stepNameField = this.page.locator(AddPositionLocators.stepNameField);
        this.selectStepTypeDropdown = this.page.locator(AddPositionLocators.selectStepTypeDropdown);
        this.stepTypeName = this.page.locator(AddPositionLocators.stepTypeName);
        this.addStepInGroupButton = this.page.locator(AddPositionLocators.addStepInGroupButton);
        this.stepInGroupNameField = this.page.locator(AddPositionLocators.stepInGroupNameField);
        this.addNewTagDropdown = this.page.locator(AddPositionLocators.addNewTagDropdown);
        this.tagName = this.page.locator(AddPositionLocators.tagName);
        this.selectCustomerDropdown = this.page.locator(AddPositionLocators.selectCustomerDropdown);
        this.customerName = this.page.locator(AddPositionLocators.customerName);
        this.selectPositionDropdown = this.page.locator(AddPositionLocators.selectPositionDropdown);
        this.positionsName = this.page.locator(AddPositionLocators.positionsName);
        this.selectEmailTemplateDropdown = this.page.locator(AddPositionLocators.selectEmailTemplateDropdown);
        this.emailTemplateName = this.page.locator(AddPositionLocators.emailTemplateName);
        this.SMSCheckBox = this.page.locator(AddPositionLocators.SMSCheckBox);
        this.selectSMSTemplateDropdown = this.page.locator(AddPositionLocators.selectSMSTemplateDropdown);
        this.SMSTemplateName = this.page.locator(AddPositionLocators.SMSTemplateName);
        this.templateName = this.page.locator(AddPositionLocators.templateName);
        this.savePositionInProcessButton = this.page.locator(AddPositionLocators.savePositionInProcessButton);
        this.currentPositionStatusDropdown = this.page.locator(AddPositionLocators.currentPositionStatusDropdown);
        this.statusName = this.page.locator(AddPositionLocators.statusName);
        this.duplicateButton = this.page.locator(AddPositionLocators.duplicateButton);
        this.goToNewPosition = this.page.locator(AddPositionLocators.goToNewPosition);
        this.successSaveMessage = this.page.locator(AddPositionLocators.successSaveMessage);
        this.genericLoadTemplateButton = this.page.locator(AddPositionLocators.genericLoadTemplateButton);
        this.personalLoadTemplateButton = this.page.locator(AddPositionLocators.personalLoadTemplateButton).getByRole('button', { name: 'Load Template' });
        this.loadTemplateName = this.page.locator(AddPositionLocators.loadTemplateName);
        this.loadTemplateOKButton = this.page.locator(AddPositionLocators.loadTemplateOKButton);
        this.Email_SMSRadioButton = this.page.locator(AddPositionLocators.Email_SMSRadioButton);
        this.sendingTypeManualRadioButton = this.page.locator(AddPositionLocators.sendingTypeManualRadioButton);
        this.sendingTypeAutomaticRadioButton = this.page.locator(AddPositionLocators.sendingTypeAutomaticRadioButton);
        this.onlineSurveySelectTemplate = this.page.locator(AddPositionLocators.onlineSurveySelectTemplate);
        this.settingsSurveyTab = this.page.locator(AddPositionLocators.settingsSurveyTab);
        this.formsSurveyTab = this.page.locator(AddPositionLocators.formsSurveyTab);
        this.formTitleField = this.page.locator(AddPositionLocators.formTitleField);
        this.formDescriptionField = this.page.locator(AddPositionLocators.formDescriptionField);

    }

    async gotoAddPositionPage(name: string, password: string, organizationName: string) {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.gotoDashboardWithLogin(name, password);
        await mainDashboardPage.navigateToYourOrganization(organizationName);
        await mainDashboardPage.openAddPositionPage();
    }


    async clickAddPositionPage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openAddPositionPage();
    }


    async clickGeneralDetailsSubTabPage() {
        await this.generalDetailsSubTab.click();
    }


    async clickRecruitingProcessSubTab() {
        await this.recruitingProcessSubTab.click();
    }

    async fillGeneralDetails(positionTitle: string, branchName: string) {
        await clickAndFill(this.positionTitle, positionTitle);
        await this.selectBranchDropdown.click();
        await this.branchName.getByText(branchName).click()
    }

    async clickAndFillRecruitingProcess(stepNameField: string, stepTypeGroup: stepType, stepInGroupNameField: string, veritasStepType: stepType, customerName: string, positionName: string, emailTemplateName: string, SMSTemplateName: string) {
        await this.clickRecruitingProcessSubTab();
        await this.addNewStepButton.click();
        await clickAndFill(this.stepNameField, stepNameField);
        await this.selectStepTypeDropdown.click();
        await this.stepTypeName.getByText(stepTypeGroup).first().click();
        await this.addStepInGroupButton.click();
        await clickAndFill(this.stepInGroupNameField, stepInGroupNameField);
        await this.selectStepTypeDropdown.click();
        await this.stepTypeName.getByText(veritasStepType).click();
        await this.selectCustomerDropdown.click();
        await this.customerName.getByText(customerName).click();
        await this.selectPositionDropdown.click();
        await this.positionsName.getByText(positionName).click();
        await this.selectEmailTemplateDropdown.click();
        await this.emailTemplateName.getByText(emailTemplateName).click();
        await this.SMSCheckBox.check();
        await this.selectSMSTemplateDropdown.click();
        await this.SMSTemplateName.getByText(SMSTemplateName).click();

    }

    async addGenericStepInGroup(genericName: string, stepTypeGeneric: stepType, tagName: tags, loadTemplateName: string) {
        await this.addStepInGroupButton.click();
        await clickAndFill(this.stepInGroupNameField, genericName);
        await this.selectStepTypeDropdown.click();
        await this.stepTypeName.getByText(stepTypeGeneric).click();
        await this.addNewTagDropdown.click();
        await this.tagName.getByText(tagName).first().click();
        await this.genericLoadTemplateButton.click();
        await this.loadTemplateName.getByText(loadTemplateName).first().click()
        await this.loadTemplateOKButton.click();
    }

    async addOnlineSurveyStepInGroup(onlineSurveyName: string, stepTypeOnline: stepType, emailMethod: method, emailTemplateName: string, smsMethod: method, SMSTemplateName: string, formTitleField: string, formDescriptionField: string) {
        await this.addStepInGroupButton.click();
        await clickAndFill(this.stepInGroupNameField, onlineSurveyName);
        await this.selectStepTypeDropdown.click()
        await this.stepTypeName.getByText(stepTypeOnline).click();
        await this.Email_SMSRadioButton.getByText(emailMethod).check();
        await this.onlineSurveySelectTemplate.click();
        await this.templateName.getByText(emailTemplateName).click()
        await this.Email_SMSRadioButton.getByText(smsMethod).check();
        await this.onlineSurveySelectTemplate.click();
        await this.templateName.getByText(SMSTemplateName).click();
        await this.sendingTypeManualRadioButton.check();
        await this.formsSurveyTab.click();
        await clickAndFill(this.formTitleField, formTitleField);
        await clickAndFill(this.formDescriptionField, formDescriptionField)
    }

    async addPersonalEvaluationStepInGroup(PersonalName: string, stepTypePersonal: stepType, tagName: tags, loadTemplateName: string) {
        await this.addStepInGroupButton.click();
        await clickAndFill(this.stepInGroupNameField, PersonalName);
        await this.selectStepTypeDropdown.click();
        await this.stepTypeName.getByText(stepTypePersonal).click();
        await this.addNewTagDropdown.click();
        await this.tagName.getByText(tagName).nth(1).click();
        await this.personalLoadTemplateButton.click();
        await this.loadTemplateName.getByText(loadTemplateName).nth(2).click()
        await this.loadTemplateOKButton.click();
    }

    async activePosition(statusName: statusName) {
        await this.currentPositionStatusDropdown.click();
        await this.statusName.getByText(statusName).click();
    }
    async savePosition() {
        if(await this.savePositionInProcessButton.isVisible()){
            
            await this.savePositionInProcessButton.click();
        }else{
            await this.savePositionInGeneralDetailsButton.click()
        }
    }

    async duplicatePosition(){
        await this.duplicateButton.click();
        await this.goToNewPosition.click();
    }






    async getURL() {
        const url = this.page.url()
        return url;
    }
}