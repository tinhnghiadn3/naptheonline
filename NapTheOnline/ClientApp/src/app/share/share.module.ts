import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {HttpClientModule} from '@angular/common/http';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
  // MomentModule,
  //
];

const COMPONENTS = [
  NavMenuComponent,
  FooterComponent,
  MainComponent
];

const DIRECTIVES = [];

const PIPES = [];

const NB_THEME_PROVIDERS = [];

@NgModule({
  imports: [
    ...BASE_MODULES,
  ],
  exports: [...BASE_MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...NB_THEME_PROVIDERS],
    } as ModuleWithProviders;
  }
}
