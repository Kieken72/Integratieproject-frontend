import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-statistics',
  templateUrl: './manager-statistics.component.html',
  styleUrls: ['./manager-statistics.component.css']
})
export class ManagerStatisticsComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels:string[] = ['Positieve', 'Negatieve'];
  public doughnutChartData:number[] = [350, 450];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }


}
