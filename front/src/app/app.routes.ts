import {Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerOrdersComponent } from './components/customers/orders/orders.component';


export const ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/:loggout',
    component: LoginComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'customers/orders/:id',
    component: CustomerOrdersComponent,
    canActivate : [AuthGuardService]
  },
]
