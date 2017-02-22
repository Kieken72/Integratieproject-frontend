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


  private errorMessage: string = null;
  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit() {

  }

  onSubmit(email, password){
    this.userService.login(email, password).subscribe(
      (result) => {
        if(result){
          this.router.navigate(['manager']);
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
