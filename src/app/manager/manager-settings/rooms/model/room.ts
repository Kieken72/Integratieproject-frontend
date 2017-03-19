import {Space} from "./space";
/**
 * Created by Emmanuel on 10/03/2017.
 */
export class Room{
  Id:number;
  Name: string;
  Enabled: boolean;
  Width:number;
  Height:number;
  BranchId:number;
  Spaces:Space[];
  new:boolean;

  constructor(){
    this.new = false;
  }


}
