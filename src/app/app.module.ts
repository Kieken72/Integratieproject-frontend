import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes}   from '@angular/router';
import { AppComponent} from "./app.component";
import { BranchComponent} from "./manager/branches/branches.component";
import { CompanyService} from "./manager/company/company.service";
import { CompanyComponent} from "./manager/company/company.component";
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
import {
  AlertModule, TimepickerModule, DatepickerModule, TabsModule, ModalModule, AccordionModule,
  TooltipModule, CarouselModule
} from "ng2-bootstrap";
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { RegisterComponent } from './account/register/register.component';
import { ReservationService } from "./shared/reservation.service";
import { CompanyEditComponent } from './manager/company/company-edit/company-edit.component';
import { CompanyNewComponent } from './manager/company/company-new/company-new.component';
import { CompanyDetailComponent } from './manager/company/company-detail/company-detail.component';
import { CompanyListComponent } from './manager/company/company-list/company-list.component';
import { BranchListComponent } from './manager/branches/branch-list/branch-list.component';
import { BranchDetailComponent } from './manager/branches/branch-detail/branch-detail.component';
import { BranchEditComponent } from './manager/branches/branch-edit/branch-edit.component';
import { BranchNewComponent } from './manager/branches/branch-new/branch-new.component';
import { ManagerSettingsComponent } from './manager/manager-settings/manager-settings.component';
import { RoomsComponent } from './manager/manager-settings/rooms/rooms.component';
import { RoomNewComponent } from './manager/manager-settings/rooms/room-new/room-new.component';
import { SpacesComponent } from './manager/manager-settings/spaces/spaces.component';
import { SpaceNewComponent } from './manager/manager-settings/spaces/space-new/space-new.component';
import { RoomEditComponent } from './manager/manager-settings/rooms/room-edit/room-edit.component';
import { SpaceArrangeComponent } from './manager/manager-settings/spaces/space-arrange/space-arrange.component';

import {ProfileService} from "./account/shared/profile.service";
import {ManagerGuard} from "./shared/manager.guard";
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { BookerReviewComponent } from './booker/booker-review/booker-review.component';
import { AccountNavbarComponent } from './account/account-navbar/account-navbar.component';

import { BookerReservationdetailComponent } from './booker/booker-reservationdetail/booker-reservationdetail.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
import {FacebookService} from "ng2-facebook-sdk";
import { BookerMapComponent } from './booker/booker-map/booker-map.component';
import {ManagerService} from "./manager/manager.service";
import { PhonePipe } from './shared/phone.pipe';

const appRoutes: Routes = [

  { path: 'booker', component: BookerComponent, children: [
    { path: 'search', component: BookerSearchComponent },
    { path: 'list', component: BookerListComponent },
    { path: 'map', component: BookerMapComponent },
    { path: 'detail/:id', component: BookerDetailComponent},
    { path: 'reservation/:id', component: BookerReservationdetailComponent},
    { path: 'review/:id', component: BookerReviewComponent},
    { path: '', redirectTo: 'search', pathMatch: 'full'},
  ]},
  { path: 'manager', component: ManagerComponent,  children:[
    { path: 'dashboard', component: ManagerDashboardComponent, canActivate:[LoggedInGuard] },
    { path: 'calendar', component: ManagerCalendarComponent, canActivate:[LoggedInGuard] },
    { path: 'messages', component: ManagerMessagesComponent,  canActivate:[LoggedInGuard] },
    { path: 'guests', component: ManagerGuestsComponent,  canActivate:[ManagerGuard] },
    { path: 'statistics', component: ManagerStatisticsComponent,  canActivate:[ManagerGuard] },
    { path: 'company', component: CompanyComponent,  canActivate:[ManagerGuard], children:[
      { path: "list" , component: CompanyListComponent, canActivate: [ManagerGuard] },
      { path: 'edit/:id', component: CompanyEditComponent,  canActivate:[ManagerGuard] },
      { path: 'detail/:id', component: CompanyDetailComponent,  canActivate:[ManagerGuard] },
      { path: 'new', component: CompanyNewComponent,  canActivate:[ManagerGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full'},
    ] },
    { path: 'branch', component: BranchComponent,  canActivate:[LoggedInGuard], children:[
      { path: "list" , component: BranchListComponent, canActivate: [LoggedInGuard] },
      { path: 'edit/:id', component: BranchEditComponent,  canActivate:[LoggedInGuard] },
      { path: 'detail/:id', component: BranchDetailComponent,  canActivate:[LoggedInGuard] },
      { path: 'new', component: BranchNewComponent,  canActivate:[LoggedInGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full'},
    ] },
    { path: 'settings', component: ManagerSettingsComponent, children: [
      { path: 'rooms', component: RoomsComponent,  children:[
        { path: 'new/:id', component: RoomNewComponent },
        { path: '', redirectTo: 'new', pathMatch: 'full'},
      ]},
      { path: 'spaces', component: SpacesComponent, canActivate: [ManagerGuard], children:[
        { path: 'new', component: SpaceNewComponent, canActivate: [ManagerGuard] },
        { path: 'arrange', component: SpaceArrangeComponent, canActivate: [ManagerGuard] },
        { path: '', redirectTo: 'new', pathMatch: 'full'},
      ]},
    ]},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ]},
  { path: 'account', component: AccountComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'details', component: AccountDetailComponent, canActivate:[LoggedInGuard] },
    { path: 'edit', component: AccountEditComponent, canActivate: [LoggedInGuard]}
  ]},
  { path: '', redirectTo: 'booker', pathMatch: 'full'},


]

@NgModule({
   imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     AlertModule.forRoot(),
     TimepickerModule.forRoot(),
     DatepickerModule.forRoot(),
     TabsModule.forRoot(),
     ModalModule.forRoot(),
     AccordionModule.forRoot(),
     TooltipModule.forRoot(),
     CarouselModule.forRoot(),
     AgmCoreModule.forRoot({
       apiKey: 'AIzaSyCiJDhAZiQWh-hTj-EBeDB7YR9EXmijx9g'
     }),
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
    CompanyListComponent,
    BranchListComponent,
    BranchDetailComponent,
    BranchEditComponent,
    BranchNewComponent,
    ManagerSettingsComponent,
    RoomsComponent,
    RoomNewComponent,
    SpacesComponent,
    SpaceNewComponent,
    RoomEditComponent,
    SpaceArrangeComponent,
    AccountEditComponent,
    BookerReviewComponent,
    AccountNavbarComponent,
    BookerReviewComponent,
    BookerReservationdetailComponent,
    BookerMapComponent,
    PhonePipe
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
    ProfileService,
    LoggedInGuard,
    ManagerGuard,
    ReservationService,
    FacebookService,
    ManagerService
  ],
  bootstrap: [AppComponent]

})

export class AppModule {}
