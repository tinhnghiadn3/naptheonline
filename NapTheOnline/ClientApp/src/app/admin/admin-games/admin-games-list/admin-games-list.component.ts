import {Component, OnInit} from '@angular/core';
import {GameModel} from '../../../share/view-model/game.model';
import {Router} from '@angular/router';
import {GamesService} from '../../../service/games.service';
import {Utility} from '../../../share/utility';

@Component({
  selector: 'app-admin-games-list',
  templateUrl: './admin-games-list.component.html',
  styleUrls: ['./admin-games-list.component.scss']
})
export class AdminGamesListComponent implements OnInit {

  games: GameModel[];

  constructor(private router: Router,
              private gamesService: GamesService) {
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.gamesService.getGames().subscribe(res => {
      this.games = res;
      this.games = Utility.generateFriendlyName(this.games);
    });
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

}
