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
    this.roomService.postRoom(this.branch.Id, this.room.enabled, "60", "70", this.room.name).subscribe((data)=>this.postedRoom = data );
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

    objectToDrag.setAttribute('id', this.space.spaceName);
    objectToDrag.setAttribute('minPers', this.space.minNumberOfPersons.toString());
    objectToDrag.setAttribute('numPers', this.space.numberOfPerons.toString());
    objectToDrag.setAttribute('enabled', this.space.enabled.toString());

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

    objectToDrag.textContent = this.space.spaceName + "(" + this.space.numberOfPerons + "pers.)"
    + " min: " + this.space.minNumberOfPersons + "pers.";

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
        alert(cRoom);

      var spaceType;
      if(objectToDrag.getAttribute('class') == "object"){
        spaceType = 0;
      }else{
        spaceType = 1;
      }

      croomService.postSpaces(objectToDrag.id, objectToDrag.getAttribute('enabled'), objectToDrag.getAttribute('numPers'), objectToDrag.getAttribute('minPers'), cRoom, objectToDrag.style.left, objectToDrag.style.top, spaceType ).subscribe((data)=>console.log(data) );
    });
  }
}
