import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {


  private errorMessage: string = null;
  constructor(private userService: UserService, private router: Router, private location:Location) {

  }
  ngOnInit() {

  }

  onSubmit(email, password){
    this.userService.login(email, password).subscribe(
      (result) => {
        if(result){
          this.location.back();
        }
    },
      (error)=>{
        if(error.status == 400){
          this.errorMessage = "The username or password is invalid."
        } else {
          this.errorMessage = "Something bad."
        }
      })
  }

}
