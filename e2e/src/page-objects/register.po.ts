import { browser, by, element } from 'protractor';

export class RegisterPage {
    navigateToRegister() {
        return browser.get(`${browser.baseUrl}register`) as Promise<unknown>;
    }

    getNameInput() {
        return element(by.id('name'));
    }

    getEmailInput() {
        return element(by.id('email'));
    }

    getUsernameInput() {
        return element(by.id('username'));
    }

    getPasswordInput() {
        return element(by.id('password'));
    }

    getConfirmPassword() {
        return element(by.id('confirmPassword'));
    }

    getSubmitButton() {
        return element(by.id('registerbtn'));
    }

    getErrorMessage() {
        return element(by.id('errorMessage'));
    }
}