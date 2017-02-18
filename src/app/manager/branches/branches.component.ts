import { Component } from '@angular/core';
import {Branch} from "./model/branch";
import {BranchService} from "./branche.service";
import {CityService} from "../../shared/cityservice/city.service";
import {City} from "../../shared/cityservice/city";

@Component({
  selector: 'my-branches',
  templateUrl: 'branches.component.html',
  styleUrls: ['branches.component.css'],
  providers: [CityService]
})
export class BranchComponent {
  title = 'Nieuw filiaal!';
  branches: Branch[];
  cities: City[];
  cityid:number;

  ngOnInit(): void {
    this.getBranches();
    this.getCities();
  }

  constructor(private brancheService:BranchService, private cityService:CityService){}

  getBranches():void{
    this.brancheService.getBranches().subscribe(data => this.branches = data);
  }

  getCities():void{
    this.cityService.getCities().subscribe(data => this.cities= data);
  }

  addBranche(brancheName: string, brancheStreet: string, brancheNumber: string, brancheBox:string, cityId:string, branchePhoneNumber:string, brancheEmail:string){
    this.brancheService.postBranche(brancheName, brancheStreet, brancheNumber, brancheBox, cityId, branchePhoneNumber, brancheEmail);
  }
}


