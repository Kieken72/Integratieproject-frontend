import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from "../shared/search.service";
import {BranchService} from "../../shared/branch.service";
import {BookerSearch} from "../shared/model/booker-search";
import {Branch} from "../../shared/model/branch";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booker-detail',
  templateUrl: './booker-detail.component.html',
  styleUrls: ['./booker-detail.component.css']
})
export class BookerDetailComponent implements OnInit, OnDestroy {

  private branch: Branch;
  private search: BookerSearch;
  private persons: number[];
  constructor(
    private searchService: SearchService,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.search = this.searchService.searchParameters;
    this.persons = this.searchService.persons;
    this.route.params
      .switchMap((params: Params) => this.branchService.getBranch(+params['id']))
      .subscribe(branch => this.branch = branch);
  }
  ngOnDestroy(){
    this.searchService.searchParameters = this.search;
  }

}
