import {Component, OnInit, Input} from '@angular/core';
import {Space} from "../model/space";
import {Params, ActivatedRoute} from "@angular/router";
import {BranchService} from "../../../../shared/branch.service";
import {Branch} from "../../../../shared/model/branch";
import {RoomService} from "../../../../shared/room.service";
import {Room} from "../model/room";

@Component({
  selector: 'app-room-new',
  templateUrl: 'room-new.component.html',
  styleUrls: ['room-new.component.css'],
  providers: [RoomService]
})
export class RoomNewComponent implements OnInit {
  private space: Space  = new Space();
  private persons: number[];
  private branch:Branch;
  private room:Room = new Room();
  private postedRoom:Room = new Room();
  private isPosted: boolean = false;
  constructor(private route: ActivatedRoute, private branchService:BranchService, private roomService:RoomService) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.branchService.getBranch(+params['id']))
      .subscribe(branch => this.whenBranchLoads(branch));
    this.persons = [1,2,3,4,5,6,7,8,9,10,11,12,13,15];
  }

  whenBranchLoads(company){
    this.branch = company;
    console.log(this.branch);
  }

  newRoom(){
    var postedRoom;
    this.roomService.postRoom(this.branch.Id, this.room.Enabled, 60, 70, this.room.Name).subscribe((data)=>this.postedRoom = data );
    var buttonNewPool = document.getElementById('btnNewPool');
    var buttonNewTable = document.getElementById('btnNewTable');
    var buttonSave = document.getElementById('saveBtn');
    buttonNewPool.setAttribute('class', 'btn btn-default');
    buttonNewTable.setAttribute('class', 'btn btn-default');
    buttonSave.setAttribute('class', 'btn btn-default');
  }

  add(event) {
    var croomService = this.roomService;
    var spaceToSave: Space = this.space;
    var cBranch = this.branch;
    var target = event.target;
    var id = target.attributes.id.value;
    var cRoom = this.postedRoom.Id;

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


    var saveBtn = document.getElementById('saveBtn');
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
