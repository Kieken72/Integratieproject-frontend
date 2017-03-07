import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Reservation} from "../../account/account-detail/model/reservation";
import {Message} from "./model/message";
import {AccountDetailComponent} from "../../account/account-detail/account-detail.component";
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
  constructor( private route: ActivatedRoute, private rout:Router, private profileService: ProfileService, private branchService:BranchService, private reservationService:ReservationService) { }

  ngOnInit() {
    this.getBranches();
    this.route.params
      .switchMap((params: Params) => this.getReservation(+params['id']))
      .subscribe(reservation => this.whenDetailsLoads(reservation));
    this.getUser();
  }

  whenDetailsLoads(reservation){
    this.reservation = reservation;
  }

  getReservation(number:number){
    this.profileService.getProfile().subscribe((data)=>{
      //this.getUser();
      data.Reservations.forEach((cReservation) => {
        if(cReservation.Id == number.toString()){
          this.branches.forEach((branch) => {
            if(branch.Id == cReservation.BranchId){
              cReservation.BranchName = branch.Name;

            };
          })
          this.reservationService.getMessages(cReservation.Id).subscribe((data) => this.messages = data);
          this.reservations.push(cReservation);
          this.currentReservationId = cReservation.Id;
         // this.getMessages(cReservation.Id);
        }
      });
    });
    return this.reservations;
  }

  getUser(){
    this.profileService.getProfileWithToken(localStorage.getItem('auth_token')).subscribe((data)=>this.user = data);
  }

  getBranches():void{
    this.branchService.getBranches().subscribe(data => this.branches = data);
  }

  sendMessage(){
    this.reservations.forEach((cRes)=>{
      this.reservationService.postMessage(cRes.Id, cRes.BranchId, this.message.text).subscribe((data)=>console.log(data));

      this.reservationService.getMessages(cRes.Id).subscribe((data) => this.messages = data);
    });
    location.reload();
    //this.rout.navigate(['../../manager/reservationdetail/', this.currentReservationId]);

  }
}
