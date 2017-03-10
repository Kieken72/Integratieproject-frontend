import { Injectable } from '@angular/core';

@Injectable()
export class ManagerService {

  public branchId: number;
  constructor() {
    this.branchId = 1;
  }

}
