import {ShortUser} from "./short-user";
export class Review {

  public Id: number;
  public Result: boolean;
  public Text: string;
  public DateTime: Date;
  public User: ShortUser;
}
