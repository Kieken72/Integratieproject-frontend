import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule}   from '@angular/router';
import {CompanyComponent} from './company.component';
import {AppComponent} from "./app.component";
import {BranchComponent} from "./branches.component";

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    BranchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
  providers: [],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class AppModule {}
