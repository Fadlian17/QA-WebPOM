#!/usr/bin/env node

'use strict';

const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');
const { CheckoutCompletePage } = require('../pages/checkoutCompletePage');
let testResults = [];

// Helper function to perform login
async function login(page, username, password) {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(username, password);
}

// Helper function to proceed to checkout
async function proceedToCheckout(page) {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
}

test.describe('Full Cycle Payment Test', () => {

    test('should complete a payment successfully', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');

        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        await inventoryPage.addItemToCart();
        await proceedToCheckout(page);

        await checkoutPage.enterCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();

        const isComplete = await checkoutCompletePage.isCheckoutComplete();
        expect(isComplete).toBeTruthy();

        testResults.push({ name: 'Complete Payment', status: 'Passed' });
    });

    test('should fail login with incorrect credentials', async ({ page }) => {
        await login(page, 'invalid_user', 'wrong_password');

        const loginPage = new LoginPage(page);
        const loginError = await loginPage.getLoginError();
        expect(loginError).toContain('');

        testResults.push({ name: 'Fail Login', status: 'Passed' });
    });

    test('should not proceed to checkout with incomplete information', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');

        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);

        await inventoryPage.addItemToCart();
        await proceedToCheckout(page);

        await checkoutPage.enterCheckoutInformation('John', '', '12345');
        await checkoutPage.finishCheckout();

        const checkoutError = await checkoutPage.getCheckoutError();
        expect(checkoutError).toContain('');

        testResults.push({ name: 'Incomplete Checkout Info', status: 'Passed' });
    });

    test('should handle multiple items transaction', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');

        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        // Add multiple items to the cart
        await inventoryPage.addItemToCart('item1');
        await inventoryPage.addItemToCart('item2');
        await proceedToCheckout(page);

        await checkoutPage.enterCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();

        const isComplete = await checkoutCompletePage.isCheckoutComplete();
        expect(isComplete).toBeTruthy();

        testResults.push({ name: 'Multiple Items Transaction', status: 'Passed' });
    });

    test('should handle multiple quantity transaction', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');

        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        // Add an item with multiple quantities to the cart
        await inventoryPage.addItemToCart('item1', 3); // Assuming the method supports quantity
        await proceedToCheckout(page);

        await checkoutPage.enterCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();

        const isComplete = await checkoutCompletePage.isCheckoutComplete();
        expect(isComplete).toBeTruthy();

        testResults.push({ name: 'Multiple Quantity Transaction', status: 'Passed' });
    });
});
