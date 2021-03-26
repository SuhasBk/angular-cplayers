import { LoginPage } from './page-objects/login.po';
import { DashboardPage } from './page-objects/dashboard.po';

describe('Login component', () => {
    let page: LoginPage;
    let dash: DashboardPage;

    beforeEach(() => {
        page = new LoginPage();
        dash = new DashboardPage();
    });

    it('login button should be disabled at startup', () => {
        page.navigateToLogin();
        expect(page.getSubmitButton().getAttribute('disabled')).toEqual('true');
    });

    it('should not login to the app with wrong credentials', () => {
        page.navigateToLogin();
        page.getUsernameInput().sendKeys('asdasdasdasdasdsad');
        page.getPasswordInput().sendKeys('adasdashdbafsdfdhfbdsh');
        page.getSubmitButton().click();

        expect(page.getErrorMessage().getText()).toContain('Invalid');
    });

    it('should login to the app with correct credentials', () => {
        page.navigateToLogin();
        page.getUsernameInput().sendKeys('testing');
        page.getPasswordInput().sendKeys('Testing@123');
        page.getSubmitButton().click();

        expect(dash.getMenuButton()).toBeTruthy();
    });

});