import {UserRole} from "./userRole";
import {Reservation} from "./reservation";
import {Branch} from "../../../shared/model/branch";
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
