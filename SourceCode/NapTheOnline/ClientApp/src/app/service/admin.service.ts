import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountLoginInputModel } from '../share/view-model/account-login-input.model';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
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

    getToken(): string {
        return localStorage.getItem('currentUser');
    }

    setToken(token: string): void {
        localStorage.setItem('currentUser', token);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

}
