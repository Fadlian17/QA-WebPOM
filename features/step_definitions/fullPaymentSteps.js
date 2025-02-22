const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/loginPage');
const { InventoryPage } = require('../../pages/inventoryPage');
const { CartPage } = require('../../pages/cartPage');
const { CheckoutPage } = require('../../pages/checkoutPage');
const { CheckoutCompletePage } = require('../../pages/checkoutCompletePage');

Given('I am logged in as {string} with password {string}', async function (username, password) {
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
    await loginPage.login(username, password);
});

When('I add an item to the cart', async function () {
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addItemToCart();
});

When('I add multiple items {string}, {string} to the cart', async function (item1, item2) {
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addItemToCart(item1);
    await inventoryPage.addItemToCart(item2);
});

When('I add {string} with quantity {int} to the cart', async function (item, quantity) {
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addItemToCart(item, quantity);
});

When('I proceed to checkout', async function () {
    const inventoryPage = new InventoryPage(this.page);
    const cartPage = new CartPage(this.page);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
});

When('I enter checkout information {string}, {string}, {string}', async function (firstName, lastName, postalCode) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.enterCheckoutInformation(firstName, lastName, postalCode);
    await checkoutPage.finishCheckout();
});

Then('the checkout should be complete', async function () {
    const checkoutCompletePage = new CheckoutCompletePage(this.page);
    const isComplete = await checkoutCompletePage.isCheckoutComplete();
    expect(isComplete).toBeTruthy();
});

Then('I should see a login error', async function () {
    const loginPage = new LoginPage(this.page);
    const loginError = await loginPage.getLoginError();
    expect(loginError).toContain('');
});

Then('I should see a checkout error', async function () {
    const checkoutPage = new CheckoutPage(this.page);
    const checkoutError = await checkoutPage.getCheckoutError();
    expect(checkoutError).toContain('');
});
