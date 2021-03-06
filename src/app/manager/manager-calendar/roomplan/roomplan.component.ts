import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {Room} from "../../manager-settings/rooms/model/room";
import {ManagerService} from "../../shared/manager.service";
import {ReservationService} from "../../../shared/reservation.service";
import {Reservation} from "../../../shared/model/reservation";
import {Branch} from "../../../shared/model/branch";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-roomplan',
  templateUrl: './roomplan.component.html',
  styleUrls: ['./roomplan.component.css']
})
export class RoomplanComponent implements OnInit {

  private date:Date = new Date();
  private opened:boolean = false;
  private room: Room;
  private roomId:number = 1;
  private branch: Branch;
  private reservations:Reservation[];
  private currentReservation:Reservation;

  @ViewChild('reservationDetailModal') public reservationDetailModal:ModalDirective;
  @ViewChild('roomPlan') canvasRef:ElementRef;
  private canvas: any;
  private refreshing: boolean;

  public get currentReservationStatus(){
    if(this.currentReservation){
      if(this.currentReservation.Arrived){
        return "Aangekomen"
      }
      if(this.currentReservation.NoShow){
        return "Niet opgedaagd"
      }if(this.currentReservation.Cancelled){
        return "Geannuleerd"
      }
    }
    return "";
  }

  public get currentStatus(){
    if(this.currentReservation){
      if(this.currentReservation.Arrived){
        return "Arrived"
      }
      if(this.currentReservation.NoShow){
        return "NoShow"
      }if(this.currentReservation.Cancelled){
        return "Cancel"
      }
    }
    return "";
  }

  constructor(private reservationService:ReservationService, private managerService: ManagerService) {
    this.refreshing = true;
  }

  hover(id:number){
    if (this.canvas.getContext) {
      let canvas = this.canvas;
      if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.font = "10pt Arial";
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#19f8ff";
        ctx.beginPath();
        var space = this.room.Spaces.find(e=>e.Id == id);
        ctx.fillRect(space.X, space.Y, 80,160)
        ctx.strokeRect(space.X, space.Y, 80,160);
        ctx.fillStyle = "#000";
        ctx.fillText(space.Reservations.length, space.X+3, space.Y+13);
        var reservation = new Date(space.Reservations[0].DateTime);
        var dateString = reservation.getHours()+':'+(reservation.getMinutes()<10?'0':'') + reservation.getMinutes();
        ctx.fillText(dateString, space.X+20, space.Y+100);
        ctx.fillText(space.Name, space.X+20, space.Y+80);
        ctx.save();
      }
    }
  }
  hoverLeave(){
    this.clearCanvas();
    this.drawRoom();
  }
  ngOnInit() {
    this.reservations = [];
    setTimeout(() => {
      this.branch = this.managerService.branch;
      this.roomId = this.branch.Rooms[0].Id;
      this.refreshReservations();
      console.log(this.roomId);
    }, 1000);

    console.log(this.roomId)

  }
  refreshReservations(){this.refreshing = true;
    this.reservationService.getRecentReservationByRoom(this.roomId, this.date).subscribe(data=> this.getData(data));
  }

  getData(data){
    this.room = data;
    this.canvas.width = this.room.Width;
    this.canvas.height = this.room.Height;
    this.clearCanvas();
    this.drawRoom();
    this.refreshing = false;
  }



  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
  }
  clearCanvas(){
    this.reservations = [];
    if (this.canvas.getContext) {
      let canvas = this.canvas;
      if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
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
            for(var res of space.Reservations){
              this.reservations.push(res);
            }
            ctx.fillText(space.Reservations.length, space.X+3, space.Y+13);
            var reservation = new Date(space.Reservations[0].DateTime);
            var dateString = reservation.getHours()+':'+(reservation.getMinutes()<10?'0':'') + reservation.getMinutes();
            ctx.fillText(dateString, space.X+20, space.Y+100);
          }
          ctx.fillText(space.Name, space.X+20, space.Y+80);
          ctx.save();
        }
      }
    }
  }
  public open():void {
    this.opened = !this.opened;
  }
  public close():void {
    this.opened = !this.opened;
  }
  public addDay():void{
    let newDate = new Date();
    newDate.setTime(this.date.getTime()+(1000 * 60 * 60 * 24));
    this.date = newDate
    this.refreshReservations();
  }
  public removeDay():void{
    let newDate = new Date();
    newDate.setTime(this.date.getTime()-(1000 * 60 * 60 * 24));
    this.date = newDate
    this.refreshReservations();
  }
  public today(){
    let newDate = new Date();
    this.date = newDate
    this.refreshReservations();
  }

  public onSelectionDone() {
    this.close();
    this.refreshReservations();
  }
  showModal(id:number) :void{
    this.currentReservation  = this.reservations.filter(e=>e.Id == id)[0];
    console.log(id+' '+this.currentReservation);
    this.reservationDetailModal.show();
  }

  actionAfterModalChange(data){
    console.log(data);
    this.reservationDetailModal.hide();
    this.refreshReservations();
  }
  Arrived(id:number){
    console.log(id);
    this.reservationService.arrivedReservation(id).subscribe(data=>this.actionAfterModalChange(data));
  }

  NoShow(id:number){

    console.log(id);
    this.reservationService.noShowReservation(id).subscribe(data=>this.actionAfterModalChange(data));
  }
  Cancel(id:number){
    console.log(id);
    this.reservationService.cancelManagerReservation(id).subscribe(data=>this.actionAfterModalChange(data));
  }
}
