import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

declare const FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    FB.init({
      //TODO:create app on facebook for ID
      appId: 'our app ID',
      cookie: false,
      xfbml: true,
      version:'v2.5'
    })

  }
  ngOnInit() {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });

  }
  onFacebookLoginClick() {
    FB.login();
  }

  statusChangeCallback(resp) {
    if (resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
    }else if (resp.status === 'not_authorized') {

    }else {

    }
  };


  onSubmit(email, password){
    this.userService.login(email, password).subscribe((result) => {
        if(result){
          this.router.navigate(['manager']);
        }
    })
  }

}
