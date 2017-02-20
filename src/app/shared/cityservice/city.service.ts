import {Injectable, Inject} from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CityService {
  constructor(private  http:Http,@Inject('ApiBase') private apiBase:string){}


  getCities(){
    return this.http.get(this.apiBase+'cities').map(res => res.json());
  }
}
