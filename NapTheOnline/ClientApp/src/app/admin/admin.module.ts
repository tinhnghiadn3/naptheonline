import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminNewsComponent} from './admin-news/admin-news.component';
import {AdminGamesComponent} from './admin-games/admin-games.component';


@NgModule({
  declarations: [AdminComponent, AdminNewsComponent, AdminGamesComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule {
}
