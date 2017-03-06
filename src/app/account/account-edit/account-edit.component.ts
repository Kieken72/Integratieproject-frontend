import { Component, OnInit } from '@angular/core';
import {User} from "../account-detail/model/user";
import {ProfileService} from "../shared/profile.service";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css'],
  providers: [ProfileService]
})
export class AccountEditComponent implements OnInit {
  private user: User;
  constructor( private profileService:ProfileService){
  };

  ngOnInit() {
    this.profileService.getProfileWithToken(localStorage.getItem('auth_token')).subscribe((data)=>this.getUser(data));
  }
  getUser(data):void {
    this.user = data;
  };

  editAccount(){
    this.profileService.putAccount(this.user.Firstname, this.user.Surname).subscribe(data=>console.log(data));
  }


}
