import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../../shared/statistics.service";
import {GuestStatistics} from "../../../shared/guests-statistics";
import {ManagerService} from "../../shared/manager.service";

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  private guestStats: GuestStatistics;
  private refreshing: boolean;


  public pieChartLabels:string[] = ['1 gast', '2 gasten', '3 gasten', '4 gasten', '5 gasten', '6 gasten', '7 gasten', '8 gasten', '9 gasten', '10 gasten', '10+ gasten'];
  public pieChartData:number[] = [0,0,0,0,0,0,0,0,0,0,0];
  public pieChartType:string = 'pie';
  public pieChartColor:Array<any> = [
    {
      backgroundColor: ["#4286f4", "#5BB75B", "#ad4787", "#efe44c", "#ffa19e", "#9effff", "#777c7c", "#3930a5", "#efa51c", "#eb1cef", "#1cefcf"],
      borderColor: ["#4286f4", "#5BB75B", "#ad4787", "#efe44c", "#ffa19e", "#9effff", "#777c7c", "#3930a5", "#efa51c", "#eb1cef", "#1cefcf"],
      pointBackgroundColor: ["#4286f4", "#5BB75B", "#ad4787", "#efe44c", "#ffa19e", "#9effff", "#777c7c", "#3930a5", "#efa51c", "#eb1cef", "#1cefcf"],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: ["#4286f4", "#5BB75B", "#ad4787", "#efe44c", "#ffa19e", "#9effff", "#777c7c", "#3930a5", "#efa51c", "#eb1cef", "#1cefcf"]
    }
  ];

  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {
    this.refreshing = true;}

  ngOnInit() {
    this.statisticService.getGuestStatistics(this.managerService.branchId).subscribe(data => this.processDataPie(data));
  }

  private processDataPie(data){
    this.guestStats = data;
    console.log(data);
    this.pieChartData = [this.guestStats.one, this.guestStats.two, this.guestStats.three, this.guestStats.four, this.guestStats.five, this.guestStats.six, this.guestStats.seven, this.guestStats.eight, this.guestStats.nine, this.guestStats.ten, this.guestStats.more];

    this.refreshing = false;}

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

}
