import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { HttpModule } from '../../node_modules/@angular/http';
import { RouterModule, PreloadAllModules } from '../../node_modules/@angular/router';
import { ROUTES } from './app.routes';
import { LoginService } from './services/login.service';
import { BaseService } from './services/base.service';
import { CommonModule } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    RouterModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})

  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
