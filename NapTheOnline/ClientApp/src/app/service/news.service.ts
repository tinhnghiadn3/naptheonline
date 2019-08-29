import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {NewsModel} from '../share/view-model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newUrl: string = this.baseService.newsUrl;


  constructor(private baseService: ApiService) {
  }

  getNews(): Observable<NewsModel[]> {
    return this.baseService.get(`${this.newUrl}`);
  }

  getNew(newId: number): Observable<NewsModel> {
    return this.baseService.get(`${this.newUrl}/${newId}`);
  }
}
