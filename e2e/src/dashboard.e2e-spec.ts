import { browser, Key } from 'protractor';
import { DashboardPage } from './page-objects/dashboard.po';
import { LoginPage } from './page-objects/login.po';

describe('Dashboard component', () => {
    let dash: DashboardPage;
    let login: LoginPage;
    var http = require('request');

    beforeEach(() => {
        dash = new DashboardPage();
        login = new LoginPage();
    });

    it('should add to user\'s recommendations', () => {
        browser.sleep(2000);
        dash.getSearchBar().sendKeys('gayle' + Key.ENTER);
        browser.sleep(3000);

        let button = dash.getRecButton();
        button.click();

        expect(dash.getUnrecButton).toBeTruthy();
    });

    it('should add to user\'s favorites', () => {
        let button = dash.getFavButton();
        button.click();

        expect(dash.getUnfavButton).toBeTruthy();
    });

    afterAll(() => {
        http.delete('http://localhost:8080/testing');
    });
});