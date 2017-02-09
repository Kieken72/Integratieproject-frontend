import { Injectable } from '@angular/core';
import {Company} from "./model/company";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import * as http from "selenium-webdriver/http";

@Injectable()
export class CompanyService {

//TODO: nog uitwerken
  public postCompany (company : Company){
    /*var apiURL = this.apiPrefix + 'api/sessions';
    return this.authHttp.post(apiURL, JSON.stringify(company));*/
    //COMPANIES.push(company);

  }
  //private companiesUrl = 'http://leisurebooker.azurewebsites.net/api/companies';
  private companiesUrl = '/api/companies';
  constructor(private  http:Http){}
  private headers = new Headers({'Content-Type': 'application/json'});

  /*getCompanies():Promise<Company[]>{
    return Promise.resolve(COMPANIES);
  }*/

  getCompanies():Promise<Company[]>{

    return this.http.get(this.companiesUrl)
      .toPromise()
      .then(response => response.json().data as Company[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  getCompaniesSlowly(): Promise<Company[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getCompanies()), 2000);
    });
  }

  create(cname: string, cvat: string, caddress: string): Promise<Company> {
    return this.http.post(this.companiesUrl, JSON.stringify({name: cname, vat : cvat, address: caddress}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

}
