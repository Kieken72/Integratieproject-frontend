import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {City} from "../../company/model/city";

@Injectable()
export class CitySearchService {

  private citiesUrl = 'http://leisurebooker.azurewebsites.net/api/cities';

  constructor(private http: Http) {}
  search(term: string): Observable<City[]> {
    return this.http
      .get(this.citiesUrl)
      .map(response => response.json().data as City[]);
  }
}
