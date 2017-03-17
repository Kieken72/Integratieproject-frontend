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
  ngOnInit(): void {
  }



}
