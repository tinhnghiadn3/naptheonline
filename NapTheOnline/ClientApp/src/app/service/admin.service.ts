import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {AccountLoginInputModel} from '../share/view-model/account-login-input.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private authenticationUrl: string = this.baseService.authenticationUrl;

  constructor(private baseService: ApiService) {
  }

  login(loginData: AccountLoginInputModel): Observable<boolean> {
    return this.baseService.post(`${this.authenticationUrl}/login`, loginData);
  }
}
