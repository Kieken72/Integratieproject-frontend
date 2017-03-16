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
  private persons: number[];
  private spaces:Space[] = new Array();
  private space: Space  = new Space();


  constructor(private route: ActivatedRoute, private roomService:RoomService) {    this.persons = [1,2,3,4,5,6,7,8,9,10,11,12,13,15]; }

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
      //this.space = cSpace;
    })
  }

  updateObject(cSpace){
    var object = document.getElementById(cSpace.oldName);
    object.setAttribute('id', cSpace.Name);
    object.setAttribute('oldid', cSpace.oldName);
    object.setAttribute('minPers', cSpace.MinPersons.toString());
    object.setAttribute('numPers', cSpace.Persons.toString());
    object.setAttribute('enabled', cSpace.Enabled);
    object.textContent = cSpace.Name + "(" + cSpace.Persons + "pers.)"
      + " min: " + cSpace.MinPersons + "pers.";
    cSpace.oldName = cSpace.Name;
  }

  generateObjects(space:Space){
    var room = document.getElementById('room');
    var objectToDrag = document.createElement('div');
    var croomService = this.roomService;
    var cRoom = this.room.Id;
    var allSpaces = this.spaces;

    if(space.Type == 0){
      objectToDrag.setAttribute('class', 'object');
    }else{
      objectToDrag.setAttribute('class', 'object2');
    }

    objectToDrag.style.left = space.X + "px";
    objectToDrag.style.top = space.Y + "px";
    space.oldName = space.Name;
      objectToDrag.setAttribute('id', space.Name);
      objectToDrag.setAttribute('oldId', space.Name);
    objectToDrag.setAttribute('minPers', space.MinPersons.toString());
    objectToDrag.setAttribute('numPers', space.Persons.toString());
    objectToDrag.setAttribute('enabled', space.Enabled.toString());

    //data-toggle="modal" data-target="#poolModal"

    objectToDrag.setAttribute('data-toggle', 'modal');
    objectToDrag.setAttribute('data-target', '#'+space.Id);

    objectToDrag.textContent = space.Name + "(" + space.Persons + "pers.)"
      + " min: " + space.MinPersons + "pers.";

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

    objectToDrag.ondblclick =  function(event){
      alert('dubble');
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

          alert(objectToDrag.id + "is aangepast!");





    });


  }

  add(event) {
    var croomService = this.roomService;
    var target = event.target;
    var id = target.attributes.id.value;
    var cRoom = this.room.Id;
    if(id == 1){
      var objectToDrag = document.createElement('div');
      objectToDrag.setAttribute('class', 'object');
    }else{
      var objectToDrag = document.createElement('div');
      objectToDrag.setAttribute('class', 'object2');
    }

    objectToDrag.setAttribute('id', this.space.Name);
    objectToDrag.setAttribute('minPers', this.space.MinPersons.toString());
    objectToDrag.setAttribute('numPers', this.space.Persons.toString());
    objectToDrag.setAttribute('enabled', this.space.Enabled.toString());

    var room = document.getElementById('room');
    room.appendChild(objectToDrag);

    var startMousePos = {x: 0, y: 0}
    var startDivPos = {x: 0, y: 0}
    var dragging = false;
    var outOfArea = false;

    objectToDrag.onmousedown = function (event) {
      startMousePos.x = event.clientX;
      startMousePos.y = event.clientY;
      startDivPos.x = objectToDrag.offsetLeft;
      startDivPos.y = objectToDrag.offsetTop;
      dragging = true;
    }

    objectToDrag.textContent = this.space.Name + "(" + this.space.Persons + "pers.)"
      + " min: " + this.space.MinPersons + "pers.";

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
    var saveBtn = document.getElementById('updateBtn');
    saveBtn.addEventListener('click',function(){
      /*alert("Naam nieuwe baan: " +    objectToDrag.id
       + " Linkse positie: "  + objectToDrag.style.left
       + " Top positie: "  + objectToDrag.style.top
       + " Min pers: " + objectToDrag.getAttribute('minPers')
       + " Aantal pers: " + objectToDrag.getAttribute('numPers')
       + " Beschikbaar: " + objectToDrag.getAttribute('enabled')
       + "Room enabled" + cRoom.enabled
       + "Room naam" + cRoom.name);*/
      alert(objectToDrag.id + " is aangemaakt!");

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

      croomService.postSpaces(objectToDrag.id, objectToDrag.getAttribute('enabled'),
        parseInt(objectToDrag.getAttribute('numPers')), parseInt(objectToDrag.getAttribute('minPers')),
        cRoom, parseInt(left), parseInt(top), spaceType ).subscribe((data)=>console.log(data) );


    });
  }



}
