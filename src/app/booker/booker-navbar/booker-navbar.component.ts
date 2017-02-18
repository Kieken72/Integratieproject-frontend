import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booker-navbar',
  templateUrl: './booker-navbar.component.html',
  styleUrls: ['./booker-navbar.component.css']
})
export class BookerNavbarComponent implements OnInit {

  private title = "LeisureBooker"
  constructor() { }

  ngOnInit() {
  }

}
