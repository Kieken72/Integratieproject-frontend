import {Newreservation} from "../../../../shared/model/newreservation";
/**
 * Created by Emmanuel on 09/03/2017.
 */
export class Space{
  Id: number;
  Name:string;
  Enabled: string;
  Persons: number;
  MinPersons: number;
  roomId:number;
  X:number;
  Y:number;
  Type:number;
  reservations: Newreservation[];

}
