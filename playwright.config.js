// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [
    ['list'], // Default list reporter
    ['playwright-html', { outputFolder: 'html-report' }] // HTML reporter
  ],
  use: {
    headless: true, // Run tests in headless mode
  },
});
