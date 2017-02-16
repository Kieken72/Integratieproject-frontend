import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";
import {City} from "./model/city";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit{
  cityid:number;
  companies: Company[];
  cities: City[];
  ngOnInit(): void {
    this.getCompanies();
    this.getCities();

  }

  constructor(private companyService:CompanyService){}

  title = 'Nieuw bedrijf!';
  getCities():void {
    this.companyService.getCities().subscribe(data => this.cities = data);

  }

  getCompanies():void{
    this.companyService.getCompanies().subscribe(data => this.companies= data);
  }


  addCompany(name:string, VAT:string, street:string, streetNumber:string, box:string ,cityId:string){
    this.companyService.postCompany(name,VAT,street,streetNumber,box,cityId,);
  }
}
