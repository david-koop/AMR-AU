import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";
import { GeneralDetailsSettingsPage } from "./GeneralDetailsSettingsPage";
import PositionsSettingsLocators from "../locators/PositionsSettingsLocator";


export const questionTypes = ['Address', 'Birth year', 'Email', 'Free Text',
    'List', 'Mobile phone', 'Rating', 'Veritas evaluation participation approval', 'Yes / No']


export class PositionsSettingsPage extends BasePage {



    private positionsTab: Locator;
    private formTemplatesSubTab: Locator;
    private pendingReasonsSubTab: Locator;
    private declineReasonsSubTab: Locator;
    private approveReasonsSubTab: Locator;
    private waiveReasonsSubTab: Locator;
    private closeReasonsSubTab: Locator;
    private noteTypesSubTab: Locator;
    private veritasEvaluationTypesSubTab: Locator;
    private addTemplateButton: Locator;
    private templateNameField: Locator;
    private saveTemplateName: Locator;
    private addQuestionButton: Locator;
    private selectTypeQuestionDropDown: Locator;
    private questionType: Locator;
    private questionNameField: Locator;
    private listRatingValueField_AfterFilter: Locator;
    private listRatingValueField_BeforeFilter: Locator;
    private plusAddIcon: Locator;
    private saveChangesButton: Locator;
    templateRowName: Locator;


    constructor(page: Page) {
        super(page)
        this.positionsTab = this.page.locator(PositionsSettingsLocators.positionsTab);
        this.formTemplatesSubTab = this.page.locator(PositionsSettingsLocators.formTemplatesSubTab);
        this.pendingReasonsSubTab = this.page.locator(PositionsSettingsLocators.pendingReasonsSubTab);
        this.declineReasonsSubTab = this.page.locator(PositionsSettingsLocators.declineReasonsSubTab);
        this.approveReasonsSubTab = this.page.locator(PositionsSettingsLocators.approveReasonsSubTab);
        this.waiveReasonsSubTab = this.page.locator(PositionsSettingsLocators.waiveReasonsSubTab);
        this.closeReasonsSubTab = this.page.locator(PositionsSettingsLocators.closeReasonsSubTab);
        this.noteTypesSubTab = this.page.locator(PositionsSettingsLocators.noteTypesSubTab);
        this.veritasEvaluationTypesSubTab = this.page.locator(PositionsSettingsLocators.veritasEvaluationTypesSubTab);
        this.addTemplateButton = this.page.locator(PositionsSettingsLocators.addTemplateButton);
        this.templateNameField = this.page.locator(PositionsSettingsLocators.templateNameField);
        this.saveTemplateName = this.page.locator(PositionsSettingsLocators.saveTemplateName);
        this.addQuestionButton = this.page.locator(PositionsSettingsLocators.addQuestionButton);
        this.selectTypeQuestionDropDown = this.page.locator(PositionsSettingsLocators.selectTypeQuestionDropDown);
        this.questionType = this.page.locator(PositionsSettingsLocators.questionType);
        this.questionNameField = this.page.locator(PositionsSettingsLocators.questionNameField);
        this.listRatingValueField_BeforeFilter = this.page.locator(PositionsSettingsLocators.listRatingValueField_BeforeFilter);
        this.listRatingValueField_AfterFilter = this.page.locator(PositionsSettingsLocators.listRatingValueField_AfterFilter);
        this.plusAddIcon = this.page.locator(PositionsSettingsLocators.plusAddIcon);
        this.saveChangesButton = this.page.locator(PositionsSettingsLocators.saveChangesButton);
        this.templateRowName = this.page.locator(PositionsSettingsLocators.templateRowName);
    }

    async gotoSettingsORG(name: string, password: string, organizationName: string) {
        const generalDetailsPage = new GeneralDetailsSettingsPage(this.page);
        await generalDetailsPage.gotoGeneralSettingsORG(name, password, organizationName);
    }


    async clickSettingsPage() {
        const mainDashboardPage = new MainDashboardPage(this.page);
        await mainDashboardPage.openSettingsPage();
    }


    async clickPositionsSettingsPage() {
        await this.positionsTab.click();
    }


    async clickFormTemplatesSubTab() {
        await this.formTemplatesSubTab.click();
    }

    async clickPendingReasonsSubTab() {
        await this.pendingReasonsSubTab.click();
    }


    async addNewTemplate(templateName: string, questionTypes: Array<string>) {
        await this.addTemplateButton.click();
        await clickAndFill(this.templateNameField, templateName);
        await this.saveTemplateName.click();

        for (const questionType of questionTypes) {
            await this.addQuestionButton.first().click();
            await this.selectTypeQuestionDropDown.click();
            await this.questionType.getByText(questionType).click();
            if (questionType === 'List' || questionType === 'Rating') {
                const parentDiv = this.listRatingValueField_BeforeFilter.filter({has:this.page.getByPlaceholder(questionType)});
                const tagNameInput = parentDiv.locator(this.listRatingValueField_AfterFilter);
                
                await clickAndFill(tagNameInput, '1');
                await parentDiv.locator(this.plusAddIcon).click();
                await clickAndFill(tagNameInput, '3');
                await parentDiv.locator(this.plusAddIcon).click();
                await clickAndFill(tagNameInput, '5');
                await parentDiv.locator(this.plusAddIcon).click();
            }
            await clickAndFill(this.questionNameField, questionType);
        }
        await this.page.waitForTimeout(1000);
        await this.saveChangesButton.first().click();
    }





    async getURL() {
        const url = this.page.url()
        return url;
    }
}