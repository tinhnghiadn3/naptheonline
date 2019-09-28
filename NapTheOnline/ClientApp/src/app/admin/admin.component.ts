import { Component, OnInit } from '@angular/core';
import { ShareService } from '../service/share.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

    constructor(private shareService: ShareService,
                private router: Router) {
        this.shareService.subscribeLogIn(value => {
            if (value) {
                this.router.navigate(['/admin/dashboard']);
            } else {
                this.router.navigate(['/admin/login']);
            }
        });
    }

    ngOnInit() {
    }
}
