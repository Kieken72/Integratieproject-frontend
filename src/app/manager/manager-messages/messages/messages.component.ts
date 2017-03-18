import { Component, OnInit } from '@angular/core';
import {Message} from "../model/message";
import {ManagerService} from "../../shared/manager.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private refreshing: boolean;
  private messages: Message[];
  constructor(private managerService:ManagerService) {
    this.refreshing = true;
  }

  ngOnInit() {
    this.managerService.getMessagesByBranch(this.managerService.branchId).subscribe(
      (data)=>this.getData(data));
  }

  getData(data){
    this.messages = data;
    this.refreshing = false;
  }

}
