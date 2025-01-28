class InventoryPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator('.btn_inventory');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async addItemToCart() {
        await this.addToCartButton.first().click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}

module.exports = { InventoryPage };
