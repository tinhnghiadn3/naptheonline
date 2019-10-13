import {Component, OnInit} from '@angular/core';
import {GameModel} from '../share/view-model/game.model';
import {Router} from '@angular/router';
import {GamesService} from '../service/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
