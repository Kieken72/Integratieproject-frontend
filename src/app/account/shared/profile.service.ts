/**
 * Created by Emmanuel on 20/02/2017.
 */
import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {UserToEdit} from "../account-edit/model/userToEdit";

@Injectable()
export class ProfileService{
  private userToPut:UserToEdit = new UserToEdit();

  constructor(private http: Http,@Inject('ApiBase') private apiBase:string){}
  getProfile(){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer  '+authToken);

    return this.http.get(this.apiBase+'accounts',{headers}).map(res => res.json())
  }
  /**For Testing*/
  getProfileWithToken(token:any){
    let headers = new Headers();
    //headers.append('Content-type', 'application/x-www-form-urlencoded');
    //let authToken = localStorage.getItem('auth_token');
    console.log(token);
    headers.append('Authorization', 'Bearer '+token);
        return this.http.get(this.apiBase+'accounts',{headers}).map(res => res.json())
  }

  putAccount(_firstName:string, _lastName: string ){
    this.userToPut.FirstName = _firstName;
    this.userToPut.LastName = _lastName;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiBase+'accounts/', JSON.stringify(this.userToPut), options).map((res:Response)=>res);

  }
}
