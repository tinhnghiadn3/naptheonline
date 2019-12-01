import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminGamesComponent } from './admin-games/admin-games.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share/share.module';
import { AdminForgotPassComponent } from './admin-forgot-pass/admin-forgot-pass.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavMenuComponent } from './admin-nav-menu/admin-nav-menu.component';
import { AdminGameDetailComponent } from './admin-games/admin-game-detail/admin-game-detail.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminNewsDetailComponent } from './admin-news/admin-news-detail/admin-news-detail.component';
import { AdminGamesListComponent } from './admin-games/admin-games-list/admin-games-list.component';
import { AdminNewsListComponent } from './admin-news/admin-news-list/admin-news-list.component';
import { AdminNavHeaderComponent } from './admin-nav-header/admin-nav-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminChangePassComponent } from './admin-change-pass/admin-change-pass.component';
import { JwtInterceptor } from '../share/jwt.interceptor';
import { ErrorInterceptor } from '../share/error.interceptor';
import { AuthGuard } from '../share/auth.guard';

@NgModule({
    declarations: [
        AdminComponent,
        AdminNewsComponent,
        AdminGamesComponent,
        AdminLoginComponent,
        AdminForgotPassComponent,
        AdminDashboardComponent,
        AdminNavMenuComponent,
        AdminGameDetailComponent,
        AdminNewsDetailComponent,
        AdminGamesListComponent,
        AdminNewsListComponent,
        AdminNavHeaderComponent,
        AdminFooterComponent,
        AdminChangePassComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent, canActivate: [AuthGuard],
                children: [
                    {
                        path: '', redirectTo: 'games', pathMatch: 'full'
                    },
                    {
                        path: 'change-pass',
                        component: AdminChangePassComponent
                    },
                    {
                        path: 'games',
                        component: AdminGamesComponent,
                        children: [
                            {
                                path: '',
                                component: AdminGamesListComponent,
                            },
                            {
                                path: ':friendlyName',
                                component: AdminGameDetailComponent,
                            }
                        ]
                    },
                    {
                        path: 'news',
                        component: AdminNewsComponent,
                        children: [
                            {
                                path: '',
                                component: AdminNewsListComponent,
                            },
                            {
                                path: ':friendlyName',
                                component: AdminNewsDetailComponent,
                            }
                        ]
                    },
                ]
            },
            {
                path: 'login',
                component: AdminLoginComponent,
            },
            { path: '**', redirectTo: '' }
        ]),
        SharedModule,
        AngularEditorModule,
        FormsModule
    ],
    providers: [
        {
            provide:  forwardRef(() => { HTTP_INTERCEPTORS }),
            useExisting: JwtInterceptor,
            multi: true
        },
        {
            provide: forwardRef(() => { HTTP_INTERCEPTORS }),
            useExisting: ErrorInterceptor,
            multi: true
        },
    ],
})
export class AdminModule {
}
