import { expect } from '@playwright/test';
import { test } from '../fixtures/pages.fixture';

test.describe('Selenium Playground Tests - Drag and Drop', () => {
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
});