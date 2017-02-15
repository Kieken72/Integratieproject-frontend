import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule}   from '@angular/router';


import {AppComponent} from "./app.component";
import {BranchComponent} from "./branches/branches.component";
import {CompanyService} from "./company/company.service";
import { NavbarComponent } from './shared/navbar/navbar.component';
import {CompanyComponent} from "./company/company.component";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {CitySearchComponent} from "./shared/cityservice/city-search.component";

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule, Ng2AutoCompleteModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path: 'manage/company',
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
