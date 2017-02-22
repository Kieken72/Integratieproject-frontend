/**
 * Created by Emmanuel on 20/02/2017.
 */

import {Injectable, Inject} from "@angular/core";
import {Http, Headers} from "@angular/http";

@Injectable()
export class ProfileService{
  constructor(private http: Http,@Inject('ApiBase') private apiBase:string){}
  getProfile(){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer ${authToken}');

    return this.http.get(this.apiBase+'accounts',{headers}).map(res => res.json())
  }
  /**For Testing*/
  getProfileWithToken(token:any){
    let headers = new Headers();
    //headers.append('Content-type', 'application/x-www-form-urlencoded');
    //let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+token);
        return this.http.get(this.apiBase+'accounts',{headers}).map(res => res.json())
  }
}
