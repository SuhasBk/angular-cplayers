import { browser } from 'protractor';
import { DashboardPage } from './page-objects/dashboard.po';
import { RegisterPage } from './page-objects/register.po';

describe('Registration component', () => {
    let page: RegisterPage;
    let dash = new DashboardPage();
    
    beforeEach(() => {
        page = new RegisterPage();
    });

    it('should register new account', () => {
        page.navigateToRegister();
        page.getNameInput().sendKeys('testing');
        page.getEmailInput().sendKeys('testing@testing.com');
        page.getUsernameInput().sendKeys('testing');
        page.getPasswordInput().sendKeys('Testing@123');
        page.getConfirmPassword().sendKeys('Testing@123');
        
        page.getSubmitButton().click();
        expect(dash.getProfilePicture()).toBeTruthy();
    });

    it('should not create account with same username again', () => {
        page.navigateToRegister();
        page.getNameInput().sendKeys('testing');
        page.getEmailInput().sendKeys('testing@testing.com');
        page.getUsernameInput().sendKeys('testing');
        page.getPasswordInput().sendKeys('Testing@123');
        page.getConfirmPassword().sendKeys('Testing@123');

        page.getSubmitButton().click();

        expect(page.getErrorMessage().getText()).toContain('Username already exists! Please choose another one!');
    });
});