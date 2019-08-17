import {Component, Input, OnInit} from '@angular/core';
import {GameModel} from '../../share/view-model/game.model';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.scss']
})
export class GamesDetailComponent implements OnInit {
  @Input() selectedGame: GameModel;

  constructor() {
  }

  ngOnInit() {
  }

}
