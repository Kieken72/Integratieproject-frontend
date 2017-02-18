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
  private branche:Branch = new Branch();
  private retBranche:Branch = new Branch();

  getBranches(){
    return this.http.get(this.branchesUrl).map(res => res.json());
  }

  public postBranche (_brancheName: string, _brancheStreet: string, _brancheNumber: string, _brancheBox:string, _cityId:string, _branchePhoneNumber:string, _brancheEmail:string){
    let cityids = _cityId.split(":");
    this.branche.Name = _brancheName;
    this.branche.Street = _brancheStreet;
    this.branche.Number = _brancheNumber;
    this.branche.Box = _brancheBox;
    this.branche.CityId = cityids[1];
    this.branche.PhoneNumber = _branchePhoneNumber;
    this.branche.Email = _brancheEmail;
    this.branche.CompanyId = "1"; //TODO: CompanyId to fix

    console.log(this.branche);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.branchesUrl, JSON.stringify(this.branche), options).map((res:Response)=>res.json()).subscribe(
      (res:Branch) => {
        this.retBranche = res;
        console.log("VALUE RECEIVED: ",res);
      });

  }
}
