import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { GameModel } from '../../share/view-model/game.model';
import { GamesService } from '../../service/games.service';
import { Router } from '@angular/router';
import { ShareService } from '../../service/share.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.scss']
})
export class GamesDetailComponent implements OnInit {

  selectedGame: GameModel;

  constructor(private gameService: GamesService,
    private router: Router,
    private shareService: ShareService) {
    if (this.gameService.selectedGame) {
      this.selectedGame = this.gameService.selectedGame;
    } else {
      this.router.navigate(['/games']);
    }
  }

  ngOnInit() {
  }

  getPrices() {
    if (this.selectedGame && this.selectedGame.id) {
      this.gameService.getPricesGame(this.selectedGame.id)
        .pipe(finalize(() => {
          this.shareService.setLoading(false);
        })).subscribe(res => this.selectedGame.prices = res);
    }
  }
}
