import { test as base } from "@playwright/test";
import path from "path";
import { chromium } from "playwright";
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

// LambdaTest capabilities
const capabilitiesArray = [{
    browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 10",
        build: "Playwright TypeScript Build",
        name: "Playwright TypeScript Test",
        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        network: true,
        video: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
        tunnelName: "", // Optional
        geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
}, {
    browserName: "pw-firefox", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
        "platform": "macOS Catalina",
        build: "Playwright TypeScript Build",
        name: "Playwright TypeScript Test",
        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        network: true,
        video: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
        tunnelName: "", // Optional
        geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
}];

const getCapabilities = (configName: string, testName: string) => {
    let config = configName.split("@lambdatest")[0];
    let [browserName, browserVersion, platform] = config.split(":");
    let capabilities = capabilitiesArray.find((capability) => capability.browserName === browserName) ?? capabilitiesArray[0];
    capabilities.browserVersion = browserVersion;
    capabilities["LT:Options"].platform = platform;
    capabilities.browserName = browserName;
    capabilities["LT:Options"].name = testName;
}
const getErrorMessage = (obj, keys) =>
    keys.reduce(
        (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
        obj
    );

export const test = base.extend<Pages>({
    page: async ({ page }, use, testInfo) => {
        // Configure LambdaTest platform for cross-browser testing
        let fileName = testInfo.file.split(path.sep).pop();
        if (testInfo.project.name.match(/lambdatest/)) {
            const capabilities = getCapabilities(
                testInfo.project.name,
                `${testInfo.title} - ${fileName}`
            );

            const browser = await chromium.connect({
                wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                    JSON.stringify(capabilities)
                )}`,
            });

            const ltPage = await browser.newPage(testInfo.project.use);
            await use(ltPage);

            const testStatus = {
                action: "setTestStatus",
                arguments: {
                    status: testInfo.status,
                    remark: getErrorMessage(testInfo, ["error", "message"]),
                },
            };
            await ltPage.evaluate(() => { },
                `lambdatest_action: ${JSON.stringify(testStatus)}`);
            await ltPage.close();
            await browser.close();
        } else {
            // Run tests in local in case of local config provided
            await use(page);
        }
    },
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