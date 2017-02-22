import {City} from "../../../shared/cityservice/city";

export class BookerSearch {
  date: Date;
  time: Date;
  amount: number;
  location: string;
  city: City;

  constructor(){
    this.amount = 2;
  }
}
