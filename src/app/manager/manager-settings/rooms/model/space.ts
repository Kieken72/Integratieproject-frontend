import {Reservation} from "../../../../shared/model/reservation";
/**
 * Created by Emmanuel on 09/03/2017.
 */
export class Space{
  Id: number;
  oldName: string;
  Name:string;
  Enabled: string;
  Persons: number;
  MinPersons: number;
  roomId:number;
  X:number;
  Y:number;
  Type:number;
  Reservations: Reservation[];

}
