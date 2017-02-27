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
  cityid: number;
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
    this.cityService.getCities().subscribe(data => this.cities= data);
  }

  editCompany(id:string, name:string, VAT:string, street:string, streetNumber:string, box:string ,cityId:string){
    this.companyService.putCompany(id, name,VAT,street,streetNumber,box,cityId);
  }
}
