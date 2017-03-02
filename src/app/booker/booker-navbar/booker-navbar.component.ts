import {Component, OnInit, Input} from '@angular/core';
import {UserService} from "../../account/shared/user.service";

@Component({
  selector: 'app-booker-navbar',
  templateUrl: './booker-navbar.component.html',
  styleUrls: ['./booker-navbar.component.css']
})
export class BookerNavbarComponent implements OnInit {

  @Input() backgroundImage: boolean;

  private isLoggedIn: boolean;
  private isAuthorized:boolean;
  private userRoles :string;
  private allowedRole = "Manager";

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.userRoles = JSON.parse(localStorage.getItem('roles'));
    this.checkRoles(this.userRoles);
  }
  checkRoles(roles){
    var role = roles.filter(u_role => u_role===this.allowedRole);
    if(role == this.allowedRole ){
      this.isAuthorized=true;
      return this.isAuthorized;
    }
  }
}
