import {User} from "../../../account/account-detail/model/user";
export class Message {
  reservationId: string;
  branchId: string;
  userId: string;
  text: string;
  dateTime: Date;
  user: User
}
