import { ResponseContentType } from '@angular/http';
import { OnInit,Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { Router } from "@angular/router"

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
//import { TokenStorage } from "../shared/security/token.storage";
import { EventListener } from '@angular/core/src/debug/debug_node';

@Injectable()
export abstract class  BaseService {
    protected UrlServiceV1: string =  environment.backendUrl;

    constructor(){
    }

    protected httpJsonOptions(){
        return {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
    }

    protected httpJsonAuth(token:string){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'app-access-token': token
            })
        }
    }
    protected extractData(response: any) {
        return response.data || {};
    }
    protected serviceError(response:any) {
        return response.message || {};
    }
}