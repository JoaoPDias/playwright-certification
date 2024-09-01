import { Page } from "@playwright/test";
import { PageObject } from "./page.interface";

export class SeleniumPlaygroundPage implements PageObject {
    page: Page;
    private menuLink = (linkName: string) => this.page.getByRole('link', { name: linkName });
    constructor(page: Page) {
        this.page = page;
    }

    public async goTo() {
        await this.page.goto('/selenium-playground');
    }

    public async selectMenuOption(linkName: string) {
        await this.menuLink(linkName).click();
    }
}

