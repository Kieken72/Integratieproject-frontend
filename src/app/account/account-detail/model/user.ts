import {UserRole} from "./userRole";
import {Branch} from "../../../shared/model/branch";
import {Reservation} from "../../../shared/model/reservation";
/**
 * Created by Emmanuel on 24/02/2017.
 */
export class User{
  Url: string;
  Id: string;
  Email: string;
  PhoneNumber: string;
  Name: string;
  Lastname: string;
  Roles: UserRole[];
  Reservations: Reservation[];
  Favorites: Branch[];
}
