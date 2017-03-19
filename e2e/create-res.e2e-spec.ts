import {browser, element, by, protractor} from "protractor";
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
    //expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/booker/detail/1');
  });

  it('should browse detail branch', () => {
    browser.get('/booker/detail/1');
    browser.sleep(1000);
    const dateElement = element(by.id('date'));
    const timeElemnt = element.all(by.xpath("//timepicker[@id='time']/table/tbody/tr/td/input"));
    const amountElement = element(by.id('amount'));

    //dropdown click
    function selectDropdownByNumber(element, index, milliseconds) {
      element.all(by.tagName('option'))
        .then(function(options) {
          options[index].click();
        });
      if (typeof milliseconds !== 'undefined') {
        browser.sleep(milliseconds);
      }
    }

    dateElement.sendKeys(protractor.Key.ARROW_UP);
    dateElement.sendKeys(protractor.Key.ARROW_UP);

    timeElemnt.clear();
    timeElemnt.sendKeys("18")

    //select 3rd option dropdown amount
    selectDropdownByNumber(amountElement, 2, 2000);

    const reserveerElement = element(by.id('btnRes'));

    reserveerElement.click();
    browser.sleep(2000);


    const confirmResElement = element(by.id('search'));
    expect(confirmResElement.isEnabled()).toBe(true);
    confirmResElement.click();
    browser.sleep(4000);

    const closeElement = element(by.id('close'));
    closeElement.click();
    browser.sleep(4000);
  });


});

