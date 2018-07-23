import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from "rxjs/Observable"
import { LoginService } from './login.service';
import { User } from '../model/user.model';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private loginService: LoginService, private router: Router){}

    public user:User;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if(!this.loginService.isLoggedIn())
        {
            this.router.navigate(['/login'])
            return false;
        }
        return true;
    }
}