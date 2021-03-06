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
import {BranchService} from "../../shared/branch.service";

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

  private currentBranch:Branch;

  constructor(private searchService : SearchService,
              private managerService : ManagerService,
              private reservationService: ReservationService
  ) { }

  ngOnInit() {
    this.managerService.getGuestsByBranch(this.managerService.branchId).subscribe(data => this.setUsers(data));
    this.currentTime = Observable.interval(1000).map(x=>new Date()).share();
    this.persons = this.searchService.persons;
    this.managerReservation.Amount = 2;
    setTimeout(()=>{
      this.currentBranch = this.managerService.branch;
      console.log(this.currentBranch);
    },2000)
  }

  setUsers(data){
    this.users = data;
  }

  updateDate(newDate){
    var date = newDate.currentTarget.valueAsDate;
    this.managerReservation.DateTime = date;
    this.managerReservation.DateTime.setHours(this.date.getHours());
    this.managerReservation.DateTime.setMinutes(this.date.getMinutes());
    this.date = this.managerReservation.DateTime;
    return this.managerReservation.DateTime;
  }
  updateHour(newHour){
    var date = newHour ;
    this.managerReservation.DateTime = date;
    this.managerReservation.DateTime.setHours(this.date.getHours());
    this.managerReservation.DateTime.setMinutes(this.date.getMinutes());
  }

  private processDate(){
    var date = this.managerReservation.DateTime;
    date.setHours(this.managerReservation.DateTime.getHours()+1);
    date.setMinutes(this.managerReservation.DateTime.getMinutes());
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
      this.managerReservation.EndDateTime = new Date(this.managerReservation.DateTime);
      this.managerReservation.EndDateTime.setHours(this.managerReservation.EndDateTime.getHours()+2);
      this.managerReservation.EndDateTime.setMinutes(this.managerReservation.EndDateTime.getMinutes());
      var param = new ManagerCheckbranch();
      param.StartDate = this.processDate();
      param.EndDate = this.managerReservation.EndDateTime;
      param.Amount = this.managerReservation.Amount;
      this.reservationService.isBranchAvailableManager(this.managerService.branchId, param).subscribe(data=>this.processIsPlace(data));

  }

  reservePlace(){
    this.managerReservation.BranchId = this.managerService.branchId;
    console.log(this.managerReservation);
    this.reservationService.postManagerReservation(this.managerReservation).subscribe(data=>this.reservation=data,err=>console.log(err));
  }

  processIsPlace(data){
    this.reservationResponse = data;
    console.log(this.reservationResponse);
  }

}
