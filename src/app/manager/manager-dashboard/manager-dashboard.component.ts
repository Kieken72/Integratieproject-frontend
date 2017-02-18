import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})

export class ManagerDashboardComponent implements OnInit {
  private currentTime: Observable<Date>;


  constructor() { }

  ngOnInit() {
    this.currentTime = Observable.interval(1000).map(x=>new Date()).share();
  }

}
