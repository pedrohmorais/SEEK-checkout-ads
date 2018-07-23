import {Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';


export const ROUTES: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent},
  
]
