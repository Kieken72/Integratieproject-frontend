import { Injectable } from '@angular/core';
import {BookerSearch} from "./model/booker-search";

@Injectable()
export class SearchService {
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

  private _searchParameters :BookerSearch;

  private _persons: number[];

  constructor() {
    this._persons = [1,2,3,4,5,6,7,8,9,10,11,12,13,15];
  }

}
