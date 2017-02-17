import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes}   from '@angular/router';


import {AppComponent} from "./app.component";
import {BranchComponent} from "./manager/branches/branches.component";
import {CompanyService} from "./manager/company/company.service";
import {CompanyComponent} from "./manager/company/company.component";
import {Ng2AutoCompleteModule, Ng2AutoComplete} from 'ng2-auto-complete';
import {CitySearchComponent} from "./shared/cityservice/city-search.component";
import {BranchService} from "./manager/branches/branche.service";
import {CityService} from "./shared/cityservice/city.service";
import { BookerComponent } from './booker/booker.component';
import { BookerNavbarComponent } from './booker/booker-navbar/booker-navbar.component';
import { ManagerNavbarComponent } from './manager/manager-navbar/manager-navbar.component';


const appRoutes: Routes = [
  { path: 'booker', component: BookerComponent },
  { path: 'manage', children:[
    { path: 'company', component: CompanyComponent },
    { path: 'branch', component: BranchComponent },
  ]},
  { path: '', redirectTo: 'booker', pathMatch: 'full' }

]



@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule, Ng2AutoCompleteModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    CompanyComponent,
    BranchComponent,
    BookerComponent,
    BookerNavbarComponent,
    ManagerNavbarComponent
  ],
  providers: [CompanyService,CityService, BranchService],
  bootstrap: [AppComponent]

})

export class AppModule {}
