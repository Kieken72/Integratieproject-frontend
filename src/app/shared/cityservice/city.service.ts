import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CityService {
  constructor(private  http:Http){}
  private citiesUrl = 'http://leisurebooker.azurewebsites.net/api/cities';
  getCities(){
    return this.http.get(this.citiesUrl).map(res => res.json());
  }
}
