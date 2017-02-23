import {browser} from "protractor";
describe('app', ()=> {
  browser.ignoreSynchronization = true;
  it('should browse to home search page', function () {
    browser.get('/');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/booker/search');
  });
})
