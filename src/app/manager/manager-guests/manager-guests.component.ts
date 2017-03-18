import { Component, OnInit } from '@angular/core';
import {ShortUser} from "../../shared/model/short-user";
import {ManagerService} from "../shared/manager.service";

@Component({
  selector: 'app-manager-guests',
  templateUrl: './manager-guests.component.html',
  styleUrls: ['./manager-guests.component.css']
})
export class ManagerGuestsComponent implements OnInit {

  private refreshing: boolean;
  constructor(private managerService:ManagerService) {
    this.refreshing = true;
  }

  private users:ShortUser[];
  ngOnInit() {
    this.managerService.getGuestsByBranch(this.managerService.branchId).subscribe(data => this.getUsers(data));
  }

  getUsers(users:ShortUser[]){
    this.users = users;
    this.refreshing = false;
  }
}
