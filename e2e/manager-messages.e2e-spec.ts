/**
 * Created by Jasper on 18/03/2017.
 */
import { MyAppPage } from './app.po';
import {browser, element, by, protractor} from "protractor";

describe('Test manager messages.', ()=> {
    browser.ignoreSynchronization = true;

    it('should login successfull', () => {
        browser.get('./manager/dashboard');
        const userNameElement = element(by.id('textinputUserName'));
        userNameElement.sendKeys("hello@leisurebooker.me");
        const passElement = element(by.id('textinputPassword'));
        passElement.sendKeys("MySuperP@ssword!");
        const buttonElement = element(by.id('singlebutton'));
        buttonElement.click();
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/booker/search');
    })

    it('should check if messages and reviews show up', () => {
        browser.get("./manager/messages");
        // todo
        //test messages

        //test reviews
        const reviewTab = element(by.xpath(".//*[.='Reviews']"))
        reviewTab.click();
        const reviews = element.all(by.xpath(".//table[@id='reviews']/tbody/tr"))
        expect(reviews.count()).toBeGreaterThan(5)
    });
})