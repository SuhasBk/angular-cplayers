import { browser, Key } from 'protractor';
import { DashboardPage } from './page-objects/dashboard.po';
import { LoginPage } from './page-objects/login.po';
import { StaticPage } from './page-objects/static.po';

describe('Default route', () => {
  let page: StaticPage;
  let dash: DashboardPage;
  let login: LoginPage;

  beforeEach(() => {
    page = new StaticPage();
    dash = new DashboardPage();
    login = new LoginPage();
  });

  it('should render static view', () => {
    page.navigateToStatic();
    expect(page.getCricComponent()).toEqual('🏏 Cricket News 🏏');
  });

  it('should search for players', () => {
    page.navigateToStatic();
    page.getSearchBar().sendKeys('dhoni'+Key.ENTER);
    browser.sleep(5000);
    expect(page.getPlayerCard().isPresent()).toBeTrue;
  });

  it('should not add players to favorites', () => {
    let button = page.getFavButton();

    button.click();
    expect(button.getAttribute('class')).toContain('recommend');
  });

  it('should not add players to recommendations', () => {
    let button = page.getRecButton();
    
    button.click();
    expect(button.getAttribute('class')).toContain('recommend');
  });

  it('should not view dashboard page without logging in, instead redirect to login page', () => {
        dash.navigateToDashboard();
        expect(login.getSubmitButton()).toBeTruthy();
    });
});
