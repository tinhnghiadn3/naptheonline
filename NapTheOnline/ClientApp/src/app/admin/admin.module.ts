import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminNewsComponent} from './admin-news/admin-news.component';
import {AdminGamesComponent} from './admin-games/admin-games.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../share/share.module';
import {AdminForgotPassComponent} from './admin-forgot-pass/admin-forgot-pass.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminNavMenuComponent} from './admin-nav-menu/admin-nav-menu.component';
import {AdminGameDetailComponent} from './admin-games/admin-game-detail/admin-game-detail.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNewsComponent,
    AdminGamesComponent,
    AdminLoginComponent,
    AdminForgotPassComponent,
    AdminDashboardComponent,
    AdminNavMenuComponent,
    AdminGameDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: AdminDashboardComponent,
          },
          {
            path: 'games',
            component: AdminGamesComponent
          },
          {
            path: 'news',
            component: AdminNewsComponent
          },
        ]
      },
      {
        path: 'forgot',
        component: AdminForgotPassComponent
      }
    ]),
    SharedModule,
    AngularEditorModule,
    FormsModule
  ]
})
export class AdminModule {
}