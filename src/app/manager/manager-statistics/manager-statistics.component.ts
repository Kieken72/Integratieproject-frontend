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
  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {}

  ngOnInit() {
    this.statisticService.getReviewStatistics(this.managerService.branchId).subscribe(data => this.reviewStats = data);
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Positieve', 'Negatieve'];
  public doughnutChartData:number[] = [this.reviewStats.negative, this.reviewStats.positive];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
