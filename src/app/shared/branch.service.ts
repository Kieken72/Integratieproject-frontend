import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Branch} from "./model/branch";
/**
 * Created by Emmanuel on 16/02/2017.
 */
@Injectable()
export class BranchService {
  constructor(private  http:Http){}
  private branchesUrl = 'http://leisurebooker.azurewebsites.net/api/branches';
  private branch:Branch = new Branch();
  private reaBranch:Branch = new Branch();

  getBranches(){
    return this.http.get(this.branchesUrl).map(res => res.json());
  }

  getBranchesByPostal(postalCode: string){
    return this.http.get(this.branchesUrl+'/by-postal/'+postalCode).map(res=>res.json());
  }

  public postBranche (_brancheName: string, _brancheStreet: string, _brancheNumber: string, _brancheBox:string, _cityId:string, _branchePhoneNumber:string, _brancheEmail:string){
    let cityids = _cityId.split(":");
    this.branch.Name = _brancheName;
    this.branch.Street = _brancheStreet;
    this.branch.Number = _brancheNumber;
    this.branch.Box = _brancheBox;
    this.branch.CityId = cityids[1];
    this.branch.PhoneNumber = _branchePhoneNumber;
    this.branch.Email = _brancheEmail;
    this.branch.CompanyId = "1"; //TODO: CompanyId to fix

    console.log(this.branch);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.branchesUrl, JSON.stringify(this.branch), options).map((res:Response)=>res.json()).subscribe(
      (res:Branch) => {
        this.reaBranch = res;
        console.log("VALUE RECEIVED: ",res);
      });

  }

  getBranch(number: number) {
    return this.http.get(this.branchesUrl+'/'+number).map(res => res.json());
  }
}
