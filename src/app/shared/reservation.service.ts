import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Newreservation} from "./model/newreservation";
import {Checkbranch} from "./model/checkbranch";


@Injectable()
export class ReservationService {
  constructor(private  http:Http,@Inject('ApiBase') private apiBase:string ){}

  //private branch:Branch = new Branch();
  //private branchResponse:Branch = new Branch();

  isBranchAvailable(branchId: number, check: Checkbranch){
    return this.http.get(this.apiBase+'reservations/'+branchId+'/?DateTime='+check.DateTime.toJSON()+'&Amount='+check.Amount).map(res => res.json());
  }

  postNewReservation(reservation:Newreservation){
    let token = localStorage.getItem('auth_token');
    let headers = new Headers([{ 'Content-Type': 'application/json' }, {'Authorisation':'Bearer token'}]);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBase+'reservations', JSON.stringify(reservation), options).map((res:Response)=>res.json());
  }






}
