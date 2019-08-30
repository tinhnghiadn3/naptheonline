import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {GameModel} from '../share/view-model/game.model';
import {ImagePathsModel} from '../share/view-model/image-paths.model';

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

  addGame(game: GameModel): Observable<boolean> {
    return this.baseService.post(`${this.gameUrl}`, game);
  }

  updateGame(game: GameModel): Observable<boolean> {
    return this.baseService.update(`${this.gameUrl}`, game);
  }

  deleteOrder(gameId: number): Observable<boolean> {
    return this.baseService.delete(`${this.gameUrl}/${gameId}`);
  }
}
