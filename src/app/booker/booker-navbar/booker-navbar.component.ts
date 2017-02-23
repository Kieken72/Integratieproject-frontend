import { Component, OnInit } from '@angular/core';
import {UserService} from "../../account/shared/user.service";

@Component({
  selector: 'app-booker-navbar',
  templateUrl: './booker-navbar.component.html',
  styleUrls: ['./booker-navbar.component.css']
})
export class BookerNavbarComponent implements OnInit {

  private isLoggedIn: boolean;
  private title = "LeisureBooker"
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

}
