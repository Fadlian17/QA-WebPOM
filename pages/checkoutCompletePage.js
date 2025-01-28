class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.completeHeader = page.locator('.complete-header');
    }

    async isCheckoutComplete() {
        return await this.completeHeader.isVisible();
    }
}

module.exports = { CheckoutCompletePage };
