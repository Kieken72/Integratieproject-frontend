import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../../shared/branch.service";
import {Branch} from "../../../shared/model/branch";
import {Params, ActivatedRoute} from "@angular/router";
import {CityService} from "../../../shared/cityservice/city.service";
import {City} from "../../../shared/cityservice/city";

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  private branch :Branch;

  cities: City[];
  private selectedCity:any;
  //cityid: number;
  city: City;
  constructor(private route: ActivatedRoute,private branchService: BranchService, private cityService:CityService) { }

  ngOnInit() {
    this.getCities();
    this.route.params
      .switchMap((params: Params) => this.branchService.getBranch(+params['id']))
      .subscribe(branch => this.whenBranchLoads(branch));
  }

  whenBranchLoads(company){
    this.branch = company;
    console.log(this.branch);
  }

  getCities():void{
    this.cityService.getCities().subscribe(data => {this.cities= data; this.selectedCity = this.cities.find(e=>e.Id==this.branch.CityId)});
  }

  public citySelected(city){
    this.city = city ? city : null;
  }

  editBranch(brancheId:number,brancheName: string, brancheStreet: string, brancheNumber: string, brancheBox:string, cityId:string, branchePhoneNumber:string, brancheEmail:string){
    this.branchService.putBranch(this.branch.Id, this.branch.Name, this.branch.Street, this.branch.Number, this.branch.Box, this.branch.CityId, this.branch.PhoneNumber, this.branch.Email);
  }

}
