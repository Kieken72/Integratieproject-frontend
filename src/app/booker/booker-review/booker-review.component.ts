import { Component, OnInit } from '@angular/core';
import {Review} from "../../shared/model/review";
import {ProfileService} from "../../account/shared/profile.service";
import {User} from "../../account/account-detail/model/user";
import {ReservationService} from "../../shared/reservation.service";
import {ShortUser} from "../../shared/model/short-user";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-booker-review',
  templateUrl: './booker-review.component.html',
  styleUrls: ['./booker-review.component.css']
})
export class BookerReviewComponent implements OnInit {

  constructor(private profileService:ProfileService,private reservationService:ReservationService, private route:ActivatedRoute) { }
  private review : Review = new Review();
  private user: User;
  private shortUser: ShortUser = new ShortUser();
  ngOnInit() {
    this.profileService.getProfile().subscribe((data)=>this.getUser(data));
  }

  getUser(data){
    this.user=data;
    this.route.params
      .subscribe((params: Params) => this.getReservationId(params['id']));
  }

  getReservationId(number:number){
      return this.review.ReservationId = number;

  }

  postReview(text : string){
    this.review.Text = text;
    this.review.Public= true;
    return this.reservationService.postReview(this.review).subscribe(response =>console.log(response));
  }
}
