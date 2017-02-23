export class OperationHour {
  public Day: number;
  public FromTime: string;
  public ToTime: string;
}

export class DisplayOperationHour{
  public Day: string;
  public Times: string;
  constructor(day:string, times:string){
    this.Day = day;
    this.Times = times;
  }
}
