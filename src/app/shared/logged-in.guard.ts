import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../account/shared/user.service";
/**
 * Created by Emmanuel on 20/02/2017.
 */
@Injectable()
export class LoggedInGuard implements CanActivate{
  constructor(private user: UserService, public router: Router){}
  canActivate(){

    if(this.user.isLoggedIn()){
      return this.user.isLoggedIn();
    }else{
      this.router.navigate(['login']);
    }

  }
}
