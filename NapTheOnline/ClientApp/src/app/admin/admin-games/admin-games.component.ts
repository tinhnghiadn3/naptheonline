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

  constructor() {
  }

  ngOnInit() {
  }
}
