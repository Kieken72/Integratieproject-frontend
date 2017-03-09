import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-room-new',
  templateUrl: 'room-new.component.html',
  styleUrls: ['room-new.component.css']
})
export class RoomNewComponent implements OnInit {
  private Id:number = 0;
  constructor() {}

  ngOnInit() {
  }

  add(event) {
    var target = event.target;
    var id = target.attributes.id.value;
    if(id == 1){
      var objectToDrag = document.createElement('div');
      objectToDrag.setAttribute('class', 'object');
    }else{
      var objectToDrag = document.createElement('div');
      objectToDrag.setAttribute('class', 'object2');
    }

    objectToDrag.setAttribute('id', this.Id.toString());
    this.Id++;
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

    objectToDrag.onmousemove = function (event) {
      if (dragging) {
        let deltaX = event.clientX - startMousePos.x;
        let deltaY = event.clientY - startMousePos.y;

        objectToDrag.style.left = (deltaX + startDivPos.x) + "px";
        objectToDrag.style.top = (deltaY + startDivPos.y) + "px";

        objectToDrag.textContent = "X:" + event.clientX.toString() + " Y:" + event.clientY.toString()
          + " left: " + objectToDrag.style.left.toString() + " top: " + objectToDrag.style.top.toString()
        + " ID:" +objectToDrag.id.toString();

        var parentRect = room.getBoundingClientRect();
        var childRect = objectToDrag.getBoundingClientRect();
        if (!(parentRect.left <= childRect.left && parentRect.right >= childRect.right && parentRect.bottom >= childRect.bottom && parentRect.top <= childRect.top)) {
          //alert("Object out of area");
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
  }

  save(){
    alert("Post to DB logic")
    /*
    WHAT WE NEED:
    ======================
    - Room id
    - Object id
    - Object position: ex: top and left?
    - Is it a table of baan of other?

     */
  }

}
