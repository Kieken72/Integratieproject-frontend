import {Component, OnInit} from '@angular/core';
import { CompanyService} from './company.service';
import {Company} from "./model/company";
import {City} from "../../shared/cityservice/city";
import {CityService} from "../../shared/cityservice/city.service";
@Component({
  selector: 'my-company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css'],
  providers: [CompanyService, CityService]
})
export class CompanyComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor(){}



}
