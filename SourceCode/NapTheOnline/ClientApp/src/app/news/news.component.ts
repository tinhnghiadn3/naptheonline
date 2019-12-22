import {Component, OnInit} from '@angular/core';
import { ShareService } from '../service/share.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  constructor(private shareService: ShareService) {
    this.shareService.setBestViewed([]);
  }

  ngOnInit(): void {
  }
}
