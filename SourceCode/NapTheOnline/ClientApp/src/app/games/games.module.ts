import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamesDetailComponent} from './games-detail/games-detail.component';
import {RouterModule} from '@angular/router';
import {GamesComponent} from './games.component';
import { GamesListComponent } from './games-list/games-list.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GamesComponent,
        children: [
          {
            path: '', pathMatch: 'full',
            component: GamesListComponent
          },
          {
            path: ':friendlyName',
            component: GamesDetailComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    GamesComponent,
    GamesDetailComponent,
    GamesListComponent,
  ],
})
export class GamesModule {
}
