import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../shared/branch.service";
import {ManagerService} from "../manager.service";
import {Message} from "./model/message";

@Component({
  selector: 'app-manager-messages',
  templateUrl: './manager-messages.component.html',
  styleUrls: ['./manager-messages.component.css']
})
export class ManagerMessagesComponent implements OnInit {

  constructor(private branchService: BranchService,private managerService:ManagerService) { }
  private messages: Message[];

  ngOnInit() {
    this.managerService.getMessagesByBranch(this.managerService.branchId).subscribe(
      (data)=>this.messages=data,(error)=>console.log(error),
      ()=>(this.messages.reverse())
    /*this.messages.sort(function (a, b) {
        return b.dateTime.getDate() - a.dateTime.getDate();
      })*/
    );

  }
}
