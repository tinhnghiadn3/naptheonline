import {Component, OnInit} from '@angular/core';
import {NEWS} from '../view-model/mock-data';
import {NewsModel} from '../view-model/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit{

  selectedNew: NewsModel;
  news: NewsModel[];

  constructor() {
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.news = NEWS;
  }

  showNews(item: NewsModel) {
    this.selectedNew = item;
  }
}
