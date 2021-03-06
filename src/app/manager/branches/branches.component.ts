import { Component } from '@angular/core';
import {Branch} from "../../shared/model/branch";
import {BranchService} from "../../shared/branch.service";
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

  branch = new Branch();

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


}


