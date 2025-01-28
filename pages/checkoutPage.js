class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('.cart_button');
        this.finishButton = page.locator('.cart_button');
        this.errorMessage = page.locator('.error-button'); // Assuming this is the selector for error messages
    }

    async enterCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    /**
     * Retrieves the checkout error message displayed on the page.
     * 
     * @returns {Promise<string>} The error message text.
     */
    async getCheckoutError() {
        return await this.errorMessage.textContent();
    }
}

module.exports = { CheckoutPage };
