import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  backupUrl = this.baseService.backupUrl;

  constructor(private baseService: ApiService) { }

  upload(): Observable<boolean> {
    return this.baseService.get(`${this.backupUrl}/upload`);
  }

  restore(): Observable<boolean> {
    return this.baseService.get(`${this.backupUrl}/restore`);
  }
}
