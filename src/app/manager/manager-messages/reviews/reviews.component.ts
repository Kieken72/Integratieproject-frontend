import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../../shared/branch.service";
import {Review} from "../../../shared/model/review";
import {Branch} from "../../../shared/model/branch";
import {ManagerService} from "../../shared/manager.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(private branchService: BranchService, private managerService:ManagerService) {
    this.refreshing = true;
  }

  private refreshing: boolean;
  private reviews: Review[];

  ngOnInit() {
    setTimeout(()=>{
      //Delay loading so server doesn't get overloaded.;
      this.branchService.getReviews(this.managerService.branchId)
        .subscribe(data => this.getReviews(data),error =>console.log(error));
    },2000);

  }

  getReviews(data){
    this.reviews = data;
    this.refreshing = false;
  }
}
