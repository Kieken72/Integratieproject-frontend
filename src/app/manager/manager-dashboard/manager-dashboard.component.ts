import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {SearchService} from "../../booker/shared/search.service";
import {ManagerService} from "../shared/manager.service";
import {ShortUser} from "../../shared/model/short-user";
import {ManagerReservation} from "../../shared/model/ManagerReservation";
import {ManagerCheckbranch} from "../../shared/model/manager-checkbranch";
import {Branch, CheckMessage} from "../../shared/model/branch";
import {ReservationService} from "../../shared/reservation.service";
import {Reservation} from "../../shared/model/reservation";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})

export class ManagerDashboardComponent implements OnInit {
  private currentTime: Observable<Date>;
  private date : Date = new Date() ;
  private users: ShortUser[] = new Array();
  private managerReservation: ManagerReservation = new ManagerReservation();
  private persons : number[];
  private reservation: Reservation;
  public CheckMessage = CheckMessage;
  private reservationResponse: Branch;

  constructor(private searchService : SearchService, private managerService : ManagerService, private reservationService: ReservationService) { }

  ngOnInit() {

    this.managerService.getGuestsByBranch(this.managerService.branchId).subscribe(data => this.setUsers(data));
    this.currentTime = Observable.interval(1000).map(x=>new Date()).share();
    this.persons = this.searchService.persons;
    this.managerReservation.Amount = 2;
  }

  setUsers(data){
    this.users = data;
  }

  updateDate(newDate){
    var date = newDate.currentTarget.valueAsDate;
    this.managerReservation.StartDate = date;
    this.managerReservation.StartDate.setHours(this.date.getHours());
    this.managerReservation.StartDate.setMinutes(this.date.getMinutes());
    this.date = this.managerReservation.StartDate;
    return this.managerReservation.StartDate;
  }
  updateHour(newHour){
    var date = newHour ;
    this.managerReservation.StartDate = date;
    this.managerReservation.StartDate.setHours(this.date.getHours());
    this.managerReservation.StartDate.setMinutes(this.date.getMinutes());
  }

  private processDate(){
    var date = this.managerReservation.StartDate;
    date.setHours(this.managerReservation.StartDate.getHours()+1);
    date.setMinutes(this.managerReservation.StartDate.getMinutes());
    return date;
  }
  private processEndDate(endDate:Date){
    var hour = endDate;
    hour.setHours(endDate.getHours()+3);
    hour.setMinutes(endDate.getMinutes());
    return hour;
  }

  refreshReservation(){
      this.reservationResponse = null;
      this.managerReservation.EndDate = new Date(this.managerReservation.StartDate);
      this.managerReservation.EndDate.setHours(this.managerReservation.EndDate.getHours()+3);
      this.managerReservation.EndDate.setMinutes(this.managerReservation.EndDate.getMinutes());
      var param = new ManagerCheckbranch();
      param.StartDate = this.processDate();
      param.EndDate = this.managerReservation.EndDate;
      param.Amount = this.managerReservation.Amount;
      this.reservationService.isBranchAvailableManager(this.managerService.branchId, param).subscribe(data=>this.processIsPlace(data));

  }

  reservePlace(){
    this.managerReservation.BranchId = this.managerService.branchId;
    this.reservationService.postManagerReservation(this.managerReservation).subscribe(data=>this.reservation=data,err=>console.log(err));
  }

  processIsPlace(data){
    this.reservationResponse = data;
    console.log(this.reservationResponse);
  }

}
