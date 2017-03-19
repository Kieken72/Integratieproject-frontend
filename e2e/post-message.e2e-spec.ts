import {browser, element, by} from "protractor";
import {bindOutputs} from "@angular/compiler/src/view_compiler/event_binder";
/**
 * Created by lotte on 19/03/2017.
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

  it('should go to profile page', () => {
    browser.get('/account/details');
    browser.sleep(4000);

    const messagesElement = element(by.id('messages'));
    messagesElement.click();
  });

  it('should go to reservation details page from first res in list', () => {
    browser.get('booker/reservation/1679');
    browser.sleep(6000);

    const messageTextElement = element(by.id('text'));
    messageTextElement.sendKeys("Test e2e,\nHallo, ik zou graag voor minder personen reserveren. Is dit mogelijk?");

    browser.sleep(3000);

    const btnSendElement = element(by.id('send'));
    btnSendElement.click();

    browser.sleep(1000);
  });

});
