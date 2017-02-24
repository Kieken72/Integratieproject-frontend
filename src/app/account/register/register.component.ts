import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:Http,private userService : UserService) { }

  ngOnInit() {
  }

  createAccount(_firstName: string,_lastName: string, _email:string, _password:string,_confirmedPassword:string){
    this.userService.register(_firstName,_lastName,_email,_password,_confirmedPassword);
  }


}
