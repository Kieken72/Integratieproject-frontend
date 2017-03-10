/**
 * Created by Emmanuel on 10/03/2017.
 */
import {Injectable, Inject} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Room} from "../manager/manager-settings/rooms/model/room";
import {Space} from "../manager/manager-settings/rooms/model/space";

@Injectable()
export class RoomService{
  constructor(private  http:Http,@Inject('ApiBase') private apiBase:string ){}
  private room:Room = new Room();
  private space:Space = new Space();

  postRoom(_branchId:number, _enabled:boolean, _height:string, _width:string, _name:string){
    this.room.branchId = _branchId;
    this.room.enabled = _enabled;
    this.room.height = _height;
    this.room.width = _width;
    this.room.name = _name;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBase+'branches/room', JSON.stringify(this.room), options).map((res:Response)=>res.json());
  }

  postSpaces(_name:string, _enabled:string, _persons:string, _minPersons:string, _roomId:number, _x:string, _y:string, _type:number){
    this.space.spaceName = _name;
    this.space.enabled = _enabled;
    this.space.numberOfPerons = _persons;
    this.space.minNumberOfPersons = _minPersons;
    this.space.roomId = _roomId;
    this.space.x = _x;
    this.space.y = _y;
    this.space.type = _type;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBase+'branches/space', JSON.stringify(this.space), options).map((res:Response)=>res.json());
  };

}

