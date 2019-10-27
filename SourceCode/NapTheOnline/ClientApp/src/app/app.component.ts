import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import { ShareService } from './service/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAdmin = false;
  isLoading = false;

  constructor(private router: Router,
              private viewportScroller: ViewportScroller,
              private shareService: ShareService) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart && e.url.includes('/admin')) {
        this.isAdmin = true;
      }

      if (event => event instanceof NavigationEnd) {
        document.body.scrollTop = 0;
        viewportScroller.scrollToPosition([0, 0]);
      }
    });

    this.shareService.subscribeLoading(value => this.isLoading = value);
  }

  ngOnInit() {
  }

  onActivate() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
