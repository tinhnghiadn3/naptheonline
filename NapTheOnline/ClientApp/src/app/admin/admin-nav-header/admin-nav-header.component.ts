import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
    selector: 'app-admin-nav-header',
    templateUrl: './admin-nav-header.component.html',
    styleUrls: ['./admin-nav-header.component.scss']
})
export class AdminNavHeaderComponent implements OnInit {

    @Input() nameComponent: string;

    constructor(private adminService: AdminService,
                private router: Router) {
    }

    ngOnInit() {
    }

    logOut() {
        this.adminService.logout();
        this.router.navigate(['/admin/login']);
    }

}
