import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.lambdatest.com',
    trace: 'on',
    video: 'on',
    screenshot: 'on'
  },

  projects: [
    {
      name: "chrome:latest:Windows 11@lambdatest",
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: "pw-firefox:latest:macOS Catalina1@lambdatest",
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],
});
