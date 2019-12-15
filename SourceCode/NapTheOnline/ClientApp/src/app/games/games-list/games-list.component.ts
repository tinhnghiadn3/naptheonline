import { Component, OnInit } from '@angular/core';
import { GameModel } from '../../share/view-model/game.model';
import { Router } from '@angular/router';
import { GamesService } from '../../service/games.service';
import { Utility } from '../../share/utility';
import { GAMES } from '../../share/mock-data';
import { finalize } from 'rxjs/operators';
import { ShareService } from '../../service/share.service';
import * as lodash from 'lodash';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games: GameModel[] = [];
  gamesClone: GameModel[];
  searchExp: string;

  constructor(private router: Router,
    private gameService: GamesService,
    private shareService: ShareService) {
    this.shareService.subscribeProject(searchExp => {
      this.searchExp = searchExp;
      if (!this.searchExp) {
        this.getGames();
      } else {
        this.filterList();
      }
    });
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    const that = this;
    this.gameService.getGames(0).pipe(
      finalize(() => {
        that.filterList();
        that.shareService.setLoading(false);
      })).subscribe(res => {
        this.games = res.result;
        this.games = Utility.generateFriendlyName(this.games);
        this.gamesClone = lodash.cloneDeep(this.games);
      });
  }

  filterList() {
    if (!this.searchExp || !this.searchExp.trim() || !this.games || this.games.length <= 0) {
      return;
    }

    this.games = this.gamesClone.filter(_ => _.name.toLocaleLowerCase().indexOf(this.searchExp.toLocaleLowerCase()) !== -1);
  }

  showDetail(game: GameModel) {
    this.gameService.selectedGame = game;
    // this.shareService.setLoading(true);
    this.router.navigate([`/games/${game.friendlyname}`]);
  }
}
