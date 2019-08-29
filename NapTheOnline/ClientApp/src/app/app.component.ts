import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAdmin = false;

  constructor(private router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationStart && e.url.includes('/admin')) {
        this.isAdmin = true;
      }
    });
  }

  ngOnInit() {
  }

}
