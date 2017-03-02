import {City} from "../cityservice/city";
import {OperationHour} from "./operationhour";
import {AdditionalInfo} from "./additional-info";
import {Review} from "./review";
/**
 * Created by Emmanuel on 16/02/2017.
 */
export class Branch{
  public Id: number;
  public Name:string;
  public Street: string;
  public Number:string;
  public Box: string;
  public CityId: string;
  public City: City;
  public PhoneNumber: string;
  public Email: string;
  public CompanyId: string;
  public Picture: string;
  public Description: string;
  public AdditionalInfos: AdditionalInfo[];
  public OpeningHours: OperationHour[];
  public Reviews: Review[];
  public Available: boolean;
  public Message: CheckMessage;
}


export enum CheckMessage{
  Closed,
  Full,
  Free
}
