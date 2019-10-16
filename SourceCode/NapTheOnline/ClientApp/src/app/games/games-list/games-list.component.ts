import { Component, OnInit } from '@angular/core';
import { GameModel } from '../../share/view-model/game.model';
import { Router } from '@angular/router';
import { GamesService } from '../../service/games.service';
import { Utility } from '../../share/utility';
import { GAMES } from '../../share/mock-data';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games: GameModel[];

  constructor(private router: Router,
    private gameService: GamesService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    // todo: this is for UI designer
    // this.games = GAMES;

    this.gameService.getGames(0).subscribe(res => {
      this.games = res.result;
      this.games = Utility.generateFriendlyName(this.games);
    });
  }

  showDetail(game: GameModel) {
    this.gameService.selectedGame = game;
    this.router.navigate([`/games/${game.friendlyName}`]);
  }
}
