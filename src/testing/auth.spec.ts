import {TestBed, inject, async} from '@angular/core/testing';
import {HttpModule, Response, Request, RequestMethod, RequestOptions} from "@angular/http";
import {UserService} from "../app/shared/user.service";
import {Router} from "@angular/router";
import {Token} from "../app/shared/model/token";

describe('Service: oAuth', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: Router,useClass: class{navigate = jasmine.createSpy("navigate")}},
        {provide:'AuthBase',useValue:"https://leisurebooker.azurewebsites.net/oauth/"},
        {provide:'ApiBase',useValue:"https://leisurebooker.azurewebsites.net/api/"}
      ],
      imports:[HttpModule]
    });
  });

  it('expect companyservice to be defined', inject([UserService], (service: UserService) => {
    expect(service).toBeDefined();
    console.log("Userservice is defined");
  }));

  //TODO: checken
  it('expect token', inject([UserService], (service: UserService) => {
    let accessToken;
    service.login('hello@leisurebooker.me','MySuperP@ssword!').subscribe((token:Token)=>{
      accessToken = token;
      console.log(accessToken);
    });

  }));
});
