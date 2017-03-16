import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../../shared/reservation.service";
import {Reservation} from "../../shared/model/reservation";
import {ManagerService} from "../manager.service";
import {ModalDirective} from "ng2-bootstrap";
import {ShortUser} from "../../shared/model/short-user";

@Component({
  selector: 'app-manager-calendar',
  templateUrl: './manager-calendar.component.html',
  styleUrls: ['./manager-calendar.component.css']
})
export class ManagerCalendarComponent implements OnInit {


  @ViewChild('reservationDetailModal') public reservationDetailModal:ModalDirective;

  private reservations:Reservation[];
  private date:Date = new Date();
  private users: ShortUser[];

  private currentReservation:Reservation;
  constructor(private reservationService:ReservationService, private managerService: ManagerService) { }

  ngOnInit() {
    console.log(this.managerService.branchId);
    this.refreshReservations();
    this.managerService.getGuestsByBranch(this.managerService.branchId).subscribe(data => this.getUsers(data));

  }

  getUsers(users:ShortUser[]){
    this.users = users;
    console.log(this.users)
  }

  refreshReservations(){
    console.log(this.date);
    this.reservationService.getReservationByBranch(this.managerService.branchId, this.date).subscribe(data=>this.setReservations(data));
  }

  setReservations(data){
    console.log(data);
    this.reservations = data;
  }

  showModal(id:number) :void{
    this.currentReservation  = this.reservations.filter(e=>e.Id == id)[0];
    this.reservationDetailModal.show();
  }

  Arrived(id:number){
    console.log(id);
    this.reservationService.arrivedReservation(id).subscribe(data=>console.log(data));
  }

  NoShow(id:number){

    console.log(id);
    this.reservationService.noShowReservation(id).subscribe(data=>console.log(data));
  }
  Cancel(id:number){
    console.log(id);
    this.reservationService.cancelManagerReservation(id).subscribe(data=>console.log(data));
  }



  private opened:boolean = false;
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

}
