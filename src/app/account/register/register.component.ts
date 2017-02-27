import { Component, OnInit } from '@angular/core';
import {Http, Response, XHRBackend} from "@angular/http";
import {UserService} from "../shared/user.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Register} from "../shared/model/register";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private http:Http,
    private userService : UserService,
    private router:Router,
  ) { }


  private registration:Register = new Register();
  ngOnInit() {
  }

  createAccount(_firstName: string,_lastName: string, _email:string, _password:string,_confirmedPassword:string){
    //TODO: checken of registratie gelukt is en dan redirect naar pagina
    this.userService.register(_firstName,_lastName,_email,_password,_confirmedPassword).subscribe
    ((data=>this.isCompleted(data)),err=>console.log(err));

  }
  isCompleted(data:Register){
    if(data!= null){
      localStorage.setItem('previous_url','/account/register');
      this.router.navigate(['account/login']);
    }
  }
  reset(_firstName:any,_lastName: any, _email:any, _password:any,_confirmedPassword:any){
    _firstName.value ='';
    _lastName.value ='';
    _email.value ='';
    _password.value ='';
    _confirmedPassword.value ='';
  }

}
