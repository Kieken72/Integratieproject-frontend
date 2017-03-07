import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from "../shared/search.service";
import {BranchService} from "../../shared/branch.service";
import {BookerSearch} from "../shared/model/booker-search";
import {Branch, CheckMessage} from "../../shared/model/branch";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from "../../account/shared/user.service";
import {Reservation} from "../../shared/model/reservation";
import {Checkbranch} from "../../shared/model/checkbranch";
import {ReservationService} from "../../shared/reservation.service";
import {Newreservation} from "../../shared/model/newreservation";
import {DisplayFacility} from "../../shared/model/additional-info";
import {DisplayOperationHour} from "../../shared/model/operationhour";
import {FacebookService, FacebookInitParams} from "ng2-facebook-sdk";

@Component({
  selector: 'app-booker-detail',
  templateUrl: './booker-detail.component.html',
  styleUrls: ['./booker-detail.component.css']
})
export class BookerDetailComponent implements OnInit, OnDestroy {

  private branch: Branch;
  private search: BookerSearch;
  private persons: number[];

  private operationHours:DisplayOperationHour[];

  private isLogged:boolean;

  private reservationResponse: Branch;
  private paymentFacilities: DisplayFacility[];
  private otherFacilities: DisplayFacility[];
  private accesFacilities: DisplayFacility[];
  private reservation: Reservation;
  public CheckMessage = CheckMessage;
  private reservationCount: number;

  private latitude : any;
  private longitude: any;

  constructor(
    private searchService: SearchService,
    private branchService: BranchService,
    private userService: UserService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private location: Location,
    private fbService: FacebookService
  ) {
    let fbParams: FacebookInitParams = {
      appId: '603823796474644',
      xfbml: true,
      version: 'v2.6'
    };
    this.fbService.init(fbParams);
  }

  ngOnInit() {
    this.search = this.searchService.searchParameters;
    this.persons = this.searchService.persons;
    this.route.params
      .switchMap((params: Params) => this.branchService.getBranch(+params['id']))
      .subscribe(branch => this.whenBranchLoads(branch));

    this.isLogged = this.userService.isLoggedIn();

  }

  getCoordinates(branch:Branch){
    this.branchService.getCoordinates(branch).subscribe((data)=>this.setCoordinates(data))
  }
  setCoordinates(data){
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
    console.log('lat: '+ this.latitude + ' long : ' + this.longitude);
  }

  whenBranchLoads(branch){
    this.branch = branch;
    this.operationHours = this.branchService.openingHours(branch);
    this.paymentFacilities = this.branchService.paymentFacilities(branch);
    this.otherFacilities = this.branchService.otherFacilities(branch);
    this.accesFacilities = this.branchService.accesabilityFacilities(branch);

    var good = this.branch.Reviews.filter(e=>e.Result).length;
    var total = this.branch.Reviews.length;
    this.reservationCount = good/total*5;
    this.getCoordinates(this.branch);
  }
  private dateChanged(newDate) {
    this.search.date= new Date(newDate);
    this.refreshPlace();
  }
  goBack(){
    this.location.back();
  }

  private processDate(){
    var date = this.search.date;
    date.setHours(this.search.time.getHours()+1);
    date.setMinutes(this.search.time.getMinutes());
    return date;

  }

  refreshPlace(){

    if(this.branch!=null){
      this.reservationResponse = null;

      var param = new Checkbranch();
      param.DateTime = this.processDate();
      param.Amount = this.search.amount;

      this.reservationService.isBranchAvailable(this.branch.Id, param).subscribe(data=>this.processIsPlace(data));
    }
  }

  processIsPlace(data){
    this.reservationResponse = data;
    console.log(this.reservationResponse);
  }

  reservePlace(){
    var newReservation = new Newreservation();
    newReservation.BranchId = this.branch.Id;
    newReservation.Amount = this.search.amount;
    newReservation.DateTime = this.processDate();
    this.reservationService.postNewReservation(newReservation).subscribe(data=>this.reservation=data,err=>console.log(err));
  }
  ngOnDestroy(){
    this.searchService.searchParameters = this.search;
  }


  shareToFacebook(){
    this.fbService.ui({
      method: 'share',
      href: 'https://integratieproject.herokuapp.com/booker/detail/'+this.branch.Id
    });
  }
}
