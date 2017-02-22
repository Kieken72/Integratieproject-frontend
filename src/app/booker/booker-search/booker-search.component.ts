import {Component, OnInit, OnDestroy} from '@angular/core';
import {BookerSearch} from "../shared/model/booker-search";
import {SearchService} from "../shared/search.service";
import {CityService} from "../../shared/cityservice/city.service";
import {City} from "../../shared/cityservice/city";



@Component({
  selector: 'app-booker-search',
  templateUrl: './booker-search.component.html',
  styleUrls: ['./booker-search.component.css'],
})
export class BookerSearchComponent implements OnInit, OnDestroy {


  //public mytime: Date = new Date();
  private search: BookerSearch;
  private persons: number[];

  private selectedCity:any;
  private cities: City[];

  constructor(private searchService: SearchService, private cityService:CityService) {
  }

  ngOnInit() {
    this.search = this.searchService.searchParameters;
    this.persons = this.searchService.persons;
    this.cityService.getCities().subscribe(
      data => this.returnCities(data)
    );

  }

  returnCities(cities){
    this.cities = cities;
  }
  ngOnDestroy(){
    this.searchService.searchParameters = this.search;
    this.searchService.cities = this.cities;
  }

  private dateChanged(newDate) {
    this.search.date= new Date(newDate);
    console.log(this.search.date);
  }
  private timeChanged(newTime){
    console.log(newTime);
    this.search.time = new Date(newTime);
    console.log(this.search.time);
  }

  public citySelected(city){
    this.search.city = city ? city : null;
  }

}
