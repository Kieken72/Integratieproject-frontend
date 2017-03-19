import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Reservation} from "../../../shared/model/reservation";
import {ModalDirective} from "ng2-bootstrap";
import {ManagerService} from "../../shared/manager.service";
import {ReservationService} from "../../../shared/reservation.service";

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {

  @ViewChild('reservationDetailModal') public reservationDetailModal:ModalDirective;

  private date:Date = new Date();
  private reservations:Reservation[];
  private currentReservation:Reservation;
  private opened:boolean = false;
  private refreshing: boolean;

  constructor(private reservationService:ReservationService, private managerService: ManagerService) {
    this.refreshing = true;
  }

  ngOnInit() {
    this.refreshReservations();
  }
  refreshReservations(){
    this.refreshing = true;
    console.log("refreshing..");
    this.reservationService.getReservationByBranch(this.managerService.branchId, this.date).subscribe(data=> this.loadData(data));
  }

  loadData(data){
    this.reservations = data;
    this.refreshing = false;
  }
  showModal(id:number) :void{
    this.currentReservation  = this.reservations.filter(e=>e.Id == id)[0];
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
