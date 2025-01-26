const { Builder, By, until } = require('selenium-webdriver');
const { chromium } = require('playwright');

(async function seleniumPlaywrightCombo() {
    // Selenium Part
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the URL using Selenium
        await driver.get('https://www.saucedemo.com/');
        
        // Perform actions using Selenium
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        
        // Wait for the page to load
        await driver.wait(until.titleIs('Swag Labs'), 10000);
    } catch (error) {
        console.error('Selenium Error:', error);
    } finally {
        // Quit the Selenium driver
        await driver.quit();
    }

    // Playwright Part
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to the URL using Playwright
        await page.goto('https://www.saucedemo.com/');
        
        // Perform actions using Playwright
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        
        // // Wait for navigation with error handling
        // await page.waitForNavigation({ timeout: 60000 });
    } catch (error) {
        console.error('Playwright Error:', error);
    } finally {
        // Close the Playwright browser
        await browser.close();
    }
})();
