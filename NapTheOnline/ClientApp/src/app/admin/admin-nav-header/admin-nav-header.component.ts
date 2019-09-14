import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-nav-header',
  templateUrl: './admin-nav-header.component.html',
  styleUrls: ['./admin-nav-header.component.scss']
})
export class AdminNavHeaderComponent implements OnInit {

  @Input() nameComponent: string;

  constructor() {
  }

  ngOnInit() {
  }

}
