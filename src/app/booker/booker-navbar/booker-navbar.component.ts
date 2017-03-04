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

  constructor(private userService:UserService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.userService.getRoles();
    this.isAuthorized =this.userService.isAuthorizedUser();
  }

  logout(){
    this.isAuthorized=false;
    this.userService.logout();
  }
}
