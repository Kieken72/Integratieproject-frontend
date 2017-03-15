import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Branch} from "./model/branch";
import {forEach} from "@angular/router/src/utils/collection";
import {DisplayOperationHour, OperationHour} from "./model/operationhour";
import {DisplayFacility, AdditionalInfo} from "./model/additional-info";
import {City} from "./cityservice/city";
import {Address} from "cluster";
/**
 * Created by Emmanuel on 16/02/2017.
 */
@Injectable()
export class BranchService {
  constructor(private  http:Http,@Inject('ApiBase') private apiBase:string){}

  private branch:Branch = new Branch();
  private branchResponse:Branch = new Branch();
  private branchToPut= new Branch();

  getBranches(){
    return this.http.get(this.apiBase+'branches').map(res => res.json());
  }

  getBranchesByPostal(postalCode: string){
    return this.http.get(this.apiBase+'branches/by-postal/'+postalCode).map(res=>res.json());
  }

  public postBranche (_branchName: string, _branchStreet: string, _branchNumber: string, _branchBox:string, _cityId:string, _branchPhoneNumber:string, _branchEmail:string){
    //let cityids = _cityId.split(":");
    this.branch.Name = _branchName;
    this.branch.Street = _branchStreet;
    this.branch.Number = _branchNumber;
    this.branch.Box = _branchBox;
    this.branch.CityId = _cityId;
    this.branch.PhoneNumber = _branchPhoneNumber;
    this.branch.Email = _branchEmail;
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

  public putBranch (_id: number,_name:string,_street:string, _streetNumber:string, _box:string,_cityId:string
    ,_branchePhoneNumber:string, _brancheEmail:string, _branchDescription:string){
    //let cityids = _cityId.split(":");
    this.branchToPut.Id = _id;
    this.branchToPut.Name = _name;
    this.branchToPut.Box = _box;
    this.branchToPut.Street = _street;
    this.branchToPut.Number = _streetNumber;
    this.branchToPut.CityId = _cityId;
    this.branchToPut.Email = _brancheEmail;
    this.branchToPut.PhoneNumber = _branchePhoneNumber;
    this.branchToPut.Description= _branchDescription;
    console.log(this.branchToPut);

    let headers = new Headers();
    headers.append('Content-Type','application/json')
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiBase+'branches/'+_id, JSON.stringify(this.branchToPut), options).map((res:Response)=>res);
  }

  putAdditionalInfo(id: number,additionalInfo:AdditionalInfo[]){
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiBase+'branches/additionalinfo/'+id, JSON.stringify(additionalInfo), options).map((res:Response)=>res);
  }

  putOpeningHours(id: number,openhours: OperationHour[]){
    let headers = new Headers();
    headers.append('Content-Type','application/json')
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiBase+'branches/operationhours/'+id, JSON.stringify(openhours), options).map((res:Response)=>res);
  }

  getBranch(number: number) {
    return this.http.get(this.apiBase+'branches/'+number).map(res => res.json());
  }

  public openingHours(branch:Branch){
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
      operationHours.push(operation);
    }
    return operationHours;
  }

  public paymentFacilities(branch:Branch){
    var facilities = branch.AdditionalInfos;
    console.log(facilities);
    facilities = facilities.filter(a=>a.Type == 0);
    var payments: DisplayFacility[]=[];

    for(var fa of facilities){
      var displayFacility = new DisplayFacility(fa.Type);
      switch (fa.Value){
        case "MASTERCARD":
          displayFacility.Class="cc-mastercard";
          break;
        case "VISA":
          displayFacility.Class="cc-visa";
          break;
        case "CASH":
          displayFacility.Class="money";
          break;
        case "PAYPAL":
          displayFacility.Class="paypal";
          break;
        case "BANCONTACT":
          displayFacility.Class="credit-card";
          break;
      }
      payments.push(displayFacility);
    }
    return payments;
  }
  public accesabilityFacilities(branch:Branch){
    var facilities = branch.AdditionalInfos;
    console.log(facilities);
    facilities = facilities.filter(a=>a.Type == 2);
    var accesabilities: DisplayFacility[]=[];

    for(var fa of facilities){
      var displayFacility = new DisplayFacility(fa.Type);
      switch (fa.Value){
        case "WHEELCHAIR":
          displayFacility.Class="wheelchair";
          break;
        case "DEAF":
          displayFacility.Class="deafness";
          break;
      }
      accesabilities.push(displayFacility);
    }
    return accesabilities;
  }
  public otherFacilities(branch:Branch){
    var facilities = branch.AdditionalInfos;
    console.log(facilities);
    facilities = facilities.filter(a=>a.Type == 1);
    var others: DisplayFacility[]=[];

    for(var fa of facilities){
      var displayFacility = new DisplayFacility(fa.Type);
      switch (fa.Value){
        case "WIFI":
          displayFacility.Class="wifi";
          break;
      }
      others.push(displayFacility);
    }
    return others;
  }

  getCoordinates(branch:Branch){
    return this.http
      .get('https://maps.googleapis.com/maps/api/geocode/json?address='+branch.Street+'+'
        +branch.Number+',+'+branch.City.PostalCode+'+'+branch.City.Name+'&key=AIzaSyCiJDhAZiQWh-hTj-EBeDB7YR9EXmijx9g').map(res =>res.json());
  }
  getCenterCoordinate(city:any){
    return this.http
      .get('https://maps.googleapis.com/maps/api/geocode/json?address='
        +city.PostalCode+'+'+city.Name+'&key=AIzaSyCiJDhAZiQWh-hTj-EBeDB7YR9EXmijx9g').map(res =>res.json());
  }
}
