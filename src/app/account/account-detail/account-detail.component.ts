import { Component, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from "../shared/profile.service";
import {User} from "./model/user";
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";
import {ReservationService} from "../../shared/reservation.service";
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
  providers: [ProfileService]
})
export class AccountDetailComponent implements OnInit {

  @ViewChild('favoritesDetailModal') public favoritesDetailModal:ModalDirective;
  private user: User;
  private branches: Branch[];
  private refreshing: boolean;


  constructor( private profileService:ProfileService, private branchService:BranchService ,private reservationService : ReservationService){
    this.refreshing = true;
  };

  ngOnInit() {
    this.getBranches();
    this.refresh();
  }

  refresh(){
    this.user = null;
    this.refreshing = true;
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
    this.refreshing = false;
  };

  showModal(){
    this.favoritesDetailModal.show();
  }

  getBranches():void{
    this.branchService.getBranches().subscribe(data => this.branches = data);
  }

  cancelReservation(id: number){
    this.reservationService.cancelReservation(id).subscribe(data=> this.refresh());
  }


}
