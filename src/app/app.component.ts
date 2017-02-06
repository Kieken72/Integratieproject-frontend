import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <a routerLink="/company">Company</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Nieuw bedrijf';
}
