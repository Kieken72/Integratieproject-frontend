import {Injectable, Inject} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";
/**
 * Created by Emmanuel on 20/02/2017.
 */

@Injectable()
export class UserService{
  private loggedIn = false;
  //private companiesUrl = 'https://leisurebooker.azurewebsites.net/api/token';


  constructor(private http: Http,@Inject('ApiBase') private apiBase:string,@Inject('AuthBase') private authBase:string, public router: Router){
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

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

  logout(){
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

}
