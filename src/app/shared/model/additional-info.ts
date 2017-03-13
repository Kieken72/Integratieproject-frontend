export class AdditionalInfo {
  public Type: number;
  public Value: string;

  constructor() {
    this.Type = 0;
    this.Value = "Default";
  }
}

export class DisplayFacility{
  public Type:number;
  public Class:string;
  constructor(type:number){
    this.Type = type;
  }
}
