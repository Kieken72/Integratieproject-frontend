import {City} from "../../../shared/cityservice/city";

export class BookerSearch {
  date: Date;
  time: Date;
  amount: number;
  city: City;

  constructor(){
    this.amount = 2;
    this.time = new Date();
    this.date = new Date();
  }
}
