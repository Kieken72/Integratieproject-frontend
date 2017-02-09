import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";
import {composeAsyncValidators} from "@angular/forms/src/directives/shared";

@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['../app/app.component.css']
})
export class CompanyComponent implements OnInit{
  companies: Company[] = new Array();
  ngOnInit(): void {
    this.getCompanies();
  }

  constructor(private companyService:CompanyService){}

  title = 'Nieuw bedrijf!';
  private company: Company = new Company();

  getCompanies():void{
    this.companyService.getCompanies().then(companies => this.companies = companies);
  }

  addCompany(cname: string, cvat:string): void {

    this.company.name = cname;
    this.company.vat = cvat;

    if (!cname) { return; }
    this.companyService.create(cname, cvat)
      .then(company => {
        this.companies.push(company);
      });
  }
}
