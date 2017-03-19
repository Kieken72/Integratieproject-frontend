import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../../shared/branch.service";
import {Branch} from "../../../shared/model/branch";
import {CityService} from "../../../shared/cityservice/city.service";
import {City} from "../../../shared/cityservice/city";
import {ActivatedRoute, Params} from "@angular/router";
import {CompanyService} from "../../company/company.service";
import {Company} from "../../company/model/company";

@Component({
  selector: 'app-branch-new',
  templateUrl: './branch-new.component.html',
  styleUrls: ['./branch-new.component.css'],
  providers: [CityService]
})
export class BranchNewComponent implements OnInit {

  constructor(private branchService:BranchService,private companyService:CompanyService, private cityService:CityService,private route: ActivatedRoute,) { }

  private cities: City[];
  private selectedCity:any;
  private cityId:string;
  private companyId:number;
  private company:Company;
  private city: City;

  ngOnInit() {
    this.companyId = +this.route.snapshot.params['id'];
    console.log(this.companyId);
    this.getCities();
    this.companyService.getCompany(this.companyId).subscribe(data=>this.company =data);
  }

  branch = new Branch();
  addBranche(){
    this.branchService.postBranche(1,this.branch.Name,this.branch.Street,this.branch.Number, this.branch.Box
    ,this.city.Id,this.branch.PhoneNumber,this.branch.Email);
  }
  getCities():void{
    this.cityService.getCities().subscribe(data => this.cities= data);
  }
  public citySelected(city){
  this.city = city ? city : null;
}
}
