import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule}   from '@angular/router';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import {AppComponent} from "./app.component";
import {BranchComponent} from "./branches/branches.component";
import {CompanyService} from "./company/company.service";
import { NavbarComponent } from './shared/navbar/navbar.component';
import {CompanyComponent} from "./company/company.component";

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
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
    BranchComponent,
    NavbarComponent
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]

})

export class AppModule {}
