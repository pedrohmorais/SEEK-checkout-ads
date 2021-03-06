import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { LoginService } from './login.service';

@Injectable()
export class CustomerService extends BaseService {
    constructor(
        private http:HttpClient,
        private loginService:LoginService
    ){
        super();
    }

    getAll(): Observable<Customer[]>{
        let endpoint = this.UrlServiceV1 + "/customers"

        return this.http.get<Customer[]>(endpoint, this.loginService.setAuthHeader())
            .map(super.extractData)
            .catch(this.serviceError);
    }

}
