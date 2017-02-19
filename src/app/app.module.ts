import { BrowserModule } from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes}   from '@angular/router';
import {AppComponent} from "./app.component";
import {BranchComponent} from "./manager/branches/branches.component";
import {CompanyService} from "./manager/company/company.service";
import {CompanyComponent} from "./manager/company/company.component";
import {Ng2AutoCompleteModule, Ng2AutoComplete} from 'ng2-auto-complete';
import {BranchService} from "./shared/branch.service";
import {CityService} from "./shared/cityservice/city.service";
import { BookerComponent } from './booker/booker.component';
import { BookerNavbarComponent } from './booker/booker-navbar/booker-navbar.component';
import { ManagerNavbarComponent } from './manager/manager-navbar/manager-navbar.component';
import { BookerSearchComponent } from './booker/booker-search/booker-search.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { ManagerMessagesComponent } from './manager/manager-messages/manager-messages.component';
import { ManagerCalendarComponent } from './manager/manager-calendar/manager-calendar.component';
import { ManagerGuestsComponent } from './manager/manager-guests/manager-guests.component';
import { ManagerStatisticsComponent } from './manager/manager-statistics/manager-statistics.component';
import { BookerListComponent } from './booker/booker-list/booker-list.component';
import {SearchService} from "./booker/shared/search.service";
import { DefaultPipe } from './shared/default.pipe';
import { BookerDetailComponent } from './booker/booker-detail/booker-detail.component';


const appRoutes: Routes = [

  { path: 'booker', component: BookerComponent, children: [
    { path: 'search', component: BookerSearchComponent },
    { path: 'list', component: BookerListComponent },
    { path: 'detail/:id', component: BookerDetailComponent},
    { path: '', redirectTo: 'search', pathMatch: 'full'},
    //{ path: 'results' },
    //{ path: 'details/:id'}
  ]},
  { path: 'manager', component: ManagerComponent, children:[
    { path: 'dashboard', component: ManagerDashboardComponent },
    { path: 'calendar', component: ManagerCalendarComponent },
    { path: 'messages', component: ManagerMessagesComponent },
    { path: 'guests', component: ManagerGuestsComponent },
    { path: 'statistics', component: ManagerStatisticsComponent },
    { path: 'calendar', component: ManagerCalendarComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'branch', component: BranchComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ]},
  { path: '', redirectTo: 'booker', pathMatch: 'full'},

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
    ManagerNavbarComponent,
    BookerSearchComponent,
    ManagerComponent,
    ManagerDashboardComponent,
    ManagerComponent,
    ManagerMessagesComponent,
    ManagerCalendarComponent,
    ManagerGuestsComponent,
    ManagerStatisticsComponent,
    BookerListComponent,
    DefaultPipe,
    BookerDetailComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: "nl-BE" },CompanyService,CityService, BranchService, SearchService],
  bootstrap: [AppComponent]

})

export class AppModule {}
