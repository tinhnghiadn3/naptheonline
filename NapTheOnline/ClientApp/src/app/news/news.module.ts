import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NewsComponent} from './news.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import { NewsListComponent } from './news-list/news-list.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailComponent,
    NewsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewsComponent,
        children: [
          {
            path: '', pathMatch: 'full',
            component: NewsListComponent,
          },
          {
            path: ':friendlyName',
            component: NewsDetailComponent,
          }
        ]
      }
    ])
  ]
})
export class NewsModule {
}
