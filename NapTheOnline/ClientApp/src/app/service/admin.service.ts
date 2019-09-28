import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountLoginInputModel } from '../share/view-model/account-login-input.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public currentUserSubject = new BehaviorSubject<AccountLoginInputModel>(null);
  public currentUser: Observable<AccountLoginInputModel>;

  private authenticationUrl: string = this.baseService.authenticationUrl;

  constructor(private baseService: ApiService) {
    this.currentUserSubject = new BehaviorSubject<AccountLoginInputModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AccountLoginInputModel {
    return this.currentUserSubject.value;
  }

  login(loginData: AccountLoginInputModel) {
    return this.baseService.post<any>(`${this.authenticationUrl}/login`, loginData)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
}

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
