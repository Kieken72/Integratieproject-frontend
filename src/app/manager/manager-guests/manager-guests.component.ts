import { Component, OnInit } from '@angular/core';
import {ManagerService} from "../manager.service";
import {ShortUser} from "../../shared/model/short-user";

@Component({
  selector: 'app-manager-guests',
  templateUrl: './manager-guests.component.html',
  styleUrls: ['./manager-guests.component.css']
})
export class ManagerGuestsComponent implements OnInit {

  constructor(private managerService:ManagerService) { }

  private users:ShortUser[];
  ngOnInit() {
    this.managerService.getGuestsByBranch(this.managerService.branchId).subscribe(data => this.getUsers(data));
  }

  getUsers(users:ShortUser[]){
    this.users = users;
    console.log(this.users)
  }
}
