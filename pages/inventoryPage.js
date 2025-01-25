// pages/inventoryPage.js
class InventoryPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.inventoryContainer = page.locator('.inventory_list');
    }

    async isLoaded() {
        await this.inventoryContainer.waitFor();
    }
}

module.exports = { InventoryPage };
