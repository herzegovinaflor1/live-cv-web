import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthorizationService } from "../authorization/authorization.service";

@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(
        private router:Router, 
        private authorizationService: AuthorizationService 
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {
 
        if (!this.authorizationService.isUserLoggedIn()) {
            alert('You are not allowed to view this page. You are redirected to login Page');
            
            this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
            return false;
 
            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        } 
 
        return true;
    }
 
}