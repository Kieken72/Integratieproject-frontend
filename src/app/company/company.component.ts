import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";
import {City} from "./model/city";

@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css']
})
export class CompanyComponent implements OnInit{
  companies: Company[];
  cities: City[];
  ngOnInit(): void {
    this.getCompanies();
    this.getCities();
  }

  constructor(private companyService:CompanyService){}

  title = 'Nieuw bedrijf!';
  private company: Company = new Company();
  getCities():void{
    this.companyService.getCities().subscribe(data => this.cities= data);
}
  getCompanies():void{
    this.companyService.getCompanies().subscribe(data => this.companies= data);
  }
}
