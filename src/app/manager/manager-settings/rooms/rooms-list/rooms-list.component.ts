
import {Branch} from "../../../../shared/model/branch";
import {OnInit, Component} from "@angular/core";
import {Room} from "../model/room";
import {BranchService} from "../../../../shared/branch.service";
import {RoomService} from "../../../../shared/room.service";
@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  private branches: Branch[] = new Array();
  private fullBranches: Branch[] = new Array();
  private rooms: Room[] = new Array();
  constructor(private branchService: BranchService, private roomService: RoomService) { }

  ngOnInit() {
    this.branchService.getBranches().subscribe((data)=>{
      data.forEach((cBranch)=>{
        if(cBranch.CompanyId == "2"){
          //this.getfullBranches(cBranch.Id);
          this.branches.push(cBranch);

        }
      })
    },(error)=>console.log(error),()=>this.getfullBranch(this.branches));

  }

  getfullBranch(branches:Branch[]){
    branches.forEach((cBranch)=>{
      this.roomService.getFullBranch(cBranch.Id).subscribe((data)=> {
        this.fullBranches.push(data);
        this.appendRooms();
      });

    })
  }
  getfullBranches(id:number){
    this.roomService.getFullBranch(id).subscribe((data) => {
      /*data.forEach((cBranch)=>{
       this.fullBranches.push(cBranch);
       })*/
      this.fullBranches.push(data);
    });
  };

  appendRooms(){
    this.fullBranches.forEach((cBranch)=>{
      cBranch.Rooms.forEach((cRoom)=>{
        this.rooms.push(cRoom);
      })
    })
  };
}


