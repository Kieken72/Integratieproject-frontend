import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../../shared/reservation.service";
import {Reservation} from "../../shared/model/reservation";
import {ManagerService} from "../manager.service";
import {ModalDirective} from "ng2-bootstrap";
import {ShortUser} from "../../shared/model/short-user";
import {SearchService} from "../../booker/shared/search.service";
import {BookerSearch} from "../../booker/shared/model/booker-search";
import {Branch,CheckMessage} from "../../shared/model/branch";
import {Newreservation} from "../../shared/model/newreservation";
import {ManagerCheckbranch} from "../../shared/model/manager-checkbranch";
import {ManagerReservation} from "../../shared/model/ManagerReservation";

@Component({
  selector: 'app-manager-calendar',
  templateUrl: './manager-calendar.component.html',
  styleUrls: ['./manager-calendar.component.css']
})
export class ManagerCalendarComponent implements OnInit {


  @ViewChild('reservationDetailModal') public reservationDetailModal:ModalDirective;

  private reservations:Reservation[];
  private date:Date = new Date();
  private endDate:Date= new Date();
  private users: ShortUser[];
  private userId:string;
  private search: BookerSearch;
  private reservation: Reservation;
  private reservationResponse: Branch;
  private amount:number=2;
  public CheckMessage = CheckMessage;
  private persons: number[];

  private currentReservation:Reservation;
  constructor(private reservationService:ReservationService, private managerService: ManagerService, private searchService:SearchService) { }

  ngOnInit() {
    this.search = this.searchService.searchParameters;
    this.persons = this.searchService.persons;

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
    console.log(this.managerService.branchId);
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
    this.date = newDate;
    this.refreshReservations();
  }

  public onSelectionDone() {
    this.close();
    this.refreshReservations();
  }


  private dateChanged() {
    var date = this.date;
    this.endDate = date;
    this.endDate.setHours(this.date.getHours()+2);
    this.refreshPlace();
  }

  private processDate(){
    var date = this.date;
    date.setHours(this.search.time.getHours()+1);
    date.setMinutes(this.search.time.getMinutes());

    return date;
  }

  private processEndDate(){
    var date = this.endDate;
    date.setHours(this.search.time.getHours()+1);
    date.setMinutes(this.search.time.getMinutes());

    return date;
  }

  refreshPlace(){
      this.reservationResponse = null;

      var param = new ManagerCheckbranch();
      param.StartDate = this.processDate();
      param.EndDate = this.processEndDate();
      param.Amount = this.amount;
      console.log(this.amount);
      this.reservationService.isBranchAvailableManager(this.managerService.branchId, param).subscribe(data=>this.processIsPlace(data));

  }

  processIsPlace(data){
    this.reservationResponse = data;
    console.log(this.reservationResponse);
  }


  reservePlace(){
    var newReservation = new ManagerReservation();
    newReservation.BranchId = this.managerService.branchId;
    newReservation.Amount = this.amount;
    newReservation.Id = this.userId;
    newReservation.StartDate = this.processDate();
    newReservation.EndDate = this.processEndDate()
    this.reservationService.postManagerReservation(newReservation).subscribe(data=>this.reservation=data,err=>console.log(err));
  }
}
