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

  postRoom(_branchId:number, _enabled:boolean, _height:number, _width:number, _name:string){
    this.room.BranchId = _branchId;
    this.room.Enabled = _enabled;
    this.room.Height = _height;
    this.room.Width = _width;
    this.room.Name = _name;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBase+'branches/room', JSON.stringify(this.room), options).map((res:Response)=>res.json());
  }

  putRoom(room:Room){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });
    console.log(room);
    return this.http.put(this.apiBase+'branches/room/'+room.Id, JSON.stringify(room), options).map((res:Response)=>res);
  }

  postSpaces(_name:string, _enabled:string, _persons:number, _minPersons:number, _roomId:number, _x:number, _y:number, _type:number){
    this.space.Name = _name;
    this.space.Enabled = _enabled;
    this.space.Persons = _persons;
    this.space.MinPersons = _minPersons;
    this.space.roomId = _roomId;
    this.space.X = _x;
    this.space.Y = _y;
    this.space.Type = _type;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiBase+'branches/space', JSON.stringify(this.space), options).map((res:Response)=>res.json());
  };

  putSpace(_id: number, _name:string, _enabled:string, _persons:number, _minPersons:number, _roomId:number, _x:number, _y:number, _type:number){
    this.space.Name = _name;
    this.space.Enabled = _enabled;
    this.space.Persons = _persons;
    this.space.MinPersons = _minPersons;
    this.space.roomId = _roomId;
    this.space.X = _x;
    this.space.Y = _y;
    this.space.Type = _type;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', 'Bearer '+authToken);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.apiBase+'branches/space/'+_id, JSON.stringify(this.space), options).map((res:Response)=>res.json());
  };

  getFullBranch(id:any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiBase+'branches/' + id, options).map(res=>res.json());
  }

  getRoom(id:number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiBase+'branches/room/' + id, options).map(res=>res.json());
  }

}

