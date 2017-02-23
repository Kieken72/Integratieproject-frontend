/**
 * Created by Emmanuel on 23/02/2017.
 */
import { MyAppPage } from './app.po';
import {browser, element, by, protractor} from "protractor";

describe('Testbooker2', ()=> {

  /*let page: MyAppPage;
   beforeEach(() => {
   page = new MyAppPage();
   });
   it('should display message saying app works', () => {
   page.navigateTo();
   expect(page.getParagraphText()).toEqual('app works!');
   });*/

  browser.ignoreSynchronization = true;
  /* it('should display companies', () => {
   browser.get('./manager/company');
   //expect(element.all(by.repeater('company in companies')).count()).toBeGreaterThan(1);
   let companies = element.all(by.css(".th"));
   expect(companies.count()).toBeGreaterThan(1);
   });*/

  it('should check page 2222', () => {
    browser.get('/booker/search');
    const whereLocator = by.id('waar');
    const whereelement = element(whereLocator)

    expect(whereelement.getText()).toBe('Waar');
  });
  it('should check date label 222', () => {
    browser.get('/booker/search');
    const dateLocator = by.id('date');
    const whereelement = element(dateLocator)

    expect(whereelement.getText()).toBe('Datum');
  });
})

