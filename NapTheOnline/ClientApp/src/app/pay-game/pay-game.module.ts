import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PayGameComponent} from './pay-game.component';
import {NgxCaptchaModule} from 'ngx-captcha';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PayGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PayGameComponent,
      },
    ]),
    NgxCaptchaModule,
    ReactiveFormsModule,
  ]
})
export class PayGameModule {
}
