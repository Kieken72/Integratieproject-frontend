import { Component, OnInit } from '@angular/core';
import {Branch} from "../../../shared/model/branch";
import {BranchService} from "../../../shared/branch.service";

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  title = 'Branches';
  branches: Branch[];

  branch = new Branch();

  ngOnInit(): void {
    this.getBranches();
  }

  constructor(private brancheService:BranchService){}
  getBranches():void{
    this.brancheService.getBranches().subscribe(data => this.branches = data);
  }
}
