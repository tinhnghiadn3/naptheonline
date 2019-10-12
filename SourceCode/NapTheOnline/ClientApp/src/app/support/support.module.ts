import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SupportComponent} from './support.component';


@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SupportComponent,
      },
    ])
  ]
})
export class SupportModule {
}
