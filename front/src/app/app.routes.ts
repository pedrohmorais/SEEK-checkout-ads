import {Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CustomersComponent } from './components/customers/customers.component';


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
    path: 'products',
    component: ProductsComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate : [AuthGuardService]
  },
]
