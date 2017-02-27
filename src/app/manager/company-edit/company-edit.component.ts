import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {CompanyService} from "../company/company.service";
import {Company} from "../company/model/company";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  private company: Company;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.companyService.getCompany(+params['id']))
      .subscribe(company => this.whenCompanyLoads(company));
  }

  whenCompanyLoads(company){
    this.company = company;
    console.log(this.company);
  }

}
