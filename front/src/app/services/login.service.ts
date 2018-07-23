import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService extends BaseService {
    constructor(private http:HttpClient){
        super();
    }

    user:User
    token:string    

    isLoggedIn() : boolean {
        return this.user !== undefined && this.token !== undefined
    }

    setAuthHeader() {
        return this.isLoggedIn ? super.httpJsonAuth(this.token) : {}
    }

    logout(){
        this.user = undefined
        this.token = undefined
    }

    loginAPI(email:string,password:string): Observable<any>{
        let endpoint = this.UrlServiceV1 + "/auth"
        var user = <User>{
            email:email,
            password: password
        }
        return this.http.post<User>(endpoint,
            JSON.stringify(user),
            super.httpJsonOptions())
            .map(super.extractData)
            .catch(this.serviceError)
            .do(resp=>{
                this.user = resp.user
                this.token = resp.token
            });
    }
}