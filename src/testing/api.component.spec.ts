import {TestBed, inject, async} from '@angular/core/testing';

import {CompanyComponent} from "../app/manager/company/company.component";
import {CompanyService} from "../app/manager/company/company.service";
import {HttpModule, Response, Request, RequestMethod, RequestOptions} from "@angular/http";
import {request} from "http";
import {CityService} from "../app/shared/cityservice/city.service";
import {Company} from "../app/manager/company/model/company";
import {City} from "../app/shared/cityservice/city";
import {BranchService} from "../app/shared/branch.service";
import {Branch} from "../app/shared/model/branch";



describe('Service: API', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CompanyService,CityService,BranchService,
        {provide:'ApiBase',useValue:"https://leisurebooker.azurewebsites.net/api/"}
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

  it('should get branches',async( inject([BranchService],(service:BranchService)=>{
    service.getBranches().subscribe((branches:Branch[])=>{
      expect(branches.length).toBeGreaterThanOrEqual(1);
      console.log("got 1 or more branches");
    });
  })));

  it('should get branches by postal 2550',async( inject([BranchService],(service:BranchService)=>{
    service.getBranchesByPostal('2550').subscribe((branches:Branch[])=>{
      expect(branches.length).toBeGreaterThanOrEqual(1);
      console.log("got 1 or more branches with postal code 2550");
    });
  })));

  it('should get branch by number',async( inject([BranchService],(service:BranchService)=>{
    service.getBranch(1).subscribe((branch:Branch)=>{
      expect(branch.Id).toBe(1);
      console.log("got 1 branch by number");
    });
  })));

});
