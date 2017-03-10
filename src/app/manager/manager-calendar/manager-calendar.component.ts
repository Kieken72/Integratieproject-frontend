import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../../shared/reservation.service";
import {Reservation} from "../../shared/model/reservation";
import {ManagerService} from "../manager.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-manager-calendar',
  templateUrl: './manager-calendar.component.html',
  styleUrls: ['./manager-calendar.component.css']
})
export class ManagerCalendarComponent implements OnInit {


  @ViewChild('reservationDetailModal') public reservationDetailModal:ModalDirective;

  private reservations:Reservation[];

  private currentReservation:Reservation;
  constructor(private reservationService:ReservationService, private managerService: ManagerService) { }

  ngOnInit() {
    this.reservationService.getReservationByBranch(this.managerService.branchId).subscribe(data=>this.reservations = data);
    console.log(this.reservationDetailModal);


  }

  showModal(id:number) :void{
    console.log(id);
    this.currentReservation  = this.reservations.filter(e=>e.Id == id)[0];
    console.log(this.currentReservation);

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
}
