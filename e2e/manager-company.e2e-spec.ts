import {browser, by, element} from "protractor";
/**
 * Created by Emmanuel on 23/02/2017.
 */

describe('companyTest', ()=> {

  browser.ignoreSynchronization = true;

  it('should check the form for create company', () => {
    browser.get('./manager/company');
    const whereLocator = by.id('lblCompanyName');
    const whereelement = element(whereLocator)
    expect(whereelement.getText()).toBe('Name:');
  });

})

