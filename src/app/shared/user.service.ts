import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
/**
 * Created by Emmanuel on 20/02/2017.
 */

@Injectable()
export class UserService{
  private loggedIn = false;
  private companiesUrl = 'http://leisurebooker.azurewebsites.net/api/token';


  constructor(private http: Http){
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(Username, Password){
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    var body = 'Username=Username?Password=Password&grant_type=password';
    return this.http.post(this.companiesUrl, body, {headers})
      .map(res => res.json()).map((res) => {if(res.succes){
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
      }
      return res.succes;
    });
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

}
