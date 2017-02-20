import { Injectable } from '@angular/core';
import {Request, Response} from 'angular2/http';
import {BaseUrl, DefaultHeaders, RESTClient, GET} from "angular2-rest";
//import { RESTClient, GET, BaseUrl, Headers, DefaultHeaders} from 'angular2-rest';
import {Observable} from "rxjs";
import {City} from "./cityservice/city";


@Injectable()
@BaseUrl('http://leisurebooker.azurewebsites.net/api/')
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class CityRESTService extends RESTClient {

  @GET("cities")
  public getCities(): Observable<City[]> {
    return;
  };

}
