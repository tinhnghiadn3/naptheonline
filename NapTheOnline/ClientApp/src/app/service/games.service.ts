import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {GameModel} from '../share/view-model/game.model';
import {PriceModel} from '../share/view-model/price.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gameUrl: string = this.baseService.gameUrl;

  public selectedGame: GameModel;
  public adminGame: GameModel;

  constructor(private baseService: ApiService) {
  }

  getGames(pageIndex: number): Observable<GameModel[]> {
    return this.baseService.get(`${this.gameUrl}/${pageIndex}`);
  }

  getPricesGame(gameId: number): Observable<PriceModel[]> {
    return this.baseService.get(`${this.gameUrl}/${gameId}`);
  }

  addGame(game: GameModel): Observable<number> {
    return this.baseService.post(`${this.gameUrl}`, game);
  }

  updateGame(game: GameModel): Observable<boolean> {
    return this.baseService.update(`${this.gameUrl}`, game);
  }

  deleteGame(gameId: number): Observable<boolean> {
    return this.baseService.delete(`${this.gameUrl}/${gameId}`);
  }
}
