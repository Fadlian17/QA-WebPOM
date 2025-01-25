// tests/parallelTests.spec.js
import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');

test.describe.parallel('Sauce Demo Tests', () => {
    test('Login and verify inventory page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.isLoaded();

        // Verify that the inventory page is loaded
        expect(await page.url()).toBe('https://www.saucedemo.com/v1/inventory.html');
    });
});
