import { Injectable } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareService {

    private searchExpSubject = new BehaviorSubject<string>(null);

    private newTypeSubject = new BehaviorSubject<number>(1);

    private logOutSubject = new BehaviorSubject<boolean>(null);

    private loadingSubject = new BehaviorSubject<boolean>(false);

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

    subscribeLoading(next?: (value: boolean) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.loadingSubject.subscribe(next, error, complete);
    }

    setLoading(isLoading: boolean) {
        const selectedType = this.loadingSubject.getValue();

        if (isLoading === selectedType) {
            return;
        }

        this.loadingSubject.next(isLoading);
    }
}
