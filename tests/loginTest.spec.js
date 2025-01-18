const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test('User can log in with valid credentials', async ({ page }) => {
    // Instantiate the LoginPage object with the current page
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigate();

    // Perform login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Add assertions to verify successful login by checking the URL
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
});
