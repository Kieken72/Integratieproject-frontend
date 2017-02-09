import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";

@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['../app/app.component.css']
})
export class CompanyComponent implements OnInit{
  private companies: Company[];
  ngOnInit(): void {
    this.getCompanies();
  }

  constructor(private companyService:CompanyService){}

  title = 'Nieuw bedrijf!';
  private company: Company;

  getCompanies():void{
    this.companyService.getCompanies().then(companies => this.companies = companies);
  }

  addCompany(cname: string, cvat:string): void {

    this.company.name = cname;
    this.company.vat = cvat;

    if (!cname) { return; }
    this.companyService.create(this.company)
      .then(company => {
        this.companies.push(company);
      });
  }
}
