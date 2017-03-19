import {browser, by, element,protractor} from "protractor";
/**
 * Created by Emmanuel on 23/02/2017.
 */
describe('companyTest', ()=> {
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

    //todo: Validatie fixen + red
    it('should check the form for create company', () => {
        browser.get('./manager/company/new');
        browser.sleep(2000);
        const cityElement = element(by.id('companyCity'));
        const nameElement = element(by.id('companyName'));
        const vatElement = element(by.id('companyVat'));
        const streetElement = element(by.id('companyStreet'));
        const companyStreetNumberElement = element(by.id('companyStreetNumber'));
        const boxElement = element(by.id('companyBox'));
        const buttonElement = element(by.id('btnSendCompany'));

        const vatError = element(by.id('vatError'));
        const nameError = element(by.id('nameError'));
        const companyStreetError = element(by.id('companyStreetError'));
        const companyStreetNumberError = element(by.id('companyStreetNumberError'));


        nameElement.click();
        vatElement.click();
        expect(nameError.getText()).toBe("Naam mag niet leeg zijn.");
        streetElement.click();
        expect(vatError.getText()).toBe("BTW mag niet leeg zijn.");
        companyStreetNumberElement.click();
        expect(companyStreetError.getText()).toBe("Straat mag niet leeg zijn.");
        boxElement.click();
        expect(companyStreetNumberError.getText()).toBe("Nummer mag niet leeg zijn.")
        nameElement.click();

        const cityChoice = element.all(by.tagName('option'))
            .then(function (cityChoice) {
                cityChoice[0].click();
            })
        const companyName = 'BedrijfE2E' + Math.floor(Math.random() * (999999 - 100000))
        nameElement.sendKeys(companyName);
        vatElement.sendKeys('BE012345678');

        expect(vatError.getText()).toBe("BTW nummer moet beginnen met \"BE\" en gevolgd worden door 10 cijfers.");
        vatElement.sendKeys("9");
        streetElement.sendKeys('E2estraat');
        companyStreetNumberElement.sendKeys('1');
        boxElement.sendKeys('3');

        expect(cityElement.getText()).toBe('1000 | Brussel');
        nameElement.clear();

        /*        buttonElement.click();

         browser.get('http://localhost:4200/manager/company/list');
         browser.sleep(2000)
         const listElement = element(by.xpath(".//!*[.='"+companyName+"']"))
         expect(listElement.getText()).toBe(companyName);*/
    });

})

