import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from "../shared/search.service";
import {BranchService} from "../../shared/branch.service";
import {BookerSearch} from "../shared/model/booker-search";
import {Branch} from "../../shared/model/branch";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from "../../account/shared/user.service";
import {Reservation} from "../../shared/model/reservation";
import {Checkbranch} from "../../shared/model/checkbranch";
import {ReservationService} from "../../shared/reservation.service";

@Component({
  selector: 'app-booker-detail',
  templateUrl: './booker-detail.component.html',
  styleUrls: ['./booker-detail.component.css']
})
export class BookerDetailComponent implements OnInit, OnDestroy {

  private branch: Branch;
  private search: BookerSearch;
  private persons: number[];

  private operationHours:string[];

  private isLogged:boolean;

  constructor(
    private searchService: SearchService,
    private branchService: BranchService,
    private userService: UserService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.search = this.searchService.searchParameters;
    this.persons = this.searchService.persons;
    this.route.params
      .switchMap((params: Params) => this.branchService.getBranch(+params['id']))
      .subscribe(branch => this.whenBranchLoads(branch));

    this.isLogged = this.userService.isLoggedIn();

  }

  whenBranchLoads(branch){
    this.branch = branch;
    this.operationHours = this.branchService.openingHours(branch);
  }
  private dateChanged(newDate) {
    this.search.date= new Date(newDate);
    console.log(this.search.date.toJSON());

    this.search.date.setHours(this.search.time.getHours()+1);
    this.search.date.setMinutes(this.search.time.getMinutes());
    console.log(this.search.date.toJSON());
  }
  goBack(){
    this.location.back();
  }

  tryThis(){
    var param = new Checkbranch();
    param.DateTime = this.search.date;
    param.DateTime.setHours(this.search.time.getHours()+1);
    param.DateTime.setMinutes(this.search.time.getMinutes());

    param.Amount = this.search.amount;

    var dataA:Branch;
    console.log(param);
    this.reservationService.isBranchAvailable(this.branch.Id, param).subscribe(data=>dataA=data);
    console.log(dataA.CheckMessage);
  }

  ngOnDestroy(){
    this.searchService.searchParameters = this.search;
  }

}
