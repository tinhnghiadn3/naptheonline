import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {NewsModel} from '../share/view-model/news.model';
import {GameModel} from '../share/view-model/game.model';
import {PriceModel} from '../share/view-model/price.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newUrl: string = this.baseService.newsUrl;

  public selectedNews: NewsModel;
  public adminNews: NewsModel;

  constructor(private baseService: ApiService) {
  }

  getNews(pageIndex: number, typeId: number): Observable<NewsModel[]> {
    return this.baseService.get(`${this.newUrl}/${typeId}/${pageIndex}`);
  }

  addNews(news: NewsModel): Observable<number> {
    return this.baseService.post(`${this.newUrl}`, news);
  }

  updateNews(news: NewsModel): Observable<boolean> {
    return this.baseService.update(`${this.newUrl}`, news);
  }

  deleteNews(newsId: number): Observable<boolean> {
    return this.baseService.delete(`${this.newUrl}/${newsId}`);
  }
}
