import { TestBed, inject } from '@angular/core/testing';

import {CompanyComponent} from "../app/company/company.component";
import {CompanyService} from "../app/company/company.service";
import {HttpModule} from "@angular/http";
import {request} from "http";


describe('Service: companies', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CompanyService,
      ],
      imports:[HttpModule]
    });
  });

  it('expect to be defined', inject([CompanyService], (service: CompanyService) => {
    expect(service).toBeDefined();
  }));

  it('should be json', () => {
    return request(CompanyService).getHeader('Content-Type').toString()  == 'application/json; charset=utf-8';
    });
  });
