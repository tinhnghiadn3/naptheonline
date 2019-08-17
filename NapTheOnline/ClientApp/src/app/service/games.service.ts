import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {GameModel} from '../share/view-model/game.model';
import {GamesModule} from '../games/games.module';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gameUrl: string = this.baseService.gameUrl;

  constructor(private baseService: ApiService) {
  }

  getGames(): Observable<GameModel[]> {
    return this.baseService.get(`${this.gameUrl}`);
  }

  getGame(gameId: number): Observable<GameModel> {
    return this.baseService.get(`${this.gameUrl}/${gameId}`);
  }
}
