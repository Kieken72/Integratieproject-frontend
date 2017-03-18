import {browser, element, by} from "protractor";
/**
 * Created by lotte on 18/03/2017.
 */

describe('profileTest', ()=> {
  browser.ignoreSynchronization = true;

  it('should login successfull', () => {
    browser.get('./account/login');
    const userNameElement = element(by.id('textinputUserName'));
    userNameElement.sendKeys("lotte.verbraeken@student.kdg.be");
    const passElement = element(by.id('textinputPassword'));
    passElement.sendKeys("Test!123");
    const buttonElement = element(by.id('singlebutton'));
    buttonElement.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/account/details');
  });

  it('should show details page', ()=> {
    browser.get('/account/details');
    browser.sleep(5000);

    const changeAccountElement = element(by.id('editAccount'));
    changeAccountElement.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/account/edit');
    browser.sleep(4000);

    const firstNameElement = element(by.id('accountFirstName'));
    const lastNameElement = element(by.id('accountLastName'));
    const phoneNumberElement = element(by.id('accountPhoneNumber'));

    firstNameElement.clear();
    lastNameElement.clear();
    phoneNumberElement.clear();
    firstNameElement.sendKeys("Lotte");
    lastNameElement.sendKeys("Verbaeken");
    phoneNumberElement.sendKeys("0473698712");

    const changePersonElement = element(by.id('btnSendAccount'));
    changePersonElement.click();

    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/account/details');
  });

  it('should show details page', ()=> {
    browser.get('/account/details');
    browser.sleep(5000);

    const changeAccountElement = element(by.id('editAccount'));
    changeAccountElement.click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/account/edit');
    browser.sleep(2000);

    const oldPasswordElement = element(by.id('OldPassword'));
    const newPasswordElement = element(by.id('NewPassword'));
    const confirmPasswordElement = element(by.id('ConfirmPassword'));

    oldPasswordElement.sendKeys("Test!123");
    newPasswordElement.sendKeys("Test@123");
    confirmPasswordElement.sendKeys("Test@123");

    const changePasswordElement = element(by.id('btnChangePassword'));
    changePasswordElement.click();
    browser.sleep(1000);
  });

  it('should login successfull', () => {
    browser.get('./account/login');
    const userNameElement = element(by.id('textinputUserName'));
    userNameElement.sendKeys("lotte.verbraeken@student.kdg.be");
    const passElement = element(by.id('textinputPassword'));
    passElement.sendKeys("Test@123");
    const buttonElement = element(by.id('singlebutton'));
    buttonElement.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/account/details');
    browser.sleep(5000);
  });

});
