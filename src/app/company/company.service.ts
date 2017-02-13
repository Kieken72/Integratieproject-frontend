import { Injectable } from '@angular/core';
import {Company} from "./model/company";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {
  constructor(private  http:Http){}
//TODO: nog uitwerken
  public postCompany (company : Company){
    /*var apiURL = this.apiPrefix + 'api/sessions';
    return this.authHttp.post(apiURL, JSON.stringify(company));*/
    //COMPANIES.push(company);
  }
  private companiesUrl = 'http://leisurebooker.azurewebsites.net/api/companies';
  private headers = new Headers({'Content-Type': 'application/json'});

/*  getCities(){
    return this.http.get(this.citiesUrl).map(res => res.json())
  }*/

  getCompanies(){
    return this.http.get(this.companiesUrl).map(res => res.json())
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
