import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ShareService } from '../../service/share.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  constructor(private shareService: ShareService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.shareService.setLoading(false);
  }
}
