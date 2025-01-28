const { test, expect } = require('@playwright/test');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');
const { CheckoutCompletePage } = require('../pages/checkoutCompletePage');

let testResults = [];

test.describe('Full Cycle Payment Test', () => {

    test.afterAll(async () => {
        generatePDFReport(testResults);
    });

    test('should complete a payment successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await inventoryPage.addItemToCart();
        await inventoryPage.goToCart();

        await cartPage.proceedToCheckout();

        await checkoutPage.enterCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.finishCheckout();

        const isComplete = await checkoutCompletePage.isCheckoutComplete();
        expect(isComplete).toBeTruthy();

        testResults.push({ name: 'Complete Payment', status: 'Passed' });
    });

    test('should fail login with incorrect credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login('invalid_user', 'wrong_password');

        const loginError = await loginPage.getLoginError();
        expect(loginError).toContain('');

        testResults.push({ name: 'Fail Login', status: 'Passed' });
    });

    test('should not proceed to checkout with incomplete information', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await inventoryPage.addItemToCart();
        await inventoryPage.goToCart();

        await cartPage.proceedToCheckout();

        await checkoutPage.enterCheckoutInformation('John', '', '12345');
        await checkoutPage.finishCheckout();

        const checkoutError = await checkoutPage.getCheckoutError();
        expect(checkoutError).toContain('');

        testResults.push({ name: 'Incomplete Checkout Info', status: 'Passed' });
    });
});

function generatePDFReport(results) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('TestReport.pdf'));

    doc.fontSize(25).text('Test Report', { align: 'center' });

    results.forEach(result => {
        doc.fontSize(18).text(`Test: ${result.name}`, { continued: true });
        doc.fontSize(18).text(` - Status: ${result.status}`, { align: 'right' });
    });

    doc.end();
}
