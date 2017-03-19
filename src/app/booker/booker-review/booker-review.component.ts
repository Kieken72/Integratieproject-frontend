import { Component, OnInit } from '@angular/core';
import {Review} from "../../shared/model/review";
import {ProfileService} from "../../account/shared/profile.service";
import {User} from "../../account/account-detail/model/user";
import {ReservationService} from "../../shared/reservation.service";
import {ShortUser} from "../../shared/model/short-user";
import {ActivatedRoute, Params} from "@angular/router";
import {Reservation} from "../../shared/model/reservation";
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";

@Component({
  selector: 'app-booker-review',
  templateUrl: './booker-review.component.html',
  styleUrls: ['./booker-review.component.css']
})
export class BookerReviewComponent implements OnInit {

  constructor(private profileService:ProfileService,private reservationService:ReservationService, private route:ActivatedRoute, private branchService: BranchService) { }
  private review : Review = new Review();
  private reservation: Reservation;
  private user: User;
  private branch: Branch;
  private shortUser: ShortUser = new ShortUser();
  ngOnInit() {
    this.profileService.getProfile().subscribe((data)=>this.getUser(data));
  }

  getUser(data){
    this.user=data;
    this.route.params
      .subscribe((params: Params) => this.getReservationId(params['id']));
  }

  getBranch(id):void{
    this.branchService.getBranch(id).subscribe(data => this.branch = data);
  }
  getReservationId(number:number){
      this.review.ReservationId = number;
      this.reservation = this.user.Reservations.filter(res=>res.Id == this.review.ReservationId)[0];
      this.getBranch(this.reservation.BranchId);
      console.log(this.reservation);
  }

  postReview(text : string){
    this.review.Text = text;
    this.review.Public= true;
    return this.reservationService.postReview(this.review).subscribe(response =>console.log(response));
  }
}
