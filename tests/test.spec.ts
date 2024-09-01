import { expect } from '@playwright/test';
import { test } from '../fixtures/pages.fixture';

test('Simple Form Demo Validation', async ({ seleniumPlayground, simpleFormDemo }) => {
  await seleniumPlayground.selectMenuOption('Simple Form Demo');
  await expect(seleniumPlayground.page).toHaveURL(/simple-form-demo/)
  await simpleFormDemo.fillUserMessage('Welcome to Lambda Test');
  await simpleFormDemo.clickGetCheckedValue();
  await expect(simpleFormDemo.messageText).toContainText('Welcome to Lambda Test');
});

test('Drag & Drop Sliders Validation', async ({ seleniumPlayground, dragDropSliders }) => {
  // This test have to ways to be done, using the fill method directly or using the bounding Box Calculations method
  // First option
  await seleniumPlayground.selectMenuOption('Drag & Drop Sliders');
  await dragDropSliders.dragSliderToValue(93);
  await expect(dragDropSliders.sliderValue).toHaveText('95');

  // Second option
  await dragDropSliders.dragSliderByValue('50');
  await dragDropSliders.dragSliderByValue('95');
  await expect(dragDropSliders.sliderValue).toHaveText('95');

});

test('Input Form Submit Validation', async ({ seleniumPlayground, registration }) => {
  await seleniumPlayground.selectMenuOption('Input Form Submit');
  await registration.fillName('John Doe');
  await registration.fillEmail('test@lambdatest.com');
  await registration.fillPassword('@password');
  await registration.fillCompany('LambdaTest');
  await registration.fillWebsite('https://lambdatest.com');
  await registration.selectCountry('United States');
  await registration.fillCity('San Francisco');
  await registration.fillAddress1('123 Main St');
  await registration.fillAddress2('Apt 123');
  await registration.fillState('California');
  await registration.fillZipCode('94107');
  await registration.submitForm();
  await expect(registration.successMessage).toBeVisible();
  await expect(registration.successMessage).toContainText('Thanks for contacting us, we will get back to you shortly.');
});