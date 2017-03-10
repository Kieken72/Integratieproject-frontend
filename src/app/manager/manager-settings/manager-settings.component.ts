import { Component, OnInit } from '@angular/core';
import {BranchService} from "../../shared/branch.service";
import {Branch} from "../../shared/model/branch";

@Component({
  selector: 'app-manager-settings',
  templateUrl: './manager-settings.component.html',
  styleUrls: ['./manager-settings.component.css']
})
export class ManagerSettingsComponent implements OnInit {
  private branches: Branch[] = new Array();
  constructor(private branchService: BranchService) { }

  ngOnInit() {
    this.branchService.getBranches().subscribe((data)=>{
      data.forEach((cBranch)=>{
        if(cBranch.CompanyId == "2"){
          this.branches.push(cBranch);
        }
        })
    },(error)=>console.log(error),()=>console.log(this.branches));

  }



}
