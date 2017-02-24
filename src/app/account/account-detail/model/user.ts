import {UserRole} from "./userRole";
import {Reservation} from "./reservation";
/**
 * Created by Emmanuel on 24/02/2017.
 */
export class User{
  Url: string;
  Id: string;
  Email: string;
  Firstname: string;
  Surname: string;
  Roles: UserRole[];
  Reservations: Reservation[];
}
