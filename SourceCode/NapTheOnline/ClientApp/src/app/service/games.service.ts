import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GameModel } from '../share/view-model/game.model';
import { PriceModel } from '../share/view-model/price.model';
import { ListResult } from '../share/view-model/list-result.model';
import { IdModel } from '../share/view-model/IdModel';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gameUrl: string = this.baseService.gameUrl;

  public selectedGame: GameModel;
  public adminGame: GameModel;

  constructor(private baseService: ApiService) {
  }

  getGames(pageIndex: number): Observable<ListResult<GameModel[]>> {
    return this.baseService.get(`${this.gameUrl}/page/${pageIndex}`);
  }

    getPricesGame(gameId: string): Observable<PriceModel[]> {
    return this.baseService.get(`${this.gameUrl}/${gameId}`);
  }

    addGame(game: GameModel): Observable<IdModel> {
    return this.baseService.post(`${this.gameUrl}`, game);
  }

    updateGame(game: GameModel): Observable<boolean> {
    return this.baseService.update(`${this.gameUrl}`, game);
  }

    deleteGame(gameId: string): Observable<boolean> {
    return this.baseService.delete(`${this.gameUrl}/${gameId}`);
  }
}
