import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../shared/statistics.service";
import {ManagerService} from "../manager.service";
import {ReviewStatistics} from "../../shared/review-statistics";
import {WeekdayStatistics} from "../../shared/weekday-statistics";

@Component({
  selector: 'app-manager-statistics',
  templateUrl: './manager-statistics.component.html',
  styleUrls: ['./manager-statistics.component.css']
})
export class ManagerStatisticsComponent implements OnInit {

  private reviewStats:ReviewStatistics;
  private weekdayStats:WeekdayStatistics;

  //BarChart
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Ma', 'Di', 'Woe', 'Do', 'Vr', 'Za', 'Zo'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [0,0,0,0,0,0,0], label: 'Aantal Reservaties'},
  ];

  //DoughnutChart
  public doughnutChartLabels:string[] = ['Negatieve', 'Positieve'];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartData:number[] = [0,0];
  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {}

  ngOnInit() {
    this.statisticService.getReviewStatistics(this.managerService.branchId).subscribe(data => this.processDataDoughnut(data));
    this.statisticService.getWeekdayStatistics(this.managerService.branchId).subscribe(data => this.processDataBar(data));
  }

  private processDataDoughnut(data){
    this.reviewStats = data;
    this.doughnutChartData = [this.reviewStats.negative, this.reviewStats.positive];
  }
  private processDataBar(data){
    this.weekdayStats = data;
    this.barChartData = [this.weekdayStats.monday, this.weekdayStats.tuesday, this.weekdayStats.wednesday, this.weekdayStats.thursday, this.weekdayStats.friday, this.weekdayStats.saturday, this.weekdayStats.sunday];
}

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }


}
