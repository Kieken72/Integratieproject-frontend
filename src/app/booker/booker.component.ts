import {Component, OnInit, ViewEncapsulation, HostBinding} from '@angular/core';
import { Typeahead } from "ng2-typeahead";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booker',
  templateUrl: './booker.component.html',
  styleUrls: ['./booker.component.css'],
  host: {'[class.image-bg]':'isBackgroundRoute()'}
  //encapsulation: ViewEncapsulation.None
})
export class BookerComponent implements OnInit {

  @HostBinding('class.image-bg') background: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.background = this.isBackgroundRoute();
    });
  }

  isBackgroundRoute(){
    if(this.router.url === '/booker/search' || this.router.url ==='/booker/list'){
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.background = this.isBackgroundRoute();
  }

}
