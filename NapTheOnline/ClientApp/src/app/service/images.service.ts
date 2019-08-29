import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {ImagePathsModel} from '../share/view-model/image-paths.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private gameUrl: string = this.baseService.gameUrl;
  private newsUrl: string = this.baseService.newsUrl;

  constructor(private httpClient: HttpClient,
              private baseService: ApiService) {
  }

  uploadGameImages(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.gameUrl}/upload/images`, formData);
  }
}
