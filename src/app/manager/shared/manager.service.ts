import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";

@Injectable()
export class ManagerService {

  public branchId: number;
  public branch: Branch;
  public branches: Branch[];
  public companyId: number;

  constructor(private http:Http,@Inject('ApiBase') private apiBase:string, private branchService:BranchService) {
    this.branchId = 1;
    this.companyId = 1;
    this.branchService.getBranches().subscribe(data=>this.branches = data);
    this.branchService.getBranch(this.branchId).subscribe(data=>this.branch = data);

  }
  refresh(){
    console.log("Refresh called");
    this.branchService.getBranch(this.branchId).subscribe(data=>this.branch = data);
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
