import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule}   from '@angular/router';



import {CompanyComponent} from '../company/company.component';
import {AppComponent} from "./app.component";
import {BranchComponent} from "../branches/branches.component";
import {CompanyService} from "../company/company.service";
import {InMemoryDataService} from "./in-memory-data.service";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';



@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'branches',
        component: BranchComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    CompanyComponent,
    BranchComponent
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]

})

export class AppModule {}
