import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {Reservation} from "../../../shared/model/reservation";
import {ReservationService} from "../../../shared/reservation.service";
import {ManagerService} from "../../shared/manager.service";

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {

  @ViewChild('reservationDetailModal') public reservationDetailModal:ModalDirective;
  private recentReservations:Reservation[];
  private currentReservation:Reservation;
  private refreshing: boolean;

  constructor(private reservationService:ReservationService, private managerService: ManagerService) {
    this.refreshing = true;
  }

  ngOnInit() {
    this.refreshReservations();
  }
  refreshReservations(){
    this.reservationService.getRecentReservationByBranch(this.managerService.branchId).subscribe(data=> this.showData(data));
  }
  showData(data){
    this.recentReservations = data;
    this.refreshing = false;
  }

  showModal(id:number) :void{
    this.currentReservation  = this.recentReservations.filter(e=>e.Id == id)[0];
    this.reservationDetailModal.show();
  }

  Cancel(id:number){
    console.log(id);
    this.reservationService.cancelManagerReservation(id).subscribe(data=>console.log(data));
  }
}
