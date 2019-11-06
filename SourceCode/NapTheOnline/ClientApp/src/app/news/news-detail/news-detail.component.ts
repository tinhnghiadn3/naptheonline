import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {NewsModel} from '../../share/view-model/news.model';
import {Router} from '@angular/router';
import {NewsService} from '../../service/news.service';
import { ShareService } from '../../service/share.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, AfterViewInit {

  selectedNews: NewsModel;

  constructor(private newsService: NewsService,
              private router: Router,
              private shareService: ShareService) {
    if (this.newsService.selectedNews) {
      this.selectedNews = this.newsService.selectedNews;
    } else {
      this.router.navigate(['/news']);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.shareService.setLoading(false);
  }
}
