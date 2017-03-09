import {ShortUser} from "./short-user";
export class Reservation {
  public AmountOfPersons: number;
  public DateTime: string;
  public EndDateTime: string;
  public SpaceId: string;
  public BranchId: string;
  public BranchName: string;
  public UserId: string;
  public User: ShortUser;
}
