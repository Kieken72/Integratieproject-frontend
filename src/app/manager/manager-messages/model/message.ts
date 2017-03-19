import {User} from "../../../account/account-detail/model/user";
export class Message {
  ReservationId: number;
  BranchId: number;
  UserId: string;
  text: string;
  DateTime: Date;
  user: User
}
