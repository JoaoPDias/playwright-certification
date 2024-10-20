import { Locator, Page } from "@playwright/test";
import { PageObject } from "./page.interface";

export class DragDropSlidersPage implements PageObject {
    page: Page;
    public sliderValue: Locator;

    private slider: Locator;

    constructor(page: Page) {
        this.page = page;
        this.slider = this.page.locator('#slider3').getByRole('slider');
        this.sliderValue = this.page.locator('#slider3').locator('#rangeSuccess')
    }

    public async dragSliderToValue(value: number) {
        const boundingBox = await this.slider.boundingBox() ?? (() => { throw new Error('Bounding box not found') })();
        const targetX = boundingBox.x + boundingBox.width * value / 100;
        const targetY = boundingBox.y + boundingBox.height / 2;
        await this.dragSliderToPosition(targetX, targetY);
    }

    public async dragSliderByValue(value: string) {
        await this.slider.fill(value);
    }

    private async dragSliderToPosition(targetX: number, targetY: number) {
        await this.slider.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(targetX, targetY);
        await this.page.mouse.up();
    }

}