import {Component, OnInit, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../account/shared/user.service";

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css']
})

export class ManagerNavbarComponent implements OnInit {

  private title = "LeisureManager";
  constructor(public router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    //localStorage.removeItem('id_token');
    //this.router.navigate(['login']);
    this.userService.logout();
  }

}
