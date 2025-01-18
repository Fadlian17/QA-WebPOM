import { test, expect } from '@playwright/test';

// Define the login credentials
const username = 'standard_user';
const password = 'secret_sauce';

// Define the base URL and other relevant URLs
const baseUrl = 'https://www.saucedemo.com/v1/index.html';
const inventoryUrl = 'https://www.saucedemo.com/v1/inventory.html';
const cartUrl = 'https://www.saucedemo.com/v1/cart.html';
const checkoutStepOneUrl = 'https://www.saucedemo.com/v1/checkout-step-one.html';
const checkoutStepTwoUrl = 'https://www.saucedemo.com/v1/checkout-step-two.html';

test('Complete purchase process', async ({ page }) => {
    // Navigate to the base URL
    await page.goto(baseUrl);

    // Locate the username and password input fields
    const usernameInput = page.locator('#user-name');
    const passwordInput = page.locator('#password');

    // Fill in the login credentials
    await usernameInput.fill(username);
    await passwordInput.fill(password);

    // Click the login button
    await page.locator('#login-button').click();

    // Wait for navigation to the inventory page
    await page.waitForURL(inventoryUrl);

    // Verify that the URL is correct
    await expect(page).toHaveURL(inventoryUrl);

    // Add an item to the cart
    const addToCartButton = page.locator('.inventory_item button', { hasText: 'Add to cart' }).first();
    await addToCartButton.click();

    // Navigate to the cart page
    await page.locator('.shopping_cart_link').click();
    await page.waitForURL(cartUrl);

    // Verify that the URL is correct
    await expect(page).toHaveURL(cartUrl);

    // Proceed to checkout
    await page.locator('.checkout_button').click();
    await page.waitForURL(checkoutStepOneUrl);

    // Verify that the URL is correct
    await expect(page).toHaveURL(checkoutStepOneUrl);

    // Fill in checkout information
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('12345');

    // Continue to the next checkout step
    await page.locator('.cart_button').click();
    await page.waitForURL(checkoutStepTwoUrl);

    // Verify that the URL is correct
    await expect(page).toHaveURL(checkoutStepTwoUrl);

    // Finish the checkout process
    await page.locator('.cart_button').click();

    // Additional assertions can be added here to verify the order confirmation page
});
