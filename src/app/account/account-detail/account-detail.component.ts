import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../shared/profile.service";
import {User} from "./model/user";
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
  providers: [ProfileService]
})
export class AccountDetailComponent implements OnInit {
  private user: User;
  private branches: Branch[];
  private type: string[];

  constructor( private profileService:ProfileService, private branchService:BranchService){
  };

  ngOnInit() {
    this.getBranches();
    this.profileService.getProfileWithToken(localStorage.getItem('auth_token')).subscribe((data)=>this.getBranchName(data));
  }

  getBranchName(data):void {
    data.Reservations.forEach((cBranch) => {
      this.branches.forEach((branch) => {
        if(branch.Id == cBranch.BranchId){
          cBranch.BranchName = branch.Name;
        };
      });
    });
    this.user = data;
  };

  getBranches():void{
    this.branchService.getBranches().subscribe(data => this.branches = data);
  }
}
