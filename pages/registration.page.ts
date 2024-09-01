import { Locator, Page } from '@playwright/test';
import { PageObject } from './page.interface';

export class RegistrationPage implements PageObject {
    page: Page;
    public successMessage: Locator;

    private nameInput: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private companyInput: Locator;
    private websiteInput: Locator;
    private countrySelect: Locator;
    private cityInput: Locator;
    private address1Input: Locator;
    private address2Input: Locator;
    private stateInput: Locator;
    private zipCodeInput: Locator;
    private submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = this.page.getByPlaceholder('Name', { exact: true });
        this.emailInput = this.page.getByLabel('Email');
        this.passwordInput = this.page.getByLabel('Password');
        this.companyInput = this.page.locator('#company');
        this.websiteInput = this.page.locator('#websitename');
        this.countrySelect = this.page.getByRole('combobox');
        this.cityInput = this.page.getByPlaceholder('City');
        this.address1Input = this.page.getByPlaceholder('Address 1');
        this.address2Input = this.page.getByPlaceholder('Address 2');
        this.stateInput = this.page.getByLabel('State');
        this.zipCodeInput = this.page.getByLabel('Zip Code');
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.successMessage = this.page.locator('.success-msg')
    }

    public async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    public async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    public async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    public async fillCompany(company: string) {
        await this.companyInput.fill(company);
    }

    public async fillWebsite(website: string) {
        await this.websiteInput.fill(website);
    }

    public async selectCountry(country: string) {
        await this.countrySelect.selectOption({ label: country });
    }

    public async fillCity(city: string) {
        await this.cityInput.fill(city);
    }

    public async fillAddress1(address1: string) {
        await this.address1Input.fill(address1);
    }

    public async fillAddress2(address2: string) {
        await this.address2Input.fill(address2);
    }

    public async fillState(state: string) {
        await this.stateInput.fill(state);
    }

    public async fillZipCode(zipCode: string) {
        await this.zipCodeInput.fill(zipCode);
    }

    public async submitForm() {
        await this.submitButton.click();
    }
}