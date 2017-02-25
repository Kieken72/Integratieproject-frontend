import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../shared/reservation.service";
import {Reservation} from "../../shared/model/reservation";

@Component({
  selector: 'app-manager-calendar',
  templateUrl: './manager-calendar.component.html',
  styleUrls: ['./manager-calendar.component.css']
})
export class ManagerCalendarComponent implements OnInit {

  private reservations:Reservation[];
  constructor(private reservationService:ReservationService) { }

  ngOnInit() {
    this.reservationService.getReservationByBranch(2).subscribe(data=>this.reservations = data);
  }

}
