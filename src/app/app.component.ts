import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <a routerLink="/company">Maak een nieuw bedrijf</a>
    <a routerLink="/branches">Maak een nieuw filiaal</a>
    <router-outlet> </router-outlet>
  `
})
export class AppComponent {
  title = 'Leisure booker';
}
