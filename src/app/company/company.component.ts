import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";

@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css']
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

  addCompany(cname: string, cvat:string, caddress:string): void {

    if (!cname) { return; }
    this.companyService.create(cname, cvat, caddress)
      .then(company => {
        this.companies.push(company);
      });
  }
}
