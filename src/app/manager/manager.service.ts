import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class ManagerService {

  public branchId: number;
  constructor(private http:Http,@Inject('ApiBase') private apiBase:string) {
    this.branchId = 1;
  }

  getMessagesByBranch(branchId:number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiBase+'messages/by-branch/'+branchId,options).map((res)=>res.json())
  }

  getGuestsByBranch(branchId:number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiBase+'branches/guests/'+branchId,options).map((res)=>res.json())
  }

}
