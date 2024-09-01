import { Locator, Page } from "@playwright/test";
import { PageObject } from "./page.interface";


export class SimpleFormDemoPage implements PageObject {
    page: Page;
    private userMessageInput: Locator;
    private getCheckedValueButton: Locator;
    public messageText: Locator;
    constructor(page: Page) {
        this.page = page;
        this.userMessageInput = this.page.locator('input#user-message');
        this.getCheckedValueButton = this.page.getByRole('button', { name: 'Get Checked Value' });
        this.messageText = this.page.locator('#message');
    }

    public async fillUserMessage(message: string) {
        await this.userMessageInput.fill(message);
    }

    public async clickGetCheckedValue() {
        await this.getCheckedValueButton.click();
    }
}
