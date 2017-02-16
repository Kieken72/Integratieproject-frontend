import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
/**
 * Created by Emmanuel on 16/02/2017.
 */
@Injectable()
export class BranchService {
  constructor(private  http:Http){}
  private branchesUrl = 'http://leisurebooker.azurewebsites.net/api/branches';

  getBranches(){
    return this.http.get(this.branchesUrl).map(res => res.json());
  }

}
