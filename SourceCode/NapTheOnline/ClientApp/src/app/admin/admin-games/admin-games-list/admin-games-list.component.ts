import { Component, OnInit, ViewChild, ɵɵtemplateRefExtractor } from '@angular/core';
import { GameModel } from '../../../share/view-model/game.model';
import { Router } from '@angular/router';
import { GamesService } from '../../../service/games.service';
import { GAMES } from '../../../share/mock-data';
import * as lodash from 'lodash';
import { Utility } from '../../../share/utility';
import { ShareService } from '../../../service/share.service';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-admin-games-list',
    templateUrl: './admin-games-list.component.html',
    styleUrls: ['./admin-games-list.component.scss']
})
export class AdminGamesListComponent implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: MatPaginator;

    total: number;
    pageSize: number = 20;
    games: any;
    searchExp: string;

    displayedColumns: string[] = ['logo', 'name', 'banner', 'actions'];
    maxPage: number;
    totalPage = [];
    pageEvent: PageEvent;

    constructor(private router: Router,
        private gamesService: GamesService,
        private shareService: ShareService) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList(index: number = null) {
        this.changePage(index || 0);
    }

    applyFilter() {
        this.games.filter = this.searchExp.trim().toLowerCase();
    }

    openForEdit(game: GameModel) {
        this.gamesService.adminGame = game;
        this.router.navigate([`admin/games/${game.friendlyname}`]);
    }

    createGame() {
        this.gamesService.adminGame = new GameModel();
        this.router.navigate([`admin/games/creating`]);
    }

    deleteGame(id: string) {
        if (confirm('Are you sure to delete this record?')) {
            this.shareService.setLoading(true);
            this.gamesService.deleteGame(id).pipe(
                finalize(() => {
                    setTimeout(() => {
                        this.shareService.setLoading(false);
                    }, 100);
                })
            ).subscribe(res => {
                this.refreshList(this.paginator.pageIndex);
                alert('Deleted Successfully');
            },
                error => {
                    alert('Deleted Failed');
                }
            );
        }
    }

    changePage(pageIndex) {
        if (pageIndex == null || pageIndex < 0) {
            return;
        }
        this.shareService.setLoading(true);
        this.gamesService.getGames(pageIndex).pipe(
            finalize(() => {
                setTimeout(() => {
                    this.shareService.setLoading(false);
                }, 100);
            })
        ).subscribe(res => {
            this.total = res.total;
            this.games = new MatTableDataSource(res.result);
        });
    }
}
