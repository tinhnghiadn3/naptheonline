import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { AccountLoginInputModel } from '../../share/view-model/account-login-input.model';
import { Subscription } from 'rxjs';
import { BackupService } from '../../service/backup.service';

@Component({
    selector: 'app-admin-nav-header',
    templateUrl: './admin-nav-header.component.html',
    styleUrls: ['./admin-nav-header.component.scss']
})
export class AdminNavHeaderComponent implements OnInit {

    @Input() nameComponent: string;
    
    private _user: AccountLoginInputModel;

    get user(): AccountLoginInputModel {
        return this._user;
    }

    set user(value: AccountLoginInputModel) {
        this._user = value;
    }

    userSubscription: Subscription;

    constructor(private adminService: AdminService,
                private router: Router,
                private backupService: BackupService,
                private shareService: ShareService) {
    }

    ngOnInit() {
        this.userSubscription = this.adminService.currentUser.subscribe(user => {
            this.user = user;
        });
    }

    logOut() {
        this.adminService.logout();
        this.router.navigate(['/admin/login']);
    }

    upload() {
        this.backupService.upload().toPromise();
    }

    restore() {
        this.backupService.restore().toPromise();
    }
}
