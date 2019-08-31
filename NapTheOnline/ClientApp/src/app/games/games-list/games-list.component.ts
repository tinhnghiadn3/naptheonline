import {Component, OnInit} from '@angular/core';
import {GameModel} from '../../share/view-model/game.model';
import {Router} from '@angular/router';
import {GamesService} from '../../service/games.service';
import {Utility} from '../../share/utility';

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
    this.gameService.getGames().subscribe(res => {
      this.games = res;
      this.games = Utility.generateFriendlyName(this.games);
    });
  }

  showDetail(game: GameModel) {
    this.gameService.selectedGame = game;
    this.router.navigate([`/games/${game.friendlyName}`]);
  }
}