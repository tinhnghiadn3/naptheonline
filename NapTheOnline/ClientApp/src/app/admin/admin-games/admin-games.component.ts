import {Component, OnInit} from '@angular/core';
import {GameModel} from '../../share/view-model/game.model';
import {GamesService} from '../../service/games.service';
import {Router} from '@angular/router';
import {GAMES} from '../../share/view-model/mock-data';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.scss']
})
export class AdminGamesComponent implements OnInit {

  games: GameModel[];
  selectedGame: GameModel;

  constructor(private router: Router,
              private gamesService: GamesService) {
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.gamesService.getGames().subscribe(res => {
      this.games = res.length > 0 ? res : GAMES;
    });
  }

  openForEdit(game: GameModel) {
    this.selectedGame = game;
  }

  deleteGame(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.gamesService.deleteOrder(id).subscribe(res => {
          this.refreshList();
          alert('Deleted Successfully');
        },
        error => {
          alert('Deleted Failed');
        }
      );
    }
  }

}
