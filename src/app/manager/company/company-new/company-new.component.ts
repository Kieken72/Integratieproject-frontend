import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../company.service";
import {CityService} from "../../../shared/cityservice/city.service";
import {City} from "../../../shared/cityservice/city";
import {Company} from "../model/company";

@Component({
  selector: 'app-company-new',
  templateUrl: './company-new.component.html',
  styleUrls: ['./company-new.component.css']
})
export class CompanyNewComponent implements OnInit {

  cities: City[];
  title = "New Company";
  company = new Company();
  constructor(private companyService:CompanyService, private cityService:CityService) { }

  ngOnInit() {
    this.cityService.getCities().subscribe(data => this.cities= data);
  }
  getCities():void{
    this.cityService.getCities().subscribe(data => this.cities= data);
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
