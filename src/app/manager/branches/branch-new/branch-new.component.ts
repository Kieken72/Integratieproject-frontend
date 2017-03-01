import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../../shared/branch.service";
import {Branch} from "../../../shared/model/branch";
import {CityService} from "../../../shared/cityservice/city.service";
import {City} from "../../../shared/cityservice/city";

@Component({
  selector: 'app-branch-new',
  templateUrl: './branch-new.component.html',
  styleUrls: ['./branch-new.component.css'],
  providers: [CityService]
})
export class BranchNewComponent implements OnInit {

  constructor(private branchService:BranchService, private cityService:CityService) { }
  cities: City[];
  cityid:string;
  ngOnInit() {
    //this.getBranches();
    this.getCities();
  }
  //branches: Branch[];
  branch = new Branch();
  addBranche(){
    this.branchService.postBranche(this.branch.Name,this.branch.Street,this.branch.Number, this.branch.Box
    ,this.branch.CityId,this.branch.PhoneNumber,this.branch.Email);
  }
  getCities():void{
    this.cityService.getCities().subscribe(data => this.cities= data);
  }
}
