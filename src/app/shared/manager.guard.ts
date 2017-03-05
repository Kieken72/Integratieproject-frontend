import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../account/shared/user.service";
/**
 * Created by Nico on 02/03/2017.
 */
@Injectable()
export class ManagerGuard implements CanActivate{
  constructor(private user: UserService, public router: Router){}

  private isAuthorized:boolean;
  private role:string = 'Manager';
  canActivate(){
    let roles = JSON.parse(this.user.getRoles());
    var role = roles.filter(u_role => u_role===this.role);
    if(role[0] == this.role){
      this.isAuthorized=true;
      return this.user.isLoggedIn();

    }else{
      alert('je moet beschikken over een manager rol om dit te kunnen zien!');
      this.router.navigate(['account/login']);
    }

  }


}
