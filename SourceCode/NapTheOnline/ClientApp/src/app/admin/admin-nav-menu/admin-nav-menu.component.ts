import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../service/share.service';

@Component({
  selector: 'app-admin-nav-menu',
  templateUrl: './admin-nav-menu.component.html',
  styleUrls: ['./admin-nav-menu.component.scss']
})
export class AdminNavMenuComponent implements OnInit {

  constructor(private shareService: ShareService) { }

  ngOnInit() {
  }

  changeMenu() {
    this.shareService.setLoading(true);
  }
}
