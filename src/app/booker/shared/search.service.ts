import {Injectable, OnInit} from '@angular/core';
import {BookerSearch} from "./model/booker-search";
import {City} from "../../shared/cityservice/city";

@Injectable()
export class SearchService{
  set cities(value: City[]) {
    this._cities = value;
  }
  get cities(): City[] {
    return this._cities;
  }


  private _searchParameters :BookerSearch;

  private _persons: number[];

  private _cities: City[]

  get persons(): number[] {
    return this._persons;
  }
  get searchParameters(): BookerSearch {
    if(this._searchParameters){
      return this._searchParameters;
    }
    return new BookerSearch();
  }

  set searchParameters(value: BookerSearch) {
    this._searchParameters = value;
  }

  constructor() {
    this._persons = [1,2,3,4,5,6,7,8,9,10,11,12,13,15];
  }


}
