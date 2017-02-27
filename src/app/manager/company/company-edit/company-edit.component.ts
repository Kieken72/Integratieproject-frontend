import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {Company} from "../model/company";
import {CompanyService} from "../company.service";
import {City} from "../../../shared/cityservice/city";
import {CityService} from "../../../shared/cityservice/city.service";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  private company: Company;
  cities: City[];
  private selectedCity:any;
  //cityid: number;
  city: City;
  constructor(private route: ActivatedRoute, private companyService: CompanyService,  private cityService:CityService) { }

  ngOnInit() {
    this.getCities();
    this.route.params
      .switchMap((params: Params) => this.companyService.getCompany(+params['id']))
      .subscribe(company => this.whenCompanyLoads(company));
  }

  whenCompanyLoads(company){
    this.company = company;
    console.log(this.company);
  }

  getCities():void{
    this.cityService.getCities().subscribe(data => {this.cities= data; this.selectedCity = this.cities.find(e=>e.Id==this.company.CityId)});
  }



  public citySelected(city){
    this.city = city ? city : null;
  }

  editCompany(){
    //(_id: string,_name:string,_VAT:string,_street:string, _streetNumber:string, _box:string,_cityId:string){
    this.companyService.putCompany(this.company.Id, this.company.Name,this.company.VATNumber,this.company.Street, this.company.Number,this.company.Box,this.city.Id).subscribe(data=>console.log(data));
  }
}
