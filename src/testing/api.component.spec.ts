import { TestBed, inject } from '@angular/core/testing';

import {CompanyComponent} from "../app/company/company.component";


describe('Service: Users', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyComponent,
      ]
    });
  });

  it('should create a service', inject([CompanyComponent], (service: CompanyComponent) => {
    expect(service).toBeTruthy();
  }));
});
