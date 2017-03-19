/**
 * Created by Jasper on 19/03/2017.
 */
import { MyAppPage } from './app.po';
import {browser, element, by, protractor} from "protractor";

describe('branch edit test', ()=> {
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
  });

  it('should change company', () => {
    browser.get('/manager/company/edit/1');
    browser.sleep(1000);
    const companyName =element( by.id('companyName'));
    const companyVat =element( by.id('companyVat'));
    const companyStreet =element( by.id('companyStreet'));
    const companyStreetNumber =element( by.id('companyStreetNumber'));
    const btnSendCompany=element( by.id('btnSendCompany'));

    expect(companyName.getAttribute('value')).toBe("Megabowling NV");
    expect(companyVat.getAttribute('value')).toBe("BE0478331645");
    expect(companyStreet.getAttribute('value')).toBe("Grote Markt");
    expect(companyStreetNumber.getAttribute('value')).toBe("4");

    companyName.clear();
    companyName.sendKeys("Megabowling BVBA")

    companyVat.clear();
    companyVat.sendKeys("BE0123456789");

    companyStreet.clear();
    companyStreet.sendKeys("Grote Marktje")

    companyStreetNumber.clear();
    companyStreetNumber.sendKeys("5")

    btnSendCompany.click();
  });

  it('should change company back to original for next time testing', () => {
    browser.get('/manager/company/edit/1');
    browser.sleep(1000);
    const companyName =element( by.id('companyName'));
    const companyVat =element( by.id('companyVat'));
    const companyStreet =element( by.id('companyStreet'));
    const companyStreetNumber =element( by.id('companyStreetNumber'));
    const btnSendCompany=element( by.id('btnSendCompany'));

    companyName.clear();
    companyName.sendKeys("Megabowling NV")

    companyVat.clear();
    companyVat.sendKeys("BE0478331645");

    companyStreet.clear();
    companyStreet.sendKeys("Grote Markt")

    companyStreetNumber.clear();
    companyStreetNumber.sendKeys("4")

    btnSendCompany.click();
  });
})
