import {Component, OnInit, ViewChild} from '@angular/core';
import {Message} from "../model/message";
import {ManagerService} from "../../shared/manager.service";
import {ModalDirective} from "ng2-bootstrap";
import {User} from "../../../account/account-detail/model/user";
import {ProfileService} from "../../../account/shared/profile.service";
import {ReservationService} from "../../../shared/reservation.service";
import {Reservation} from "../../../shared/model/reservation";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('messageModal') public messageModal:ModalDirective;
  private refreshing: boolean;
  private messages: Message[];
  private message:Message = new Message();
  private reservations : Reservation[];

  private user:User = null;

  private conversation: Message[];
  constructor(private managerService:ManagerService, private profileService:ProfileService, private reservationService:ReservationService) {
    this.refreshing = true;
  }

  ngOnInit() {
    this.managerService.getMessagesByBranch(this.managerService.branchId).subscribe(
      (data)=>this.getData(data));
    setTimeout(()=>{
      this.profileService.getProfile().subscribe(
        data=>this.user = data);
    },1000);
    this.getReservations();
  }

  getData(data){
    console.log(this.messages);
    this.messages = data;
    this.refreshing = false;
  }

  showModal(id:number, branchId:number) :void{
    this.message.ReservationId = id;
    this.message.BranchId = branchId;
    this.conversation = this.messages.filter(e=>e.ReservationId == id);
    console.log(this.conversation);
    this.messageModal.show();
  }

  sendMessage(){
    this.reservationService.postMessage(this.message.ReservationId, this.message.BranchId, this.message.text).subscribe((data)=>this.onComplete(data));

  }
  onComplete(data){
    console.log(data);
    this.reservationService.getMessages(data.ReservationId).subscribe((data) => this.conversation = data,(err)=>console.log(err),()=>console.log(this.conversation));
  }

  getReservations(){
    this.reservationService.getRecentReservationByBranch(this.managerService.branchId).subscribe((data) => this.reservations = data);
    //this.reservationService.getRecentReservationByBranch(this.managerService.branchId).subscribe((data) => console.log(data));
  }

}
