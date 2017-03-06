import { Component, OnInit } from '@angular/core';
import {Review} from "../../shared/model/review";
import {ProfileService} from "../../account/shared/profile.service";
import {User} from "../../account/account-detail/model/user";
import {ReservationService} from "../../shared/reservation.service";
import {ShortUser} from "../../shared/model/short-user";

@Component({
  selector: 'app-booker-review',
  templateUrl: './booker-review.component.html',
  styleUrls: ['./booker-review.component.css']
})
export class BookerReviewComponent implements OnInit {

  constructor(private profileService:ProfileService,private reservationService:ReservationService) { }
  private review : Review = new Review();
  private user: User;
  private shortUser: ShortUser = new ShortUser();
  ngOnInit() {
    this.profileService.getProfile().subscribe((data)=>this.getUser(data));
  }

  getUser(data){
    this.user=data;
  }

  //TODO:variable reservationID + fix Post
  postReview(text : string){
    this.review.Text = text;
    this.review.Public= true;
    this.review.ReservationId = 2;

    console.log(this.review);
    return this.reservationService.postReview(this.review).subscribe(response =>console.log(response));

  }
}
