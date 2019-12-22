import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsBestViewComponent } from './news-best-view/news-best-view.component';
import { NewsGameTricksComponent } from './news-game-tricks/news-game-tricks.component';
import { NewsTechnologyComponent } from './news-technology/news-technology.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailComponent,
    NewsListComponent,
    NewsBestViewComponent,
    NewsGameTricksComponent,
    NewsTechnologyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewsComponent,
        children: [
          { path: '', redirectTo: 'games', pathMatch: 'full' },
          {
            path: 'games', component: NewsListComponent,
          },
          {
            path: 'game-tricks', component: NewsGameTricksComponent,
          },
          {
            path: 'technology', component: NewsTechnologyComponent,
          },
          {
            path: ':friendlyName', component: NewsDetailComponent,
          }
        ]
      }
    ])
  ]
})
export class NewsModule {
}
