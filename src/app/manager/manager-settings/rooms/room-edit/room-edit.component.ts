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

  private spaces:Space[] = new Array();

  constructor(private route: ActivatedRoute, private roomService:RoomService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.roomService.getRoom(+params['id']))
      .subscribe(room => this.whenRoomLoads(room));
  }

  whenRoomLoads(cRoom){
    this.room = cRoom;

    this.room.Spaces.forEach((cSpace)=>{
      this.spaces.push(cSpace);
      this.generateObjects(cSpace);
    })


  }

  generateObjects(space:Space){
    var room = document.getElementById('room');


      var objectToDrag = document.createElement('div');

      objectToDrag.setAttribute('class', 'object');
      objectToDrag.setAttribute('top', space.x + "px");
      objectToDrag.setAttribute('id', space.Name);

    room.appendChild(objectToDrag);


  }
}
