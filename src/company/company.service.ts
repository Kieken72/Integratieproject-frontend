import {Response, Headers} from 'angular2/http';

import {AuthHttp} from 'angular2-jwt';

import { Injectable } from '@angular/core';
import {Company} from "./model/company";

@Injectable()
export class CompanyService {
  constructor(private authHttp: AuthHttp) {
    this.header.append('Accept', 'text/json');
    this.header.append('Content-Type', 'application/json');
  }

  public apiPrefix: string = 'http://localhost:51787/';
  public header: Headers = new Headers();
//TODO: nog uitwerken
  public postCompany (company : Company){
    var apiURL = this.apiPrefix + 'api/sessions';
    return this.authHttp.post(apiURL, JSON.stringify(company));
  }

}
