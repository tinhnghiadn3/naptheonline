import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/share.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-nav-header',
    templateUrl: './admin-nav-header.component.html',
    styleUrls: ['./admin-nav-header.component.scss']
})
export class AdminNavHeaderComponent implements OnInit {

    @Input() nameComponent: string;

    constructor(private shareService: ShareService,
                private router: Router) {
    }

    ngOnInit() {
    }

    logOut() {
        this.shareService.setLogIn(false);
        this.router.navigate(['/admin/login']);
    }

}
