import { browser, by, element } from 'protractor';

export class StaticPage {
  navigateToStatic(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getCricComponent() {
    return element(by.css('mat-card-title')).getText() as Promise<string>;
  }

  getSearchBar() {
    return element(by.id('searchField'));
  }

  getPlayerCard() {
    return element(by.id('playerCard'));
  }

  getFavButton() {
    return element.all(by.id('favButton')).first();
  }

  getUnfavButton() {
    return element.all(by.id('unfavButton')).first();
  }

  getRecButton() {
    return element.all(by.id('recButton')).first();
  }

  getUnrecButton() {
    return element(by.id('unrecButton'));
  }
}
