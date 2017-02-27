import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes}   from '@angular/router';
import { AppComponent} from "./app.component";
import { BranchComponent} from "./manager/branches/branches.component";
import { CompanyService} from "./manager/company/company.service";
import { CompanyComponent} from "./manager/company/company.component";
import { Ng2AutoCompleteModule, Ng2AutoComplete} from 'ng2-auto-complete';
import { BranchService} from "./shared/branch.service";
import { CityService} from "./shared/cityservice/city.service";
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
import { SearchService} from "./booker/shared/search.service";
import { DefaultPipe } from './shared/default.pipe';
import { BookerDetailComponent } from './booker/booker-detail/booker-detail.component';
import { LoginComponent } from './account/login/login.component';
import { UserService } from "./account/shared/user.service";
import { LoggedInGuard } from "./shared/logged-in.guard";
import { Typeahead } from "ng2-typeahead";
import {AlertModule, TimepickerModule, DatepickerModule, TabsModule, ModalModule} from "ng2-bootstrap";
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { RegisterComponent } from './account/register/register.component';
import {ReservationService} from "./shared/reservation.service";
import { CompanyEditComponent } from './manager/company/company-edit/company-edit.component';
import { CompanyNewComponent } from './manager/company/company-new/company-new.component';
import { CompanyDetailComponent } from './manager/company/company-detail/company-detail.component';
import { CompanyListComponent } from './manager/company/company-list/company-list.component';
import {Company} from "./manager/company/model/company";



const appRoutes: Routes = [

  { path: 'booker', component: BookerComponent, children: [
    { path: 'search', component: BookerSearchComponent },
    { path: 'list', component: BookerListComponent },
    { path: 'detail/:id', component: BookerDetailComponent},
    { path: '', redirectTo: 'search', pathMatch: 'full'},
  ]},
  { path: 'manager', component: ManagerComponent,  children:[
    { path: 'dashboard', component: ManagerDashboardComponent, canActivate:[LoggedInGuard] },
    { path: 'calendar', component: ManagerCalendarComponent, canActivate:[LoggedInGuard] },
    { path: 'messages', component: ManagerMessagesComponent,  canActivate:[LoggedInGuard] },
    { path: 'guests', component: ManagerGuestsComponent,  canActivate:[LoggedInGuard] },
    { path: 'statistics', component: ManagerStatisticsComponent,  canActivate:[LoggedInGuard] },
    { path: 'calendar', component: ManagerCalendarComponent,  canActivate:[LoggedInGuard] },
    { path: 'company', component: CompanyComponent,  canActivate:[LoggedInGuard], children:[
      { path: "list" , component: CompanyListComponent, canActivate: [LoggedInGuard] },
      { path: 'edit/:id', component: CompanyEditComponent,  canActivate:[LoggedInGuard] },
      { path: 'detail/:id', component: CompanyDetailComponent,  canActivate:[LoggedInGuard] },
      { path: 'new', component: CompanyNewComponent,  canActivate:[LoggedInGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full'},
    ] },
    { path: 'branch', component: BranchComponent,  canActivate:[LoggedInGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ]},
  { path: 'account', component: AccountComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'details', component: AccountDetailComponent, canActivate:[LoggedInGuard] },
  ]},
  { path: '', redirectTo: 'booker', pathMatch: 'full'},


]



@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
     AlertModule.forRoot(),
     TimepickerModule.forRoot(),
     DatepickerModule.forRoot(),
     TabsModule.forRoot(),
     ModalModule.forRoot(),
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
    BookerDetailComponent,
    LoginComponent,
    AccountComponent,
    Typeahead,
    AccountComponent,
    AccountDetailComponent,
    RegisterComponent,
    CompanyEditComponent,
    CompanyNewComponent,
    CompanyDetailComponent,
    CompanyListComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "nl-BE" },
    { provide:'ApiBase',useValue:"https://leisurebooker.azurewebsites.net/api/" },
    { provide:'AuthBase',useValue:"https://leisurebooker.azurewebsites.net/oauth/" },
    CompanyService,
    CityService,
    BranchService,
    SearchService,
    UserService,
    LoggedInGuard,
    ReservationService],
  bootstrap: [AppComponent]

})

export class AppModule {}
