/**
 * Created by Jasper on 18/03/2017.
 */
import { MyAppPage } from './app.po';
import {browser, element, by, protractor} from "protractor";

describe('Test manager messages.', ()=> {
    browser.ignoreSynchronization = true;

    it('should login successfull', () => {
        browser.get('./account/login');
        const userNameElement = element(by.id('textinputUserName'));
        userNameElement.sendKeys("hello@leisurebooker.me");
        const passElement = element(by.id('textinputPassword'));
        passElement.sendKeys("MySuperP@ssword!");
        const buttonElement = element(by.id('singlebutton'));
        buttonElement.click();
        browser.sleep(2000);
    })

    it('should check if messages and reviews show up', () => {
        browser.get("./manager/messages");
        // todo
        //test messages
        const messages = element.all(by.xpath(".//table[@id='messages']/tbody/tr"))
        expect(messages.count()).toBeGreaterThan(0);
        //test reviews
        const reviewTab = element(by.xpath(".//*[.='Reviews']"))
        reviewTab.click();
        const reviews = element.all(by.xpath(".//table[@id='reviews']/tbody/tr"))
        expect(reviews.count()).toBeGreaterThan(5)
    });
})