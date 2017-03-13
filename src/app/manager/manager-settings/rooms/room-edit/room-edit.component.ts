import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RoomService} from "../../../../shared/room.service";
import {Room} from "../model/room";
import {Space} from "../model/space";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  private room:Room;

  private spaces:Space[];

  constructor(private route: ActivatedRoute, private roomService:RoomService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.roomService.getRoom(+params['id']))
      .subscribe(room => this.whenRoomLoads(room));
  }

  whenRoomLoads(cRoom){
    this.room = cRoom;

    this.room.spaces.forEach((cSpace)=>{
      this.spaces.push(cSpace);
    })

    this.generateObjects();
  }

  generateObjects(){
    var room = document.getElementById('room');

    /*this.room.spaces.forEach((cRoom)=>{
      var objectToDrag = document.createElement('div');
      room.appendChild(objectToDrag);
      objectToDrag.setAttribute('class', 'object');
      objectToDrag.setAttribute('top', cRoom.x + "px");
    })*/



  }
}
