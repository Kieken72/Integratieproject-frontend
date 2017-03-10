import {Newreservation} from "../../../../shared/model/newreservation";
/**
 * Created by Emmanuel on 09/03/2017.
 */
export class Space{
  spaceName:string;
  enabled: string;
  numberOfPerons: string;
  minNumberOfPersons: string;
  roomId:number;
  x:string;
  y:string;
  type:number;
  reservations: Newreservation[];

}
