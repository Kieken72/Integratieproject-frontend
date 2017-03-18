import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Router} from "@angular/router";
import {Register} from "./model/register";
import {ProfileService} from "./profile.service";
/**
 * Created by Emmanuel on 20/02/2017.
 */

@Injectable()
export class UserService{
  private loggedIn = false;
  private isAuthorized = false;

  private allowedRole = "Manager";

  constructor(private http: Http,@Inject('ApiBase') private apiBase:string,@Inject('AuthBase') private authBase:string,
              public router: Router,private profileService: ProfileService){
    this.loggedIn = !!localStorage.getItem('auth_token');
  }
  private registration:Register = new Register();
  private registrationResponse = new Register();


  register(_firstName: string,_lastName: string, _email:string,_phonenumber, _password:string,_confirmedPassword:string){

    this.registration.Name = _firstName;
    this.registration.Lastname = _lastName;
    this.registration.Email = _email;
    this.registration.PhoneNumber = _phonenumber;
    this.registration.Password = _password;
    this.registration.ConfirmPassword = _confirmedPassword;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(JSON.stringify(this.registration));
    return this.http.post(this.apiBase+'accounts/create',JSON.stringify(this.registration),options).map((res:Response)=>res.json());
  };

  login(Username, Password){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    var body = 'Username='+Username+'&Password='+Password+'&grant_type=password';
    return this.http.post(this.authBase+'token', body, {headers})
      .map(res => res.json())
      .map((res) => {if(res.access_token){
        localStorage.setItem('auth_token', res.access_token);
        this.getProfile();
        this.loggedIn = true;
      }
        console.log(res.access_token);
        return res.access_token;
      });
  }
  getProfile(){
   return this.profileService.getProfile().subscribe((data)=>this.saveRoles(data));
  }
  saveRoles(data){
    localStorage.setItem('roles',JSON.stringify(data.Roles));;
    console.log('roles : '+ localStorage.getItem('roles'));
    return this.checkRoles(localStorage.getItem('roles'));

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
    localStorage.removeItem('roles');
    this.loggedIn = false;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

    getRoles(){
    this.profileService.getProfile().subscribe((data)=>localStorage.setItem('roles', data.Roles));
    return localStorage.getItem('roles');
  }

  isAuthorizedUser(){
    return this.isAuthorized;
    //let roles = this.getRoles();
    //return this.checkRoles(roles);
  }

  checkRoles(roles){
    var _roles = JSON.parse(roles);
    if(_roles !=null){
      var role = _roles.filter(u_role => u_role===this.allowedRole);
      if(role == this.allowedRole ){
        return this.isAuthorized=true;
      }
    }else{
      this.isAuthorized=false;
    }

  }

  postFavorite(id:number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBase+'accounts/favorite/'+id, JSON.stringify(id), options).map((res:Response)=>res);

  }
  deleteFavorite(id:number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.apiBase+'accounts/favorite/'+id, options).map((res:Response)=>res);

  }
}
