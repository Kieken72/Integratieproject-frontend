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
  private branch: Branch;
  private reviews: Review[];

  ngOnInit() {
  this.branchService.getBranch(this.managerService.branchId)
    .subscribe(data => this.branch = data,error =>console.log(error),()=>this.getReviews(this.branch));

  }

  getReviews(branch:Branch){
    this.reviews = branch.Reviews;
    this.refreshing = false;
  }
}
