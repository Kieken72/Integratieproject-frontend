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
    var croomService = this.roomService;
    var cRoom = this.room.Id;

    if(space.Type == 0){
      objectToDrag.setAttribute('class', 'object');
    }else{
      objectToDrag.setAttribute('class', 'object2');
    }

    objectToDrag.style.left = space.X + "px";
    objectToDrag.style.top = space.Y + "px";
      objectToDrag.setAttribute('id', space.Name);
    objectToDrag.setAttribute('minPers', space.MinPersons.toString());
    objectToDrag.setAttribute('numPers', space.Persons.toString());
    objectToDrag.setAttribute('enabled', space.Enabled.toString());

    objectToDrag.textContent = space.Name + "(" + space.Persons + "pers.)"
      + " min: " + space.MinPersons + "pers.";

    //TO test:

    var startMousePos = {x: space.X, y: space.Y}
    var startDivPos = {x: space.X, y: space.Y}
    var dragging = false;
    var outOfArea = false;

    objectToDrag.onmousedown = function (event) {
      startMousePos.x = event.clientX;
      startMousePos.y = event.clientY;
      startDivPos.x = objectToDrag.offsetLeft;
      startDivPos.y = objectToDrag.offsetTop;
      dragging = true;
    }

    objectToDrag.onmousemove = function (event) {
      if (dragging) {
        let deltaX = event.clientX - startMousePos.x;
        let deltaY = event.clientY - startMousePos.y;

        objectToDrag.style.left = (deltaX + startDivPos.x) + "px";
        objectToDrag.style.top = (deltaY + startDivPos.y) + "px";

        var parentRect = room.getBoundingClientRect();
        var childRect = objectToDrag.getBoundingClientRect();
        if (!(parentRect.left <= childRect.left && parentRect.right >= childRect.right && parentRect.bottom >= childRect.bottom && parentRect.top <= childRect.top)) {
          outOfArea = true;
          objectToDrag.style.backgroundColor = "red";
        }else{
          outOfArea = false;
          objectToDrag.style.backgroundColor = "black";
        }
      }
    }

    objectToDrag.onmouseup = function (event) {
      dragging = false;
    }

    room.appendChild(objectToDrag);

    var saveBtn = document.getElementById('updateBtn');
    saveBtn.addEventListener('click',function(){

      var spaceType;
      if(objectToDrag.getAttribute('class') == "object"){
        spaceType = 0;
      }else{
        spaceType = 1;
      }

      var left = objectToDrag.style.left
      left.substring(0, left.length-2);

      var top = objectToDrag.style.top
      top.substring(0, top.length-2);

      croomService.putSpace(space.Id,objectToDrag.id, objectToDrag.getAttribute('enabled'),
        parseInt(objectToDrag.getAttribute('numPers')), parseInt(objectToDrag.getAttribute('minPers')),
        cRoom, parseInt(left), parseInt(top), spaceType ).subscribe((data)=>console.log(data) );
    });
  }


}
