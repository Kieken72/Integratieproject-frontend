import { Component } from '@angular/core';
import {Branche} from "./model/branche";
import {BranchService} from "./branche.service";
import {CityService} from "../shared/cityservice/city.service";
import {City} from "../company/model/city";

@Component({
  selector: 'my-branches',
  templateUrl: 'branches.component.html',
  styleUrls: ['branches.component.css'],
  providers: [CityService]
})
export class BranchComponent {
  title = 'Nieuw filiaal!';
  branches: Branche[];
  cities: City[];
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


