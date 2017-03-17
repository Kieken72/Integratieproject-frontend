import { Component, OnInit } from '@angular/core';
import {Message} from "../model/message";
import {ManagerService} from "../../manager.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private messages: Message[];
  constructor(private managerService:ManagerService) { }

  ngOnInit() {
    this.managerService.getMessagesByBranch(this.managerService.branchId).subscribe(
      (data)=>this.messages=data);
  }

}
