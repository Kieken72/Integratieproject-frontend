import { MyAppPage } from './app.po';
import {browser, element, by, protractor} from "protractor";

describe('Test register.', ()=> {
    browser.ignoreSynchronization = true;

    it('should register successfully', () => {
        browser.get('./account/register');
        const firstNameElement = element(by.id("firstname"));
        const lastNameElement = element(by.id("lastname"));
        const emailElement = element(by.id("email"));
        const phonenumber = element(by.id("phonenumber"))
        const passwordElement = element(by.id("password"));
        const confirmPasswordElement = element(by.id("confirmpassword"));

        const registerButton = element(by.id("search"))


        var firstname = "e2eTest"+ Math.floor(Math.random() * (999999 - 100000))
        firstNameElement.sendKeys(firstname);
        lastNameElement.sendKeys("testing")
        emailElement.sendKeys(firstname+".testing@testing.com");
        phonenumber.sendKeys("0473228041");
        passwordElement.sendKeys("Test@1234");
        confirmPasswordElement.sendKeys("Test@1234");

        registerButton.click();
        browser.sleep(1000)
        expect(browser.getCurrentUrl()).toBe('http://localhost:4200/account/login');
    })
})