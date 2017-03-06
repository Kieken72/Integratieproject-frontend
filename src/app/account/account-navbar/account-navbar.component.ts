import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-account-navbar',
  templateUrl: './account-navbar.component.html',
  styleUrls: ['./account-navbar.component.css']
})
export class AccountNavbarComponent implements OnInit {

  private isLoggedIn: boolean;
  private isAuthorized:boolean;

  constructor(private userService:UserService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAuthorized =this.userService.isAuthorizedUser();
  }

  logout(){
    this.isAuthorized=false;
    this.userService.logout();
  }

}
