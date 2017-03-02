import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../account/shared/user.service";
/**
 * Created by Nico on 02/03/2017.
 */
@Injectable()
export class ManagerGuard implements CanActivate{
  constructor(private user: UserService, public router: Router){}
  private role:string = 'Manager';
  canActivate(){
    let roles = (this.user.getRoles()).split(',');
    var role = roles.filter(u_role => u_role===this.role);
    if(role[0] == this.role){
      console.log('rolesfilters');
      return this.user.isLoggedIn();

    }else{
      this.router.navigate(['account/login']);
    }

  }
}
