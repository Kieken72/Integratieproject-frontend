import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";
import {City} from "./model/city";
@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css'],
  providers: [CompanyService]
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
  getCities():void{
    this.companyService.getCities().subscribe(data => this.cities= data);
}
  getCompanies():void{
    this.companyService.getCompanies().subscribe(data => this.companies= data);
  }


  private company:Company = new Company();
  addCompany(cityId:string,name:string,VAT:string,street:string, streetNumber:string, box:string){
    this.company.Name =name;
    this.company.VATNumber=VAT;
    //this.company.CityId = cityId;
    this.company.Street = street;
    this.company.Number = streetNumber;
    this.company.Box = box;

    this.companyService.postCompany(this.company);
  }

  myListFormatter(data: any): string {
    let html: string = "";
    html += data[this.company.City.PostalCode] ? `<b>(${data[this.company.City.PostalCode]})</b>` : "";

    return html;
  }
}
