import { Component, OnInit } from '@angular/core';
import { GameModel } from '../../../share/view-model/game.model';
import { Router } from '@angular/router';
import { GamesService } from '../../../service/games.service';
import { GAMES } from '../../../share/mock-data';
import * as lodash from 'lodash';
import { Utility } from '../../../share/utility';
import { ShareService } from '../../../service/share.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-admin-games-list',
    templateUrl: './admin-games-list.component.html',
    styleUrls: ['./admin-games-list.component.scss']
})
export class AdminGamesListComponent implements OnInit {

    total: number;
    games: GameModel[];
    gamesClone: GameModel[];
    searchExp: string;

    pageIndex = 1;
    maxPage: number;
    totalPage = [];

    constructor(private router: Router,
        private gamesService: GamesService,
        private shareService: ShareService) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList(index: number = null) {
        this.changePage(index || 1);
    }

    search() {
        if (this.searchExp && this.searchExp.trim().length > 0) {
            this.games = this.gamesClone.filter(_ => _.name.includes(this.searchExp));
            this.pageIndex = 1;
            this.getListPagination();
        } else {
            this.games = this.gamesClone;
        }
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
            this.gamesService.deleteGame(id).subscribe(res => {
                const index = this.games.findIndex(_ => _.id === id);
                if (index > -1) {
                    this.games.splice(index, 1);
                }
                this.refreshList(this.pageIndex);
                alert('Deleted Successfully');
            },
                error => {
                    alert('Deleted Failed');
                }
            );
        }
    }

    changePage(pageIndex) {
        if ((this.pageIndex === pageIndex && this.pageIndex > 1) || pageIndex <= 0 || pageIndex > this.maxPage) {
            return;
        }

        this.pageIndex = pageIndex;
        this.gamesService.getGames(pageIndex).pipe(
            finalize(() => this.shareService.setLoading(false))
        ).subscribe(res => {
            this.total = res.total;
            this.games = res.result;
            this.gamesClone = lodash.cloneDeep(this.games);
            this.getListPagination();
        });
    }

    getListPagination() {
        if (this.total > 0) {
            const listPagination = [];
            if (this.total <= 5) {
                this.maxPage = 1;
                listPagination.push(1);
            } else {
                this.maxPage = Math.floor(this.total / 5);
                if ((this.total % 5) >= 1) {
                    this.maxPage += 1;
                }

                for (let i = 1; i <= this.maxPage; i++) {
                    listPagination.push(i);
                }
            }

            this.totalPage = listPagination;
        }
    }
}
