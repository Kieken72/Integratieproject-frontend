import {Http, Headers} from "@angular/http";
import {Inject, Injectable} from "@angular/core";

/**
 * Created by lotte on 17/03/2017.
 */

@Injectable()
export class StatisticService {
  constructor(private http: Http,@Inject('ApiBase') private apiBase:string){}

  getReviewStatistics(_branchId: number){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer  '+authToken);

    return this.http.get(this.apiBase+'statistics/reviews/'+_branchId, {headers}).map(res => res.json())
  }

  getWeekdayStatistics(_branchId: number){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer  '+authToken);

    return this.http.get(this.apiBase+'statistics/weekday/'+_branchId, {headers}).map(res => res.json())
  }

  getGuestStatistics(_branchId: number){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer  '+authToken);

    return this.http.get(this.apiBase+'statistics/guests/'+_branchId, {headers}).map(res => res.json())
  }
}
