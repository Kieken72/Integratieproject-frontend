import {Message} from "../../../booker/shared/model/message";
export class Reservation{
  public Id: number;
  public AmountOfPersons: number;
  public DateTime: string;
  public EndDateTime: string;
  public SpaceId: number;
  public BranchId: number;
  public BranchName: string;
  public AccountId: string;
  public Messages: Message[];
  public Review: string;
  public Cancelled: string;
}
