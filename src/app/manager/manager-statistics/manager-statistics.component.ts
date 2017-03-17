import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../shared/statistics.service";
import {ManagerService} from "../manager.service";
import {ReviewStatistics} from "../../shared/review-statistics";
import {WeekdayStatistics} from "../../shared/weekday-statistics";
import {GuestStatistics} from "../../shared/guests-statistics";

@Component({
  selector: 'app-manager-statistics',
  templateUrl: './manager-statistics.component.html',
  styleUrls: ['./manager-statistics.component.css']
})
export class ManagerStatisticsComponent implements OnInit {

  private reviewStats:ReviewStatistics;
  private weekdayStats:WeekdayStatistics;
  private guestStats: GuestStatistics;

  //BarChart
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Ma', 'Di', 'Woe', 'Do', 'Vr', 'Za', 'Zo'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartColor:Array<any> = [
  { // green
    backgroundColor: 'rgba(91,183,91,0.8)',
    borderColor: 'rgba(91,183,91,0.8)',
    pointBackgroundColor: 'rgba(91,183,91,0.8)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(91,183,91,0.8)'}];

  public barChartData:any[] = [
    {data: [0,0,0,0,0,0,0], label: 'Aantal Reservaties'},
  ];

  //DoughnutChart
  public doughnutChartLabels:string[] = ['Negatieve', 'Positieve'];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLegend:boolean = true;
  public doughnutChartData:number[] = [0,0];
  public doughnutChartColor:Array<any> = [
    {
      backgroundColor: ["#DC3912", "#5BB75B"],
      borderColor: ["#DC3912", "#5BB75B"],
      pointBackgroundColor: ["#DC3912", "#5BB75B"],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: ["#DC3912", "#5BB75B"]
    }
  ];

  // Pie
  public pieChartLabels:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '+10'];
  public pieChartData:number[] = [0,0,0,0,0,0,0,0,0,0,0];
  public pieChartType:string = 'pie';
  public pieChartLegend: boolean = true;
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

  ) {}

  ngOnInit() {
    this.statisticService.getReviewStatistics(this.managerService.branchId).subscribe(data => this.processDataDoughnut(data));
    this.statisticService.getWeekdayStatistics(this.managerService.branchId).subscribe(data => this.processDataBar(data));
    this.statisticService.getGuestStatistics(this.managerService.branchId).subscribe(data => this.processDataPie(data));
  }

  private processDataDoughnut(data){
    this.reviewStats = data;
    this.doughnutChartData = [this.reviewStats.negative, this.reviewStats.positive];
  }
  private processDataBar(data){
    this.weekdayStats = data;
    this.barChartData = [this.weekdayStats.monday, this.weekdayStats.tuesday, this.weekdayStats.wednesday, this.weekdayStats.thursday, this.weekdayStats.friday, this.weekdayStats.saturday, this.weekdayStats.sunday];
  }

  private processDataPie(data){
    this.guestStats = data;
    this.pieChartData = [this.guestStats.one, this.guestStats.two, this.guestStats.three, this.guestStats.four, this.guestStats.five, this.guestStats.six, this.guestStats.seven, this.guestStats.eight, this.guestStats.nine, this.guestStats.ten, this.guestStats.more];
  }

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }


}
