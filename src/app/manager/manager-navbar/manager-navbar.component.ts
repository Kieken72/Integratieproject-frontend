import {Component, OnInit, Injectable, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../account/shared/user.service";
import {ManagerService} from "../shared/manager.service";
import {Branch} from "../../shared/model/branch";

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
  private branches:Branch[];

  constructor(public router: Router, private userService: UserService, private managerService: ManagerService) { }

  changeBranch(){
    this.managerService.branchId = this.branchId;
    this.managerService.refresh();
  }
  ngOnInit() {
    this.branchId = this.managerService.branchId;
    setTimeout(() => {
      this.branches = this.managerService.branches;
    }, 1000);
  }

  logout() {
    //localStorage.removeItem('id_token');
    //this.router.navigate(['login']);
    this.userService.logout();
  }

}
