import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {GameModel} from '../share/view-model/game.model';
import {NewsModel} from '../share/view-model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newUrl: string = this.baseService.newUrl;


  constructor(private baseService: ApiService) { }

  getNews(): Observable<NewsModel[]> {
    return this.baseService.get(`${this.newUrl}`);
  }

  getNew(newId: number): Observable<NewsModel> {
    return this.baseService.get(`${this.newUrl}/${newId}`);
  }
}
