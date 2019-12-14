import { Component, OnInit } from '@angular/core';
import { ShareService } from '../service/share.service';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { AccountLoginInputModel } from '../share/view-model/account-login-input.model';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

    user: AccountLoginInputModel;

    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        if (this.adminService.isTokenExpired()) {
            this.adminService.logout();
        }
    }
}
