import {Space} from "./space";
/**
 * Created by Emmanuel on 10/03/2017.
 */
export class Room{
  Id:number;
  name: string;
  enabled: boolean;
  width:string;
  height:string;
  branchId:number;
  Spaces:Space[];

}
