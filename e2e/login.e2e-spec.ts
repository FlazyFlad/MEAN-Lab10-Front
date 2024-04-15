import { browser, by, element } from 'protractor';

describe('LoginComponent', () => {
  beforeEach(() => {
    browser.get('/login');
  });

  it('should login with valid credentials', () => {
    const emailField = element(by.id('email'));
    const passwordField = element(by.id('password'));
    const loginButton = element(by.css('.button'));

    emailField.sendKeys('test@example.com');
    passwordField.sendKeys('password123');

    loginButton.click();

    expect(browser.getCurrentUrl()).toContain('/user-list');
  });
});
