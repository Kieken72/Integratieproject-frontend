import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../company.service";
import {Company} from "../model/company";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];
  constructor(private companyService:CompanyService) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(data => this.companies= data);
  }

}
