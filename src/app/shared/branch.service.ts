import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Branch} from "./model/branch";
import {forEach} from "@angular/router/src/utils/collection";
import {DisplayOperationHour} from "./model/operationhour";
/**
 * Created by Emmanuel on 16/02/2017.
 */
@Injectable()
export class BranchService {
  constructor(private  http:Http,@Inject('ApiBase') private apiBase:string){}

  private branch:Branch = new Branch();
  private branchResponse:Branch = new Branch();

  getBranches(){
    return this.http.get(this.apiBase+'branches').map(res => res.json());
  }

  getBranchesByPostal(postalCode: string){
    return this.http.get(this.apiBase+'branches/by-postal/'+postalCode).map(res=>res.json());
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

    return this.http.post(this.apiBase+'branches', JSON.stringify(this.branch), options).map((res:Response)=>res.json()).subscribe(
      (res:Branch) => {
        this.branchResponse = res;
        console.log("VALUE RECEIVED: ",res);
      });

  }

  getBranch(number: number) {
    return this.http.get(this.apiBase+'branches/'+number).map(res => res.json());
  }

  openingHours(branch:Branch){
    var weekdagen = ["Zondag", "Maandag", "Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
    var operationHours: any[] = [];
    for(var i = 0; i < weekdagen.length; i++){

      var hours = branch.OpeningHours.filter(o=>o.Day==i);


      var temp = '';
      if(hours.length==0){
        temp="Gesloten";
      }
      else {
        var first = true;
        for(let oh of hours ){
          var start = oh.FromTime.substr(0, 5);
          var end = oh.ToTime.substr(0, 5);

          if(first){
            temp = start +" - " + end;
            first=false;
          } else {
            temp+= ', ' +start +" - " + end;
          }
        }
      }
      var operation = new DisplayOperationHour(weekdagen[i],temp);
      console.log(operation);
      operationHours.push(operation);
    }
    return operationHours;
  }
}
