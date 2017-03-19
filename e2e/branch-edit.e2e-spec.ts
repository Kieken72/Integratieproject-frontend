/**
 * Created by Jasper on 19/03/2017.
 */
import { MyAppPage } from './app.po';
import {browser, element, by, protractor} from "protractor";

describe('Testbooker2', ()=> {
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

  it('should change brach info and change back', () => {
    browser.get('/manager/branch/edit/1');
    browser.sleep(2000);

    const companyName =element( by.id('companyName'));
    const companyStreet =element( by.id('companyStreet'));
    const companyStreetNumber =element( by.id('companyStreetNumber'));
    const companyBox =element( by.id('companyBox'));
    const branchPhone =element( by.id('branchPhone'));
    const branchEmail =element( by.id('branchEmail'));
    const branchDescription =element( by.id('branchDescription'));
    const btnSend = element(by.id('btnSend'));


    expect(companyName.getAttribute('value')).toBe("Bowling Stones Wommelgem");
    expect(companyStreet.getAttribute('value')).toBe("Autolei");
    expect(companyStreetNumber.getAttribute('value')).toBe("113");
    expect(companyBox.getAttribute('value')).toBe("");
    expect(branchPhone.getAttribute('value')).toBe("033226303");
    expect(branchEmail.getAttribute('value')).toBe("wommelgem@bowlingstones.be");
    expect(branchDescription.getAttribute('value')).toBe("Bowling Stones Wommelgem is perfect uitgerust om van élke gelegenheid een feest te maken. De knappe locatie maakt het helemaal af!");

    companyName.clear();
    companyName.sendKeys("Testing Stones Wommelgem");

    companyStreet.clear();
    companyStreet.sendKeys("Testlei");

    companyStreetNumber.clear();
    companyStreetNumber.sendKeys("25");

    branchPhone.clear();
    branchPhone.sendKeys("033226304");

    branchEmail.clear();
    branchEmail.sendKeys("testing@testingstones.be")

    branchDescription.clear();
    branchDescription.sendKeys("Testing Stones Wommelgem is perfect uitgerust om van élke gelegenheid een feest te maken. De knappe locatie maakt het helemaal af!");

    btnSend.click()

    browser.sleep(1000);
    const branchAlert = element(by.id('branchAlert'));
    expect(branchAlert.getText()).toBe("Branch succesvol bewerkt!");

    //check if actually changed
    expect(companyName.getAttribute('value')).toBe("Testing Stones Wommelgem");
    expect(companyStreet.getAttribute('value')).toBe("Testlei");
    expect(companyStreetNumber.getAttribute('value')).toBe("25");
    expect(companyBox.getAttribute('value')).toBe("");
    expect(branchPhone.getAttribute('value')).toBe("033226304");
    expect(branchEmail.getAttribute('value')).toBe("testing@testingstones.be");
    expect(branchDescription.getAttribute('value')).toBe("Testing Stones Wommelgem is perfect uitgerust om van élke gelegenheid een feest te maken. De knappe locatie maakt het helemaal af!");

    //reset back to original
    companyName.clear();
    companyName.sendKeys("Bowling Stones Wommelgem");
    companyStreet.clear();
    companyStreet.sendKeys("Autolei");
    companyStreetNumber.clear();
    companyStreetNumber.sendKeys("113");
    branchPhone.clear();
    branchPhone.sendKeys("033226303");
    branchEmail.clear();
    branchEmail.sendKeys("wommelgem@bowlingstones.be")
    branchDescription.clear();
    branchDescription.sendKeys("Bowling Stones Wommelgem is perfect uitgerust om van élke gelegenheid een feest te maken. De knappe locatie maakt het helemaal af!");
    btnSend.click()
    browser.sleep(10000);
  });

  it('should add and remove openinghour', () => {
    browser.get('/manager/branch/edit/1');
    browser.sleep(2000);
    const openinghourTab = element(by.xpath(".//tabset/ul/li/a/span[.='Openingsuren']"));
    openinghourTab.click();

    var rowcount = element.all(by.xpath("//div[@id='openingHours']/div/div/div/div/button[last()]")).count();
    expect(rowcount).toBe(6);

    const addOperationHour = element(by.id("addOperationHour"));
    addOperationHour.click();

    const btnSendOh = element(by.id("btnSendOh"));
    btnSendOh.click();

    browser.get('/manager/branch/edit/1');
    browser.sleep(2000);
    openinghourTab.click();

    rowcount = element.all(by.xpath("//div[@id='openingHours']/div/div/div/div/button[last()]")).count();
    expect(rowcount).toBe(7);

    const removebutton =element.all(by.xpath("//div[@id='openingHours']/div/div/div/div/button[last()]")).last();
    removebutton.click();

    rowcount = element.all(by.xpath("//div[@id='openingHours']/div/div/div/div/button[last()]")).count();
    expect(rowcount).toBe(6);

    btnSendOh.click();
     browser.sleep(5000);
  });

  it('should add and remove extra info', () => {
    browser.get('/manager/branch/edit/1');
    browser.sleep(2000);
    const extraInfoTab = element(by.xpath(".//tabset/ul/li/a/span[.='Extra Info']"));
    extraInfoTab.click();

    var rowcount = element.all(by.xpath("//div[@id='additionalInfo']/div/div/div/button[last()]")).count();
    expect(rowcount).toBe(4);

    browser.sleep(1000);
    const addAditionanlInfo = element(by.id("btnAddAdditionalInfo"));
    addAditionanlInfo.click();

    rowcount = element.all(by.xpath("//div[@id='additionalInfo']/div/div/div/button[last()]")).count();
    expect(rowcount).toBe(5);

    const btnSendInfo = element(by.id("btnSendInfo"));
    btnSendInfo.click();

    browser.get('/manager/branch/edit/1');
    browser.sleep(2000);
    extraInfoTab.click();

    rowcount = element.all(by.xpath("//div[@id='additionalInfo']/div/div/div/button[last()]")).count();
    expect(rowcount).toBe(5);

    browser.sleep(1000);
    const removebutton =element.all(by.xpath("//div[@id='additionalInfo']/div/div/div/button[last()]")).last();
    removebutton.click();

    rowcount = element.all(by.xpath("//div[@id='additionalInfo']/div/div/div/button[last()]")).count();
    expect(rowcount).toBe(4);

    btnSendInfo.click();
    browser.sleep(5000);
  });
})
