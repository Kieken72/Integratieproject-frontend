import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes, Router}   from '@angular/router';
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
        component: CompanyComponent
      },
      {
        path: 'branches',
        component: BranchComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
