import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './share/main/main.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: '', redirectTo: '/games', pathMatch: 'full'
      },
      {
        path: 'games',
        loadChildren: './games/games.module#GamesModule'
      },
      {
        path: 'news',
        loadChildren: './news/news.module#NewsModule'
      },
      {
        path: 'pay',
        loadChildren: './pay-game/pay-game.module#PayGameModule'
      },
      {
        path: 'about',
        loadChildren: './about/about.module#AboutModule'
      },
      {
        path: 'support',
        loadChildren: './support/support.module#SupportModule'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
