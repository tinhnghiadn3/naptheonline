import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountLoginInputModel } from '../share/view-model/account-login-input.model';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { ShareService } from './share.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    public currentUserSubject = new BehaviorSubject<AccountLoginInputModel>(new AccountLoginInputModel());
    public currentUser: Observable<AccountLoginInputModel>;

    private authenticationUrl: string = this.baseService.authenticationUrl;

    constructor(private baseService: ApiService,
        private shareService: ShareService) {
            
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject.next(this.getLoggedUser());
    }

    public get currentUserValue(): AccountLoginInputModel {
        return this.currentUserSubject.value;
    }

    getLoggedUser(): AccountLoginInputModel {
        const user = localStorage.getItem('APP_USER');
        return JSON.parse(user);
    }

    login(loginData: AccountLoginInputModel) {
        return this.baseService.post<any>(`${this.authenticationUrl}/login`, loginData)
            .pipe(map(user => {
                localStorage.setItem('APP_TOKEN', user.Token);
                localStorage.setItem('APP_USER', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('APP_TOKEN');
        localStorage.removeItem('APP_USER');
        this.currentUserSubject.next(null);
    }

    getToken(): string {
        return localStorage.getItem('APP_TOKEN');
    }

    setToken(token: string): void {
        localStorage.setItem('APP_TOKEN', token);
    }

    getTokenExpirationDate(token: string): Date {
        if (!token) {
            localStorage.removeItem('APP_TOKEN');
            this.currentUserSubject.next(null);
            return null;
        }

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
        if (!date) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

}
