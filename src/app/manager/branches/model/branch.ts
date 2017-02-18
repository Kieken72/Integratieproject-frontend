import {City} from "../../../shared/cityservice/city";
/**
 * Created by Emmanuel on 16/02/2017.
 */
export class Branch{
  public Id: string;
  public Name:string;
  public Street: string;
  public Number:string;
  public Box: string;
  public CityId: string;
  public City: City;
  public PhoneNumber: string;
  public Email: string;
  public CompanyId: string;
}
