import { Component, OnInit } from '@angular/core';
import {WeekdayStatistics} from "../../../shared/weekday-statistics";
import {StatisticService} from "../../../shared/statistics.service";
import {ManagerService} from "../../manager.service";

@Component({
  selector: 'app-weekdays',
  templateUrl: './weekdays.component.html',
  styleUrls: ['./weekdays.component.css']
})
export class WeekdaysComponent implements OnInit {

  private weekdayStats:WeekdayStatistics;

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


  constructor(
    private statisticService:StatisticService,
    private managerService: ManagerService

  ) {}

  ngOnInit() {
    this.statisticService.getWeekdayStatistics(this.managerService.branchId).subscribe(data => this.processDataBar(data));
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
