import {Component, OnInit, Injectable, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../account/shared/user.service";
import {ManagerService} from "../manager.service";

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css']
})

export class ManagerNavbarComponent implements OnInit,OnDestroy {

  ngOnDestroy(): void {
    console.log(this.branchId);
    this.managerService.branchId = this.branchId;
  }

  private title = "LeisureManager";
  private branchId:number;
  constructor(public router: Router, private userService: UserService, private managerService: ManagerService) { }

  changeBranch(event){
    this.managerService.branchId = this.branchId;
    console.log(this.branchId);
  }
  ngOnInit() {
    this.branchId = this.managerService.branchId;
  }

  logout() {
    //localStorage.removeItem('id_token');
    //this.router.navigate(['login']);
    this.userService.logout();
  }

}
