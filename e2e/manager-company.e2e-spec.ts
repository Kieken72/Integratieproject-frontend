import {browser, by, element} from "protractor";
/**
 * Created by Emmanuel on 23/02/2017.
 */
describe('companyTest', ()=> {
  browser.ignoreSynchronization = true;

  it('should show login page', () => {
    browser.get('./manager/dashboard');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/account/login');
  });

  it('should login successfull', () => {
    browser.get('./account/login');
    const userNameElement = element(by.id('textinputUserName'));
    userNameElement.sendKeys("hello@leisurebooker.me");
    const passElement = element(by.id('textinputPassword'));
    passElement.sendKeys("MySuperP@ssword!");
    const buttonElement = element(by.id('singlebutton'));
    buttonElement.click();
    browser.sleep(2000);
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/manager/dashboard');
  })

  //todo: Validatie fixen + red
  it('should check the form for create company', () => {
    browser.get('./manager/company');
    browser.sleep(2000);
    const cityElement = element(by.id('companyCity'));
    const nameElement = element(by.id('companyName'));
    const vatElement = element(by.id('companyVat'));
    const streetElement = element(by.id('companyStreet'));
    const companyStreetNumberElement = element(by.id('companyStreetNumber'));
    const boxElement = element(by.id('companyBox'));
    const buttonElement = element(by.id('btnSendCompany'));

    const cityChoice = element.all(by.tagName('option'))
      .then(function(cityChoice){
        cityChoice[3].click();
      })

    nameElement.sendKeys('BedrijfE2E');
    vatElement.sendKeys('BE123456789');
    streetElement.sendKeys('E2estraat');
    companyStreetNumberElement.sendKeys('1');
    boxElement.sendKeys('3');

    //buttonElement.click();

    expect(cityElement.getText()).toBe('1040 | Etterbeek');
  });

})

