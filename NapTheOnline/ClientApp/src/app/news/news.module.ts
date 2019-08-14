import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NewsComponent} from './news.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewsComponent,
      },
      {
        path: 'detail',
        component: NewsDetailComponent,
      }
    ])
  ]
})
export class NewsModule {
}
