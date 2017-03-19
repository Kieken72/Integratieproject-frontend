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
  });

  it('should browse create review page', () => {
    browser.get('/booker/review/1300');
    browser.sleep(3000);

    const reviewElement = element(by.id('cid'));
    const reviewZichtElement = element(by.id('zichtbaarheid'));
    const reviewTextElement = element(by.id('text'));
    //const reviewTextElement = element.all(by.xpath("//textarea[@id='text']"));

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

    selectDropdownByNumber(reviewElement, 1, 2000);
    selectDropdownByNumber(reviewZichtElement, 1, 2000);

    reviewTextElement.sendKeys("Vond geen schoenen in mijn maat.")

    browser.sleep(4000);

    const sendReviewElement = element(by.id('review'));
    sendReviewElement.click();
    browser.sleep(2000);
  });

  it('should browse branch detail page', ()=> {
    browser.get("/booker/detail/1");
    browser.sleep(3000);

    const reviewUserElement = element(by.id('userReview'));
    expect(reviewUserElement.getText()).toBe('Lotte');

  });

});
