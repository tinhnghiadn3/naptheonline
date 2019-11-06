import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { AccountLoginInputModel } from '../../share/view-model/account-login-input.model';

@Component({
    selector: 'app-admin-nav-header',
    templateUrl: './admin-nav-header.component.html',
    styleUrls: ['./admin-nav-header.component.scss']
})
export class AdminNavHeaderComponent implements OnInit {

    @Input() nameComponent: string;
    user: AccountLoginInputModel;

    constructor(private adminService: AdminService,
                private router: Router,
                private shareService: ShareService) {
        this.user = this.adminService.currentUserValue;
    }

    ngOnInit() {
    }

    logOut() {
        this.adminService.logout();
        this.shareService.setLoading(true);
        this.router.navigate(['/admin/login']);
    }

}
