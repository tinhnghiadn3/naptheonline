import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../constant';
import { ShareService } from 'src/app/service/share.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

    MENU_ITEMS = MENU_ITEMS;
    searchExp: string;
    selectedType: number = 0; 

    constructor(private shareService: ShareService,
        private router: Router) {
        this.router.events.subscribe(value => {
            if(router.url.toString() === '/news') {
                this.selectedType = 1;
            }
        });
    }

    ngOnInit() {
    }

    search() {
        if (this.searchExp && this.searchExp.trim().length > 0) {
            this.shareService.setSearchExp(this.searchExp);
            if (this.router.url !== '/games') {
                this.router.navigate(['/games']);
            }
        }
    }

    cancelSearch() {
        if (!this.searchExp || this.searchExp.trim().length <= 0) {
            this.shareService.setSearchExp(null);
        }
    }

    changeMenu(url: string) {
        if (this.router.url === url) {
            return;
        }

        this.shareService.setLoading(true);
    }
}
