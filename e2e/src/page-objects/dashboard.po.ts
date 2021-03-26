import { browser, by, element } from 'protractor';

export class DashboardPage {
    navigateToDashboard() {
        browser.get(`${browser.baseUrl}dashboard`);
    }

    getSearchBar() {
        return element(by.id('searchField'));
    }

    getFavButton() {
        return element.all(by.id('favButton')).first();
    }

    getUnfavButton() {
        return element(by.id('unfavButton'));
    }

    getRecButton() {
        return element.all(by.id('recButton')).first();
    }

    getUnrecButton() {
        return element(by.id('unrecButton'));
    }

    getMenuButton() {
        return element(by.id('menu'));
    }

    getProfilePicture() {
        return element(by.id('profilePicture'));
    }

    getLogOutButton() {
        return element(by.id('logoutbtn'));
    }

}