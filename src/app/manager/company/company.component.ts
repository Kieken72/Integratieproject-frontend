import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";
import {City} from "../../shared/cityservice/city";
import {CityService} from "../../shared/cityservice/city.service";
@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css'],
  providers: [CompanyService, CityService]
})
export class CompanyComponent implements OnInit{
  cityid:number;
  companies: Company[];
  cities: City[];
  ngOnInit(): void {
    this.getCompanies();
    this.getCities();
  }

  constructor(private companyService:CompanyService, private cityService:CityService){}

  title = 'Nieuw bedrijf!';
  getCities():void{
    this.cityService.getCities().subscribe(data => this.cities= data);
}
  getCompanies():void{
    this.companyService.getCompanies().subscribe(data => this.companies= data);
  }
  addCompany(name:string, VAT:string, street:string, streetNumber:string, box:string ,cityId:string){
    this.companyService.postCompany(name,VAT,street,streetNumber,box,cityId);
  }
  reset(name:any, VAT:any, street:any, streetNumber:any, box:any ,cityId:any){
    name.value='';
    street.value='';
    streetNumber.value='';
    box.value='';
    cityId.value='';

  }
}
