import {Injectable, Inject} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ManagerService {

  public branchId: number;
  constructor(private http:Http,@Inject('ApiBase') private apiBase:string) {
    this.branchId = 1;
  }

  getMessagesByBranch(branchId:number){
    return this.http.get(this.apiBase+'messages/by-branch/'+branchId).map((res)=>res.json())
  }


}
