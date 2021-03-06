import { Component, OnInit } from '@angular/core';
import {User} from "../account-detail/model/user";
import {ProfileService} from "../shared/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css'],
  providers: [ProfileService]
})
export class AccountEditComponent implements OnInit {
  private user: User;
  private OldPassword: string;
  private NewPassword: string;
  private ConfirmPassword: string;

  constructor( private profileService:ProfileService, private route:Router){
  };

  ngOnInit() {
    this.profileService.getProfileWithToken(localStorage.getItem('auth_token')).subscribe((data)=>this.getUser(data));
  }
  getUser(data):void {
    this.user = data;
  };

  editAccount(){
    this.profileService.putAccount(this.user.Name, this.user.Lastname, this.user.PhoneNumber).subscribe((data)=>console.log(data),(error)=>console.log(error),()=>this.route.navigate(['../account/details']));

  }

  editPassword() {
    this.profileService.changePassword(this.OldPassword, this.NewPassword, this.ConfirmPassword).subscribe((data) => console.log(data), (error) => console.log(error), () => this.route.navigate(['../account/details']));
  }
}
