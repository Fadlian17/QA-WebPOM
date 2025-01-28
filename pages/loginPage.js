class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('.error-button'); // Assuming this is the selector for the error message
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/v1/index.html');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Retrieves the login error message displayed on the page.
     * @returns {Promise<string>} The error message text.
     */
    async getLoginError() {
        return await this.errorMessage.textContent();
    }
}

module.exports = { LoginPage };
