import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../shared/statistics.service";
import {ManagerService} from "../manager.service";
import {ReviewStatistics} from "../../shared/review-statistics";

@Component({
  selector: 'app-manager-statistics',
  templateUrl: './manager-statistics.component.html',
  styleUrls: ['./manager-statistics.component.css']
})
export class ManagerStatisticsComponent implements OnInit {

  private reviewStats:ReviewStatistics;
  public doughnutChartLabels:string[] = ['Negatieve', 'Positieve'];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartData:number[] = [0,0];
  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {}

  ngOnInit() {
    this.statisticService.getReviewStatistics(this.managerService.branchId).subscribe(data => this.processData(data));

  }

  private processData(data){
    this.reviewStats = data;
    this.doughnutChartData = [this.reviewStats.negative, this.reviewStats.positive];
  }

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }


}
