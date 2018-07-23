import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';
import { LoginService } from './login.service';

@Injectable()
export class ProductService extends BaseService {
    constructor(
        private http:HttpClient,
        private loginService:LoginService
    ){
        super();
    }

    getAll(): Observable<Product[]>{
        let endpoint = this.UrlServiceV1 + "/products"
        return this.http.get<Product[]>(endpoint, this.loginService.setAuthHeader())
            .map(super.extractData)
            .catch(this.serviceError);
    }

}
