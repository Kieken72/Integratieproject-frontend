import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CompanyComponent} from "../app/manager/company/company.component";
import {CompanyService} from "../app/manager/company/company.service";
import {HttpModule} from "@angular/http";


describe('CompanyComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        CompanyComponent
      ],
      providers:[CompanyService],
      imports: [HttpModule]
    });
    TestBed.compileComponents();
  });

 /* it(`should have as title 'Nieuw bedrijf!'`, async(() => {
    const fixture = TestBed.createComponent(CompanyComponent);
    const company = fixture.debugElement.componentInstance;
    expect(company.title).toEqual('Nieuw bedrijf!');

  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(CompanyComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Nieuw bedrijf!');
  }));*/
});
