import {Message} from "../../../booker/shared/model/message";
export class Reservation{
  public Id: string;
  public AmountOfPersons: number;
  public DateTime: string;
  public EndDateTime: string;
  public SpaceId: string;
  public BranchId: string;
  public BranchName: string;
  public AccountId: string;
  public Messages: Message[];
  public Review: string;
  public Cancelled: string;
}
