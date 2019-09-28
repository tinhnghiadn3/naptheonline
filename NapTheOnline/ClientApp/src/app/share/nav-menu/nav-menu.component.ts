import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../constant';
import { ShareService } from 'src/app/service/share.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

    MENU_ITEMS = MENU_ITEMS;
    searchExp: string;

    constructor(private shareService: ShareService,
                private router: Router) { }

    ngOnInit() {
    }

    search() {
        if (this.searchExp && this.searchExp.trim().length > 0) {
            this.shareService.setSearchExp(this.searchExp);
            this.router.navigate(['/news']);
        }
    }

    changeNewType(type: number) {
        if (type && type > 0) {
            this.shareService.setNewType(type);
        }
    }
}
