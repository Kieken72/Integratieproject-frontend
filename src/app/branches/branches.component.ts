import { Component } from '@angular/core';
import {Branche} from "./model/branche";
import {BranchService} from "./branche.service";

@Component({
  selector: 'my-branches',
  templateUrl: 'branches.component.html',
  styleUrls: ['branches.component.css']
})
export class BranchComponent {
  title = 'Nieuw filiaal!';
  branches: Branche[];
  ngOnInit(): void {
    this.getBranches();
  }

  constructor(private brancheService:BranchService){}

  getBranches():void{
    this.brancheService.getBranches().subscribe(data => this.branches = data);
  }
}


