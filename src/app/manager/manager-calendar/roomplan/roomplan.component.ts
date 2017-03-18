import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {Room} from "../../manager-settings/rooms/model/room";
import {ManagerService} from "../../shared/manager.service";
import {ReservationService} from "../../../shared/reservation.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Space} from "../../manager-settings/rooms/model/space";
import {listLazyRoutesOfModule} from "@angular/compiler-cli/src/ngtools_impl";

@Component({
  selector: 'app-roomplan',
  templateUrl: './roomplan.component.html',
  styleUrls: ['./roomplan.component.css']
})
export class RoomplanComponent implements OnInit {


  private room: Room;
  @ViewChild('roomPlan') canvasRef:ElementRef;
  private canvas: any;
  private date:Date = new Date();

  constructor(private reservationService:ReservationService, private managerService: ManagerService) { }

  ngOnInit() {
    this.refreshReservations();
  }
  refreshReservations(){
    this.reservationService.getRecentReservationByRoom(1, this.date).subscribe(data=> this.getData(data));
  }

  getData(data){
    this.room = data;
    console.log(data);
    this.drawRoom();
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.draw();
  }
  drawRoom(){
    if (this.canvas.getContext) {
      let canvas = this.canvas;
      if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.font = "10pt Arial";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var space of this.room.Spaces){

          var hasReservations= space.Reservations.length>0;
          ctx.fillStyle = hasReservations?'red':'green';
          ctx.fillRect(space.X, space.Y, 80,160)
          ctx.strokeRect(space.X, space.Y, 80,160);

          ctx.fillStyle = "#000";
          if(hasReservations){
            console.log(space.Reservations);
            ctx.fillText(space.Reservations.length, space.X+3, space.Y+13);
            var reservation = new Date(space.Reservations[0].DateTime);
            ctx.fillText(reservation.getHours()+':'+reservation.getMinutes(), space.X+20, space.Y+100);
          }
          ctx.fillText(space.Name, space.X+20, space.Y+80);
          ctx.save();
        }
      }
    }
  }
}
