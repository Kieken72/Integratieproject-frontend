import { Component, OnInit } from '@angular/core';
import {ReviewStatistics} from "../../../shared/review-statistics";
import {ManagerService} from "../../manager.service";
import {StatisticService} from "../../../shared/statistics.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  private reviewStats:ReviewStatistics;


  //DoughnutChart
  public doughnutChartLabels:string[] = ['Negatieve', 'Positieve'];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLegend:boolean = true;
  public doughnutChartData:number[] = [0,0];

  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {}

  ngOnInit() {
    this.statisticService.getReviewStatistics(this.managerService.branchId).subscribe(data => this.processDataDoughnut(data));
  }

  private processDataDoughnut(data){
    this.reviewStats = data;
    this.doughnutChartData = [this.reviewStats.negative, this.reviewStats.positive];
  }

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

}
