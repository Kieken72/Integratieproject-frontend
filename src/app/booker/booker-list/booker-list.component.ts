import {Component, OnInit, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import {Params, ActivatedRoute} from '@angular/router';
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";
import {BookerSearch} from "../shared/model/booker-search";
import {SearchService} from "../shared/search.service";

@Component({
  selector: 'app-booker-list',
  templateUrl: './booker-list.component.html',
  styleUrls: ['./booker-list.component.css'],

})
export class BookerListComponent implements OnInit, OnDestroy {
  private branches: Branch[];
  private search: BookerSearch;
  private persons: number[];



  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private branchService: BranchService,
    private searchService: SearchService
  ) {

  }

  ngOnInit():void {
    this.search = this.searchService.searchParameters;
    this.branchService.getBranchesByPostal(this.search.location).subscribe(data => this.branches = data);
    this.persons = this.searchService.persons;
  }
  ngOnDestroy(){
    this.searchService.searchParameters = this.search;
}

  goBack():void{
    this.location.back();
  }

}
