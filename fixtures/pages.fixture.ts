import { test as base } from "@playwright/test";
import { DragDropSlidersPage } from "../pages/drag-drop-sliders.page";
import { RegistrationPage } from "../pages/registration.page";
import { SeleniumPlaygroundPage } from "../pages/selenium-playground.page";
import { SimpleFormDemoPage } from "../pages/simple-form-demo.page";
type Pages = {
    seleniumPlayground: SeleniumPlaygroundPage,
    simpleFormDemo: SimpleFormDemoPage,
    dragDropSliders: DragDropSlidersPage,
    registration: RegistrationPage
}

export const test = base.extend<Pages>({
    seleniumPlayground: async ({ page }, use) => {
        const seleniumPlayground = new SeleniumPlaygroundPage(page);
        await seleniumPlayground.goTo();
        await use(seleniumPlayground);
    },
    simpleFormDemo: async ({ page }, use) => {
        const simpleFormDemo = new SimpleFormDemoPage(page);
        await use(simpleFormDemo);
    },
    dragDropSliders: async ({ page }, use) => {
        const dragDropSliders = new DragDropSlidersPage(page);
        await use(dragDropSliders);
    },
    registration: async ({ page }, use) => {
        const registration = new RegistrationPage(page);
        await use(registration);
    }
})