import { Injectable } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareService {

    private searchExpSubject = new BehaviorSubject<string>(null);

    private newTypeSubject = new BehaviorSubject<number>(null);

    private logOutSubject = new BehaviorSubject<boolean>(null);

    constructor() { }

    subscribeProject(next?: (value: string) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.searchExpSubject.subscribe(next, error, complete);
    }

    setSearchExp(searchExp: string) {
        const selectedProject = this.searchExpSubject.getValue();

        if (searchExp === selectedProject) {
            return;
        }

        this.searchExpSubject.next(searchExp);
    }

    subscribeNewType(next?: (value: number) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.newTypeSubject.subscribe(next, error, complete);
    }

    setNewType(newType: number) {
        const selectedType = this.newTypeSubject.getValue();

        if (newType === selectedType) {
            return;
        }

        this.newTypeSubject.next(newType);
    }

    subscribeLogIn(next?: (value: boolean) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.logOutSubject.subscribe(next, error, complete);
    }

    setLogIn(value: boolean) {
        const currentSection = this.logOutSubject.getValue();

        if (value === currentSection) {
            return;
        }

        this.logOutSubject.next(value);
    }
}
