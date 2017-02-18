import { Injectable } from '@angular/core';
import {Company} from "./model/company";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  constructor(private  http:Http){}

  private companiesUrl = 'http://leisurebooker.azurewebsites.net/api/companies';
  private retCompany:Company = new Company();
  private company:Company = new Company();

  public postCompany (_name:string,_VAT:string,_street:string, _streetNumber:string, _box:string,_cityId:string){
    let cityids = _cityId.split(":");
    this.company.Name = _name;
    this.company.Box = _box;
    this.company.VATNumber = _VAT;
    this.company.Street = _street;
    this.company.Number = _streetNumber;
    this.company.CityId = cityids[1];
    console.log(this.company);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.companiesUrl, JSON.stringify(this.company), options).map((res:Response)=>res.json()).subscribe(
    (res:Company) => {
      this.retCompany = res;
      console.log("VALUE RECEIVED: ",res);
    });
  }

  getCompanies(){
    return this.http.get(this.companiesUrl).map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
 /* getCompaniesSlowly(): Promise<Company[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getCompanies()), 2000);
    });
  }*/

  /*create(cname: string, cvat: string, caddress: string): Promise<Company> {
    return this.http.post(this.companiesUrl, JSON.stringify({name: cname, vat : cvat, address: caddress}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }*/

}