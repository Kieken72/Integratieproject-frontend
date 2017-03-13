import {Newreservation} from "../../../../shared/model/newreservation";
/**
 * Created by Emmanuel on 09/03/2017.
 */
export class Space{
  Name:string;
  enabled: string;
  Persons: number;
  MinPersons: number;
  roomId:number;
  x:number;
  y:number;
  type:number;
  reservations: Newreservation[];

}
