import {Component, OnInit} from '@angular/core';
import {NEWS} from '../share/view-model/mock-data';
import {NewsModel} from '../share/view-model/news.model';
import {NewsService} from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  selectedNew: NewsModel;
  news: NewsModel[];

  constructor(private newService: NewsService) {
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.newService.getNews().subscribe(res => {
      this.news = res || NEWS;
    });
  }

  showNews(item: NewsModel) {
    this.selectedNew = item;
  }
}
