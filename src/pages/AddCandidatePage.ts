import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { MainDashboardPage } from "./MainDashboardPage";
import { clickAndFill } from "../utils/pageUtils";
import AddCandidateLocators from "../locators/AddCandidateLocator";

export type language = 'Arabic' | 'English' | 'Hebrew' | 'Russian'
export type gender = 'Male' | 'Female'


export class AddCandidatePage extends BasePage {




    private firstNameField: Locator;
    private lastNameField: Locator;
    private birthYearDropdown: Locator;
    private yearsList: Locator;
    private mobilePhoneField: Locator;
    private emailField: Locator;
    private candidateIDField: Locator;
    private candidateAPNField: Locator;
    private streetFiled: Locator;
    private houseField: Locator;
    private genderMaleRadioButton: Locator;
    private genderFemaleRadioButton: Locator;
    private processStartDateCalendarField: Locator;
    private titleCalendar: Locator;
    private yearCalendarValue: Locator;
    private monthCalendarValue: Locator;
    private dayCalendarValue: Locator;
    private selectCityDropdown_Input: Locator;
    private cityName: Locator;
    private selectPositionDropdown: Locator;
    private positionsName: Locator;
    private selectTestLanguageDropdown: Locator;
    private languageName: Locator;
    private extraTimeField: Locator;
    private saveButton: Locator;
    private saveWithoutMergeButton: Locator;
    candidateDetailsTitle: Locator;
    MergeCandidateTitle: Locator;
    successSaveMessage: Locator;



    constructor(page: Page) {
        super(page)
        this.firstNameField = this.page.locator(AddCandidateLocators.firstNameField);
        this.lastNameField = this.page.locator(AddCandidateLocators.lastNameField);
        this.birthYearDropdown = this.page.locator(AddCandidateLocators.birthYearDropdown);
        this.yearsList = this.page.locator(AddCandidateLocators.yearsList);
        this.mobilePhoneField = this.page.locator(AddCandidateLocators.mobilePhoneField);
        this.emailField = this.page.locator(AddCandidateLocators.emailField);
        this.candidateIDField = this.page.locator(AddCandidateLocators.candidateIDField);
        this.candidateAPNField = this.page.locator(AddCandidateLocators.candidateAPNField);
        this.streetFiled = this.page.locator(AddCandidateLocators.streetFiled);
        this.houseField = this.page.locator(AddCandidateLocators.houseField);
        this.genderMaleRadioButton = this.page.locator(AddCandidateLocators.genderMaleRadioButton);
        this.genderFemaleRadioButton = this.page.locator(AddCandidateLocators.genderFemaleRadioButton);
        this.processStartDateCalendarField = this.page.locator(AddCandidateLocators.processStartDateCalendarField);
        this.titleCalendar = this.page.locator(AddCandidateLocators.titleCalendar);
        this.yearCalendarValue = this.page.locator(AddCandidateLocators.yearCalendarValue);
        this.monthCalendarValue = this.page.locator(AddCandidateLocators.monthCalendarValue);
        this.dayCalendarValue = this.page.locator(AddCandidateLocators.dayCalendarValue);
        this.selectCityDropdown_Input = this.page.locator(AddCandidateLocators.selectCityDropdown_Input);
        this.cityName = this.page.locator(AddCandidateLocators.cityName);
        this.selectPositionDropdown = this.page.locator(AddCandidateLocators.selectPositionDropdown);
        this.positionsName = this.page.locator(AddCandidateLocators.positionsName);
        this.selectTestLanguageDropdown = this.page.locator(AddCandidateLocators.selectTestLanguageDropdown);
        this.languageName = this.page.locator(AddCandidateLocators.languageName);
        this.extraTimeField = this.page.locator(AddCandidateLocators.extraTimeField);
        this.saveButton = this.page.locator(AddCandidateLocators.saveButton);
        this.MergeCandidateTitle = this.page.locator(AddCandidateLocators.MergeCandidateTitle);
        this.saveWithoutMergeButton = this.page.locator(AddCandidateLocators.saveWithoutMergeButton);
        this.successSaveMessage = this.page.locator(AddCandidateLocators.successSaveMessage);
        this.candidateDetailsTitle = this.page.locator(AddCandidateLocators.candidateDetailsTitle);

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




    async clickAndFillPersonalDetails(firstName: string, lastName: string, mobilePhone: string, email: string, candidateID: string, street: string, house: string) {
        await clickAndFill(this.firstNameField, firstName);
        await clickAndFill(this.lastNameField, lastName);
        await clickAndFill(this.mobilePhoneField, mobilePhone);
        await clickAndFill(this.emailField, email);
        await clickAndFill(this.candidateIDField, candidateID);
        await clickAndFill(this.streetFiled, street);
        await clickAndFill(this.houseField, house);
    }

    async selectBirthAndGenderAndCity(birthYear: string, gender: gender, cityNameField: string) {
        await this.birthYearDropdown.click();
        await this.yearsList.getByText(birthYear).click();
        if (gender === 'Male') {
            await this.genderMaleRadioButton.click();
        } else {
            await this.genderFemaleRadioButton.click();
        }
        await clickAndFill(this.selectCityDropdown_Input, cityNameField);
        await this.cityName.getByText(cityNameField).first().click();
    }



    async insertProcessStartDate(year: string, month: string, day: string) {
        await this.processStartDateCalendarField.click();
        await this.titleCalendar.click();
        await this.titleCalendar.click();
        await this.yearCalendarValue.getByText(year).click();
        await this.monthCalendarValue.getByText(month).click();
        await this.dayCalendarValue.getByText(day).first().click();
    }

    async fillEvaluationDetails(positionName: string, testLanguage: language, extraTime: string) {
        await this.selectPositionDropdown.click();
        await this.positionsName.getByText(positionName).first().click();
        await this.selectTestLanguageDropdown.click();
        await this.languageName.getByText(testLanguage).click();
        await clickAndFill(this.extraTimeField, extraTime);
    }

    async saveCandidate() {
        await this.saveButton.click();
    }

    async checkMerge() {
        await this.MergeCandidateTitle.isVisible({ timeout: 2000 });
        await this.saveWithoutMergeButton.click();
    }





    async getURL() {
        const url = this.page.url()
        return url;
    }
}


export function generateID(): number {

    return Math.floor(Math.random() * 9000000) + 1000000;
}

export function getYear(): number {
    const currentDate = new Date();
    return currentDate.getFullYear();
}

export function getDay(): number {
    const currentDate = new Date();
    return currentDate.getDate();
}

export function getMonth(): string {
    const currentDate = new Date();
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const monthIndex = currentDate.getMonth();
    return months[monthIndex];
}

export function getRandomLetters(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const secondLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const thirdLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    
    return firstLetter + secondLetter + thirdLetter;
  }

  export function generateTwoNumbers(): number {

    return Math.floor(Math.random() * 90) + 10;
}