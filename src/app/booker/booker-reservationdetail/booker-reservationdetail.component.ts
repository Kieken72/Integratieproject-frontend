import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Reservation} from "../../account/account-detail/model/reservation";
import {Message} from "../shared/model/message";
import {ProfileService} from "../../account/shared/profile.service";
import {BranchService} from "../../shared/branch.service";
import {User} from "../../account/account-detail/model/user";
import {Branch} from "../../shared/model/branch";
import {ReservationService} from "../../shared/reservation.service";

@Component({
  selector: 'app-booker-reservationdetail',
  templateUrl: './booker-reservationdetail.component.html',
  styleUrls: ['./booker-reservationdetail.component.css'],
})
export class BookerReservationdetailComponent implements OnInit {
  private reservation: Reservation;
  private message:Message = new Message();
  private reservations:Reservation[] = new Array();
  private currentReservationId:number;
  private messages:Message[];
  private user:User;
  private branches: Branch[];

  private refreshing:boolean = true;

  constructor( private route: ActivatedRoute, private rout:Router, private profileService: ProfileService, private branchService:BranchService, private reservationService:ReservationService) { }

  ngOnInit() {
    this.getBranches();


    this.profileService.getProfileWithToken(localStorage.getItem('auth_token')).subscribe(data=>this.getUser(data));

  }

  whenDetailsLoads(reservation){
    this.reservation = reservation;
    console.log(reservation);
  }

  getReservation(number:number){
    console.log("loading..");
    this.profileService.getProfile().subscribe((data)=>{
      //this.getUser();
      data.Reservations.forEach((cReservation) => {
        if(cReservation.Id == number.toString()){
          this.branches.forEach((branch) => {
            if(branch.Id == cReservation.BranchId){
              cReservation.BranchName = branch.Name;

            };
          })
          this.reservationService.getMessages(cReservation.Id).subscribe((data) => this.messages = data,(error)=>this.onError(error),()=>this.refreshing = false);
          this.reservations.push(cReservation);
          this.currentReservationId = cReservation.Id;
        }
      });
    });
    return this.reservations;
  }
  onError(error){
    console.log(error);this.refreshing = false
    console.log(this.reservation);
  }

  getUser(data){
    this.user= data;

    this.route.params
      .switchMap((params: Params) => this.getReservation(+params['id']))
      .subscribe(reservation => this.whenDetailsLoads(reservation),(err)=>console.log(err),()=>console.log(this.reservation));
  }

  getBranches():void{
    this.branchService.getBranches().subscribe(data => this.branches = data);
  }

  onComplete(data){
    console.log(data);
    this.reservationService.getMessages(data.ReservationId).subscribe((data) => this.messages = data,(err)=>console.log(err),()=>console.log(this.messages));
  }
  sendMessage(){
    this.reservations.forEach((cRes)=>{
      console.log("Loop res");
      this.reservationService.postMessage(cRes.Id, cRes.BranchId, this.message.text).subscribe((data)=>this.onComplete(data));
    });
  }
}
