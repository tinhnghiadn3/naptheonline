import {Component, OnInit} from '@angular/core';
import {GameModel} from '../view-model/game.model';
import {GAMES} from '../view-model/mock-data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  selectedGame: GameModel;
  games: GameModel[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.games = GAMES;
  }

  showDetail(game: GameModel) {
    this.selectedGame = game;
    // this.router.navigate([`/games/${game.friendlyName}`]);
  }
}
