import {Component, OnInit, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import {Params, ActivatedRoute} from '@angular/router';
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";
import {BookerSearch} from "../shared/model/booker-search";
import {SearchService} from "../shared/search.service";
import {City} from "../../shared/cityservice/city";
import { Typeahead } from 'ng2-typeahead';

@Component({
  selector: 'app-booker-list',
  templateUrl: './booker-list.component.html',
  styleUrls: ['./booker-list.component.css'],

})
export class BookerListComponent implements OnInit, OnDestroy {
  private branches: Branch[];
  private search: BookerSearch;
  private persons: number[];

  private selectedCity:any;
  private cities: City[];



  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private branchService: BranchService,
    private searchService: SearchService
  ) {

  }

  ngOnInit():void {
    this.search = this.searchService.searchParameters;
    if(this.search.city != null){
      this.branchService.getBranchesByPostal(this.search.city.PostalCode).subscribe(data => this.branches = data);
      this.selectedCity = this.search.city;

    }
    this.persons = this.searchService.persons;
    this.cities = this.searchService.cities;


  }
  ngOnDestroy(){
    this.searchService.searchParameters = this.search;
}

  goBack():void{
    this.location.back();
  }


  public citySelected(city){
    this.search.city = city ? city : null;

    if(city !== null){
      this.refreshBranches(city.PostalCode);
    }
  }
  private dateChanged(newDate) {
  this.search.date= new Date(newDate);
  console.log(this.search.date);
}

  private refreshBranches(postal){

    this.branchService.getBranchesByPostal(postal).subscribe(data => this.branches = data);
  }

}
