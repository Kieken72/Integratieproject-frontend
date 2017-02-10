import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";

@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css']
})
export class CompanyComponent implements OnInit{
  companies: Company[];
  ngOnInit(): void {
    this.getCompanies();
  }

  constructor(private companyService:CompanyService){}

  title = 'Nieuw bedrijf!';
  private company: Company = new Company();

  getCompanies():void{
    //this.companyService.getCompanies().map(res => this.companies = res);//s.map(response=>response.json());
    this.companyService.getCompanies().subscribe(data => this.companies= data || console.log(data));
  }

  /*addCompany(cname: string, cvat:string, caddress:string): void {

    if (!cname) { return; }
    this.companyService.create(cname, cvat, caddress)
      .then(company => {
        this.companies.push(company);
      });
  }*/
}
