import {ShortUser} from "./short-user";
export class Review {

  public ReservationId: number;
  public Result: boolean;
  public Text: string;
  public Public:boolean;
  public DateTime: Date;
  public User: ShortUser;
  public BranchId: number;
}
