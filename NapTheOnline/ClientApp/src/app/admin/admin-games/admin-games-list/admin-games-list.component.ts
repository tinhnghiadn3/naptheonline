import { Component, OnInit } from '@angular/core';
import { GameModel } from '../../../share/view-model/game.model';
import { Router } from '@angular/router';
import { GamesService } from '../../../service/games.service';
import { GAMES } from '../../../share/mock-data';
import * as lodash from 'lodash';
import { Utility } from '../../../share/utility';

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
                private gamesService: GamesService) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList() {
        // todo: this is for UI designer
        this.games = GAMES;
        this.gamesClone = lodash.cloneDeep(this.games);

        this.changePage(1);
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
        this.router.navigate([`admin/games/${game.friendlyName}`]);
    }

    createGame() {
        this.gamesService.adminGame = new GameModel();
        this.router.navigate([`admin/games/creating`]);
    }

    deleteGame(id: number) {
        if (confirm('Are you sure to delete this record?')) {
            this.gamesService.deleteGame(id).subscribe(res => {
                const index = this.games.findIndex(_ => _.id === id);
                if (index > -1) {
                    this.games.splice(index, 1);
                }
                // this.refreshList();
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
        // this.gamesService.getGames(pageIndex).subscribe(res => {
        //     this.total = res.total;
        //     this.games = res.result;
        //     this.games = Utility.generateFriendlyName(this.games);

        //     // if (this.games.length === 0) {
        //         // this.games = GAMES;
        //     // }    

        //     this.gamesClone = lodash.cloneDeep(this.games);
        //     this.getListPagination();
        // });
    }

    getListPagination() {
        if (this.total > 0) {
            const listPagination = [];
            if (this.total <= 5) {
                this.maxPage = 1;
                listPagination.push(1);
            } else {
                this.maxPage = Math.floor(this.total / 5);
                if((this.total % 5) >= 1) {
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
