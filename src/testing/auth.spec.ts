import {TestBed, inject, async} from '@angular/core/testing';
import {HttpModule, Response, Request, RequestMethod, RequestOptions} from "@angular/http";
import {UserService} from "../app/shared/user.service";
import {Router} from "@angular/router";
import {Token} from "../app/shared/model/token";
import {ProfileService} from "../app/shared/profile.service";

describe('Service: oAuth', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        UserService,ProfileService,
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

  let token:any;
  it('expect token', async(inject([UserService], (service: UserService) => {
    console.log('getting token');
    service.login('hello@leisurebooker.me','MySuperP@ssword!').subscribe((data)=>checkToken(data));

  })));

  function checkToken(data) {
    token = data;
    console.log('Bearer '+token);
  };

  it('expect account info', async(inject([ProfileService], (service: ProfileService) => {
    console.log('getting info');
    service.getProfileWithToken(token).subscribe((data)=>checkData(data));
    console.log('Got info');
  })));
  function checkData(data) {
    console.log('data: '+data.Id);
    console.log('data: '+data.Url);
    console.log('data: '+data.UserName);
    console.log('data: '+data.Roles.length);
    console.log('data: '+data.Roles[0]);
    console.log('data: '+data.Roles[1]);
  };
});
