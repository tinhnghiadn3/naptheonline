import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamesDetailComponent} from './games-detail/games-detail.component';
import {RouterModule} from '@angular/router';
import {GamesComponent} from './games.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GamesComponent,
      },
      {
        path: 'lord-mobile',
        component: GamesDetailComponent
      }
    ])
  ],
  declarations: [
    GamesComponent,
    GamesDetailComponent,
  ],
})
export class GamesModule {
}
