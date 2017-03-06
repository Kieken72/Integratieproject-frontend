import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Newreservation} from "./model/newreservation";
import {Checkbranch} from "./model/checkbranch";
import {Message} from "../booker/booker-reservationdetail/model/message";
import {Review} from "./model/review";


@Injectable()
export class ReservationService {
  constructor(private  http:Http,@Inject('ApiBase') private apiBase:string ){}
  private message:Message = new Message();
  //private branch:Branch = new Branch();
  //private branchResponse:Branch = new Branch();

  isBranchAvailable(branchId: number, check: Checkbranch){
    return this.http.get(this.apiBase+'reservations/'+branchId+'/?DateTime='+check.DateTime.toJSON()+'&Amount='+check.Amount).map(res => res.json());
  }

  postNewReservation(reservation:Newreservation){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBase+'reservations', JSON.stringify(reservation), options).map((res:Response)=>res.json());
  }

  getReservationByBranch(branchId:number){
    return this.http.get(this.apiBase+'reservations/branch/'+branchId).map(res => res.json());
  }

  postReview(review:Review){
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type','application/json');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });
    console.log(headers);
    console.log(JSON.stringify(review));
    return this.http.post(this.apiBase+'reviews/', JSON.stringify(review), options).map((res:Response)=>res.json());

  }

  postMessage(resId: string, branchId: string, text: string){
    this.message.branchId = branchId;
    this.message.reservationId = resId;
    this.message.text = text;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiBase+'messages/', JSON.stringify(this.message), options).map((res:Response)=>res);
  }

  getMessages(number:string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiBase+'messages/' + number, options).map(res=>res.json());
  }






}
