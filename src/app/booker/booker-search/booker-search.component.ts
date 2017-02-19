import {Component, OnInit, OnDestroy} from '@angular/core';
import {BookerSearch} from "../shared/model/booker-search";
import {SearchService} from "../shared/search.service";

@Component({
  selector: 'app-booker-search',
  templateUrl: './booker-search.component.html',
  styleUrls: ['./booker-search.component.css']
})
export class BookerSearchComponent implements OnInit, OnDestroy {

  private search: BookerSearch;
  private persons: number[];

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.search = this.searchService.searchParameters;
    this.persons = this.searchService.persons;
  }

  ngOnDestroy(){
    this.searchService.searchParameters = this.search;
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

}
