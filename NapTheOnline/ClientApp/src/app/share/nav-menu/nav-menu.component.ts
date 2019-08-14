import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from '../constant';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  MENU_ITEMS = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
