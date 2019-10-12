import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {ImagePathsModel} from '../share/view-model/image-paths.model';
import {Form} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private gameUrl: string = this.baseService.gameUrl;
  private newsUrl: string = this.baseService.newsUrl;
  public uploadingPercent = 0;

  constructor(private httpClient: HttpClient,
              private baseService: ApiService) {
  }

  uploadGameImages(formData: FormData, gameId: number): Promise<boolean> {
    return this.uploadAttachment(formData, `${this.gameUrl}/${gameId}/upload/images`);
  }

  uploadNewsImages(formData: FormData, newsId): Promise<boolean> {
    return this.uploadAttachment(formData, `${this.newsUrl}/${newsId}/upload/images`);
  }

  uploadAttachment(formData: FormData, url): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.baseService.postFile(url, formData).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadingPercent = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadingPercent = 0;

          // Resolve
          resolve(event.body as boolean);
        }
      }, (error) => {
        alert((error as any).error.message);
        this.uploadingPercent = 0;
        reject();
      });
    });
  }
}
