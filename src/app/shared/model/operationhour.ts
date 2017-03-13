export class OperationHour {
  public Day: number;
  public FromTime: string;
  public ToTime: string;

  constructor() {
    this.Day = 1;
    this.FromTime = "10:00:00";
    this.ToTime = "16:00:00";
  }
}

export class DisplayOperationHour{
  public Day: string;
  public Times: string;
  constructor(day:string, times:string){
    this.Day = day;
    this.Times = times;
  }
}
