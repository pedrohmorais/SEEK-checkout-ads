import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routes';
import { LoginService } from './services/login.service';
import { BaseService } from './services/base.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from './services/product.service';
import { HeaderComponent } from './shared/header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CustomerService } from './services/customers.service';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    CustomersComponent,
    ProductsComponent,
    HeaderComponent,
    OrdersComponent
  ],
  providers: [
    LoginService,
    ProductService,
    CustomerService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
