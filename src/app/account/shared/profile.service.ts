/**
 * Created by Emmanuel on 20/02/2017.
 */
import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {UserToEdit} from "../account-edit/model/userToEdit";
import {PasswordToEdit} from "../account-edit/model/password-to-edit";

@Injectable()
export class ProfileService{
  private userToPut:UserToEdit = new UserToEdit();
  private passwordToPut:PasswordToEdit = new PasswordToEdit();


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

  putAccount(_firstName:string, _lastName: string, _phoneNumber: string ){
    this.userToPut.Name = _firstName;
    this.userToPut.LastName = _lastName;
    this.userToPut.PhoneNumber = _phoneNumber;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiBase+'accounts/', JSON.stringify(this.userToPut), options).map((res:Response)=>res);

  }

  changePassword(_oldPassword:string, _newPassword: string, _confirmPassword: string)
  {
    this.passwordToPut.OldPassword = _oldPassword;
    this.passwordToPut.NewPassword = _newPassword;
    this.passwordToPut.ConfirmPassword = _confirmPassword;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiBase+'/accounts/ChangePassword', JSON.stringify(this.passwordToPut), options).map((res:Response)=>res);

  }
}
