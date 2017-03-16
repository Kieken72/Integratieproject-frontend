import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../../shared/branch.service";
import {Review} from "../../../shared/model/review";
import {ManagerService} from "../../manager.service";
import {Branch} from "../../../shared/model/branch";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(private branchService: BranchService, private managerService:ManagerService) { }

  private branch: Branch;
  private reviews: Review[];

  ngOnInit() {
  this.branchService.getBranch(this.managerService.branchId)
    .subscribe(data => this.branch = data,error =>console.log(error),()=>this.getReviews(this.branch));

  }

  getReviews(branch:Branch){
    this.reviews = branch.Reviews;
    console.log(this.reviews);
  }
}
