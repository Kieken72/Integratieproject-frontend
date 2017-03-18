import { Component, OnInit } from '@angular/core';
import {ReviewStatistics} from "../../../shared/review-statistics";
import {StatisticService} from "../../../shared/statistics.service";
import {ManagerService} from "../../shared/manager.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  private reviewStats:ReviewStatistics;
  private refreshing: boolean;


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

  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {
    this.refreshing = true;}

  ngOnInit() {
    this.statisticService.getReviewStatistics(this.managerService.branchId).subscribe(data => this.processDataDoughnut(data));
  }

  private processDataDoughnut(data){
    this.reviewStats = data;
    this.doughnutChartData = [this.reviewStats.negative, this.reviewStats.positive];
    this.refreshing = false;
  }

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

}
