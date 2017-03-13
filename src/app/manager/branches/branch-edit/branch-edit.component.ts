import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../../shared/branch.service";
import {Branch} from "../../../shared/model/branch";
import {Params, ActivatedRoute} from "@angular/router";
import {CityService} from "../../../shared/cityservice/city.service";
import {City} from "../../../shared/cityservice/city";
import {OperationHour} from "../../../shared/model/operationhour";
import {AdditionalInfo} from "../../../shared/model/additional-info";

export class Weekday{
  public Id: number;
  public Day: string;

  constructor(Id: number, Day: string) {
    this.Id = Id;
    this.Day = Day;
  }
}


@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  private branch :Branch;
  private days: Weekday[];

  cities: City[];
  private selectedCity:any;
  //cityid: number;
  city: City;
  constructor(private route: ActivatedRoute,private branchService: BranchService, private cityService:CityService) {
    this.days = [
      new Weekday(0,"Sunday"),
      new Weekday(1,"Monday"),
      new Weekday(2,"Thuesday"),
      new Weekday(3,"Wednesday"),
      new Weekday(4,"Thursday"),
      new Weekday(5,"Friday"),
      new Weekday(6,"Saturday")
    ];
  }

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

  editBranch(){
    this.branchService.putBranch(
      this.branch.Id, this.branch.Name, this.branch.Street, this.branch.Number, this.branch.Box,
      this.branch.CityId, this.branch.PhoneNumber, this.branch.Email,this.branch.Description,this.branch.AdditionalInfos,this.branch.OpeningHours) ;
  }

  removeOperationHour(entity){
    this.branch.OpeningHours = this.branch.OpeningHours.filter(item => item !== entity);
  }
  removeAdditionalInfo(entity){
    this.branch.AdditionalInfos = this.branch.AdditionalInfos.filter(item => item !== entity);
  }
 addOperationHour(){
    this.branch.OpeningHours.push(new OperationHour());
  }
  addAdditionalInfo(){
  this.branch.AdditionalInfos.push(new AdditionalInfo());
}

}
