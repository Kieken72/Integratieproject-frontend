/**
 * Created by Emmanuel on 20/02/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
@Injectable()
export class ProfileService{
  constructor(private http: Http){}
  getProfile(){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer ${authToken}');

    //Todo: account getten
    //return this.http.get
  }
}
