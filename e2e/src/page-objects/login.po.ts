import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateToLogin() {
        return browser.get(`${browser.baseUrl}login`) as Promise<unknown>;
    }

    getUsernameInput() {
        return element(by.id('username'));
    }

    getPasswordInput() {
        return element(by.id('password'));
    }

    getSubmitButton() {
        return element(by.id('loginbtn'));
    }

    getErrorMessage() {
        return element(by.id('errorMessage'));
    }
}