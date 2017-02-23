/**
 * Created by Emmanuel on 23/02/2017.
 */
import { MyAppPage } from './app.po';
import {browser, element, by, protractor} from "protractor";

describe('Testbooker2', ()=> {
  browser.ignoreSynchronization = true;
  it('should check waar label', () => {
    browser.get('/booker/search');
    const whereLocator = by.id('waar');
    const whereelement = element(whereLocator);
    expect(whereelement.getText()).toBe('Waar');
  });
  it('should check date label ', () => {
    browser.get('/booker/search');
    const dateLocator = by.id('lbldate');
    const whereelement = element(dateLocator);
    expect(whereelement.getText()).toBe('Datum');
  });
  it('should go to booker/list', () => {
    browser.get('/booker/search');
    const whereLocator = by.tagName('typeahead');
    const whereelement = element(whereLocator);
    whereelement.click();
    whereelement.sendKeys('Kontich');
    const searchButton = element.all(by.css('btn btn-default')).first();
    searchButton.click();
    const branchNameLocator = element.all(by.css('hvr-underline-from-center')).first();
    const branchElement = element(branchNameLocator);
    expect(branchElement.getText()).toBe('Filiaal Kontich');
  });
})

