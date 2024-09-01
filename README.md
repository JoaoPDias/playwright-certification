# Playwright Test Suite with Page Objects and Fixtures

This repository demonstrates how to set up a Playwright test suite using the Page Object Model (POM) and custom fixtures. The code is structured to promote maintainability, reusability, and clarity in testing web applications.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Page Objects](#page-objects)
4. [Custom Fixtures](#custom-fixtures)
5. [Writing Tests](#writing-tests)
6. [Tests](#tests)

## Introduction

This project uses [Playwright](https://playwright.dev/) for end-to-end testing. It is designed using the Page Object Model (POM) to create reusable components that represent different parts of the web application. The tests leverage custom fixtures to inject these page objects, making the tests more modular and readable.

## Project Structure

```plaintext
├── tests/
│   ├── fixtures/
│   │   └── pages.fixture.ts
│   ├── pages/
│   │   ├── drag-drop-sliders.page.ts
│   │   ├── registration.page.ts
│   │   ├── selenium-playground.page.ts
│   │   └── simple-form-demo.page.ts
│   ├── tests/
│   │   ├── simple-form-demo.spec.ts
│   │   ├── drag-drop-sliders.spec.ts
│   │   └── input-form-submit.spec.ts
├── package.json
├── playwright.config.ts
└── README.md
```

- `fixtures/`: Contains the custom fixtures that inject the page objects into the tests.
- `pages/`: Contains the Page Object classes that represent different pages or components of the web application.
- `tests/`: Contains the test files.

## Page Objects

### DragDropSlidersPage

This page object represents the Drag & Drop Sliders page. It provides methods to interact with sliders using both manual drag operations and direct value input.

```typescript
public async dragSliderToValue(value: number)
public async dragSliderByValue(value: string)
```

### RegistrationPage

This page object represents the Registration page. It provides methods to fill out the form fields and submit the form.

```typescript
public async fillName(name: string) 
public async fillEmail(email: string) 
public async fillPassword(password: string) 
public async fillCompany(company: string) 
public async fillWebsite(website: string) 
public async selectCountry(country: string) 
public async fillCity(city: string) 
public async fillAddress1(address1: string)
public async fillAddress2(address2: string)
public async fillState(state: string) 
public async fillZipCode(zipCode: string) 
public async submitForm() 

```

### SeleniumPlaygroundPage

This page object represents the Selenium Playground homepage. It provides methods to navigate to different sections of the playground.

```typescript
public async goTo()
public async selectMenuOption(linkName: string)
```

### SimpleFormDemoPage

This page object represents the Simple Form Demo page. It provides methods to interact with the simple input form.

```typescript
public async fillUserMessage(message: string)
public async clickGetCheckedValue()
```

## Custom Fixtures

The `pages.fixture.ts` file extends the base Playwright test with custom fixtures that inject the page objects:

```typescript
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
    ...
})
```

These fixtures are then used in the tests to access the respective page objects.

## Writing Tests

When writing tests, you can utilize the injected page objects from the custom fixtures. Here's an example:

```typescript
import { expect } from '@playwright/test';
import { test } from '../fixtures/pages.fixture';

test('Simple Form Demo Validation', async ({ seleniumPlayground, simpleFormDemo }) => {
  await seleniumPlayground.selectMenuOption('Simple Form Demo');
  await expect(seleniumPlayground.page).toHaveURL(/simple-form-demo/);
  await simpleFormDemo.fillUserMessage('Welcome to Lambda Test');
  await simpleFormDemo.clickGetCheckedValue();
  await expect(simpleFormDemo.messageText).toContainText('Welcome to Lambda Test');
});
```

## Tests

### Simple Form Demo Validation

This test navigates to the Simple Form Demo page, fills in a user message, and verifies the displayed message.

### Drag & Drop Sliders Validation

This test interacts with the sliders on the Drag & Drop Sliders page, testing both direct value input and drag operations.

### Input Form Submit Validation

This test fills out the registration form and verifies that the success message is displayed after submission.


## Configuration

The `playwright.config.ts` file is configured as follows:

- **testDir**: Specifies the directory where the tests are located (`./tests`).
- **fullyParallel**: Enables running tests in parallel.
- **forbidOnly**: Prevents committing `.only` tests if the `CI` environment variable is set.
- **retries**: Sets the number of retries for failed tests. If `CI` is set, retries are set to 2; otherwise, 0.
- **workers**: Limits the number of workers to 1 if `CI` is set; otherwise, it uses the default.
- **reporter**: Sets the reporter to `html` for generating HTML reports.
- **use**: Contains global settings for all tests:
  - **baseURL**: The base URL for the tests (`https://www.lambdatest.com`).
  - **trace**: Enables tracing (`on`).
  - **video**: Records video of the tests (`on`).

## Package Scripts

The `package.json` file contains the following scripts:

- **scripts**:
  - **test**: Runs the Playwright tests using `npx playwright test`.
  - **postinstall**: Installs Playwright with dependencies using `npx playwright install --with-deps`.

## Installing and Running Tests
Install the dependencies using the following command:
```bash
npm install
```
To run the tests, use the following command:

```bash
npm run test