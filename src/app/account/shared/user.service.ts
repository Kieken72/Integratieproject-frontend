import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Router} from "@angular/router";
import {Register} from "./model/register";
/**
 * Created by Emmanuel on 20/02/2017.
 */

@Injectable()
export class UserService{
  private loggedIn = false;
  //private companiesUrl = 'https://leisurebooker.azurewebsites.net/api/token';


  constructor(private http: Http,@Inject('ApiBase') private apiBase:string,@Inject('AuthBase') private authBase:string,
              public router: Router){
    this.loggedIn = !!localStorage.getItem('auth_token');
  }
  private registration:Register = new Register();
  private registrationResponse = new Register();
  register(_firstName: string,_lastName: string, _email:string, _password:string,_confirmedPassword:string){

    this.registration.Firstname = _firstName;
    this.registration.Lastname = _lastName;
    this.registration.Username =_email;
    this.registration.Email = _email;
    this.registration.Password = _password;
    this.registration.ConfirmPassword = _confirmedPassword;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this.http.post(this.apiBase+'accounts/create',JSON.stringify(this.registration),options).map((res:Response)=>res.json()).subscribe(
      (res:Register) => {
        this.registrationResponse = res;
        console.log("VALUE RECEIVED: ",res);
      });;
  };

  login(Username, Password){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    var body = 'Username='+Username+'&Password='+Password+'&grant_type=password';
    return this.http.post(this.authBase+'token', body, {headers})
      .map(res => res.json())
      .map((res) => {if(res.access_token){
          localStorage.setItem('auth_token', res.access_token);
          this.loggedIn = true;
      }
      console.log(res.access_token);
      return res.access_token;
    });
  }

  getAccountById(id:string){

    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);

    return this.http.get(this.apiBase+'accounts/user/'+id,{headers}).map(res => res.json())
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn(){
    return this.loggedIn;
  }
}
