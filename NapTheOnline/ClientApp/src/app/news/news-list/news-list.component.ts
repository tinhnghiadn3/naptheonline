import { Component, OnInit } from '@angular/core';
import {GameModel} from '../../share/view-model/game.model';
import {Router} from '@angular/router';
import {GamesService} from '../../service/games.service';
import {Utility} from '../../share/utility';
import {NewsService} from '../../service/news.service';
import {NewsModel} from '../../share/view-model/news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  listNews: NewsModel[];

  constructor(private router: Router,
              private newsService: NewsService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.newsService.getNews().subscribe(res => {
      this.listNews = res;
      this.listNews = Utility.generateFriendlyName(this.listNews);
    });
  }

  showDetail(news: NewsModel) {
    this.newsService.selectedNews = news;
    this.router.navigate([`/news/${news.friendlyName}`]);
  }
}
