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

  getCompanies():void{
    this.companyService.getCompanies().then(companies => this.companies = companies);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.companyService.create(name)
      .then(company => {
        this.companies.push(company);
      });
  }
}
