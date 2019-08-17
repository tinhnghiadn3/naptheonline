import {Component, OnInit} from '@angular/core';
import {GameModel} from '../share/view-model/game.model';
import {GAMES} from '../share/view-model/mock-data';
import {Router} from '@angular/router';
import {GamesService} from '../service/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  selectedGame: GameModel;
  games: GameModel[];

  constructor(private router: Router,
              private gameService: GamesService) {
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames().subscribe(res => {
      this.games = res || GAMES;
    });
  }

  showDetail(game: GameModel) {
    this.selectedGame = game;
    // this.router.navigate([`/games/${game.friendlyName}`]);
  }
}
