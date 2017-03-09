import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";
import {Coordinate} from "../../shared/model/coordinate";
import {BookerSearch} from "../shared/model/booker-search";
import {SearchService} from "../shared/search.service";

@Component({
  selector: 'app-booker-map',
  templateUrl: './booker-map.component.html',
  styleUrls: ['./booker-map.component.css']
})
export class BookerMapComponent implements OnInit {

  constructor(private branchService: BranchService, private searchService:SearchService) { }

  private branches: Branch[];
  private coordinate: Coordinate;
  private coordinates: Coordinate[] =new Array();
  private centerCoordinate: Coordinate= new Coordinate();
  private search: BookerSearch;

  ngOnInit() {
    this.search = this.searchService.searchParameters;
    if(this.search.city != null){
      this.branchService.getCenterCoordinate(this.search.city).subscribe((data) => {
        this.centerCoordinate.latitude=data.results[0].geometry.location.lat;
        this.centerCoordinate.longitude = data.results[0].geometry.location.lng;
        this.centerCoordinate.branchName = 'Lalalala';
      });    }

   this.branchService.getBranches().subscribe((data)=>this.branches = data,(error) => console.log(error),()=>this.getCoordinates(this.branches));
  }

  getCoordinates(branches:Branch[]){
    branches.forEach((branch)=>{
      this.branchService.getCoordinates(branch).subscribe((data)=>this.setCoordinates(data),(error)=>console.log(error),
        ()=>{this.coordinate.branchName=branch.Name;
              this.coordinate.branchId = branch.Id;
      });
    })

  }
  setCoordinates(data){
    this.coordinate = new Coordinate();
    this.coordinate.latitude = data.results[0].geometry.location.lat;
    this.coordinate.longitude = data.results[0].geometry.location.lng;

    this.coordinates.push(this.coordinate);
    console.log('Coordinates of branches:'+JSON.stringify(this.coordinates));

    console.log(this.centerCoordinate.branchName);

  }





}
