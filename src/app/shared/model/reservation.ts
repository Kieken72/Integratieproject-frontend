import {ShortUser} from "./short-user";
export class Reservation {
  public Id: number;
  public AmountOfPersons: number;
  public DateTime: Date;
  public EndDateTime: Date;
  public SpaceId: number;
  public BranchId: number;
  public BranchName: string;
  public UserId: string;
  public User: ShortUser;
  public CreatedOn: Date;
  public Arrived : boolean;
  public NoShow : boolean;
  public Passed: boolean;
  public Cancelled: boolean;
}
