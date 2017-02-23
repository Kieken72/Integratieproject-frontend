import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../shared/profile.service";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
  providers: [ProfileService]
})
export class AccountDetailComponent implements OnInit {

  constructor( private profileService:ProfileService){
  };

  ngOnInit() {
    var profile = this.profileService.getProfileWithToken(localStorage.getItem('auth_token')).subscribe((data)=>this.checkData(data));
    return profile;
  }

  checkData(data):void {
  console.log('data: '+data.Id);
  console.log('data: '+data.Url);
  console.log('data: '+data.Firstname);
  console.log('data: '+data.Roles.length);
  console.log('data: '+data.Roles[0]);
  console.log('data: '+data.Roles[1]);
};




}
