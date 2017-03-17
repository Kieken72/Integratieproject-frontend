import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../../shared/statistics.service";
import {ManagerService} from "../../manager.service";
import {GuestStatistics} from "../../../shared/guests-statistics";

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  private guestStats: GuestStatistics;


  public pieChartLabels:string[] = ['1 gast', '2 gasten', '3 gasten', '4 gasten', '5 gasten', '6 gasten', '7 gasten', '8 gasten', '9 gasten', '10 gasten', '10+ gasten'];
  public pieChartData:number[] = [0,0,0,0,0,0,0,0,0,0,0];
  public pieChartType:string = 'pie';
  public pieChartColor: Array<any> = [

  ];

  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {}

  ngOnInit() {
    this.statisticService.getGuestStatistics(this.managerService.branchId).subscribe(data => this.processDataPie(data));
  }

  private processDataPie(data){
    this.guestStats = data;
    console.log(data);
    this.pieChartData = [this.guestStats.one, this.guestStats.two, this.guestStats.three, this.guestStats.four, this.guestStats.five, this.guestStats.six, this.guestStats.seven, this.guestStats.eight, this.guestStats.nine, this.guestStats.ten, this.guestStats.more];
  }

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

}
