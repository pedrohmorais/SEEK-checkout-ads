import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from '@angular/http'

import { User } from '../model/user';

@Injectable()
export class LoginService extends BaseService {
    constructor(private http:Http){
        super();
    }

    loginAPI(): Observable<any>{
        let endpoint = this.UrlServiceV1 + "/auth"
        var user = <User>{
            email:"testuser@onlyfortests.testing",
            password: "123456"
        }
       
        return this.http.post(endpoint,
            JSON.stringify(user),
            new RequestOptions(super.httpJsonOptions()))
            .map(super.extractData)
            .catch(this.serviceError);
    }
   
}
//this.httpJsonOptions()