import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { CheckoutOrder } from '../model/checkout-order.model';

@Injectable()
export class OrderService extends BaseService {
    constructor(
        private http:HttpClient,
        private loginService:LoginService
    ){
        super();
    }

    getCheckoutOrder(customerId:string): Observable<CheckoutOrder>{
        let endpoint = this.UrlServiceV1 + "/orders/customer/"+customerId
        return this.http.get<CheckoutOrder>(endpoint, this.loginService.setAuthHeader())
            .map(super.extractData)
            .catch(this.serviceError);
    }

}
