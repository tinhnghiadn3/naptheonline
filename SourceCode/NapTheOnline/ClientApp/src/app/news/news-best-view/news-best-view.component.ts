import { Component, OnInit, Input } from '@angular/core';
import { NewsModel } from '../../share/view-model/news.model';
import { ShareService } from 'src/app/service/share.service';

@Component({
  selector: 'app-news-best-view',
  templateUrl: './news-best-view.component.html',
  styleUrls: ['./news-best-view.component.scss']
})
export class NewsBestViewComponent implements OnInit {

  listBestViewed: NewsModel[] = [];

  constructor(private shareService: ShareService) { 
    this.shareService.subscribeBestViewed(data => {
      this.listBestViewed = data || [];
    });
  }

  ngOnInit() {
  }

}
