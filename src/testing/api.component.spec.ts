import {TestBed, inject, async} from '@angular/core/testing';

import {CompanyComponent} from "../app/manager/company/company.component";
import {CompanyService} from "../app/manager/company/company.service";
import {HttpModule, Response} from "@angular/http";
import {request} from "http";
import {CityService} from "../app/shared/cityservice/city.service";
import {Company} from "../app/manager/company/model/company";
import {City} from "../app/shared/cityservice/city";
import {CityRESTService} from "../app/shared/city-rest.service";



describe('Service: companies', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CompanyService,CityService,{provide:'ApiBase',useValue:"http://leisurebooker.azurewebsites.net/api/"}
      ],
      imports:[HttpModule]
    });
  });

  it('expect companyservice to be defined', inject([CompanyService], (service: CompanyService) => {
    expect(service).toBeDefined();
    console.log("companyservice is defined");
  }));

  it('expect cityservice to be defined', inject([CityService], (service: CityService) => {
    expect(service).toBeDefined();
    console.log("cityservice is defined");
  }));

  it('should get companies',async( inject([CompanyService],(service:CompanyService)=>{
    service.getCompanies().subscribe((companies:Company[])=>{
      expect(companies.length).toBeGreaterThanOrEqual(1);
      console.log("got 1 or more companies");
    });
  })));
  it('should get cities',async( inject([CityService],(service:CityService)=>{
    service.getCities().subscribe((cities:City[])=>{
      expect(cities.length).toBeGreaterThanOrEqual(1);
      console.log("got 1 or more cities");
    });
  })));

  /*it('should be json', () => {
    return request(CompanyService).getHeader('Content-Type').toString()  == 'application/json; charset=utf-8';
    });*/
  });
