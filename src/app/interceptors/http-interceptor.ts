import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthorizationService } from "../service/authorization/authorization.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

const ACCESS_TOKEN_EXPIRATION: string = 'ACCESS_TOKEN_EXPIRATION';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    constructor(
        private authorizationService: AuthorizationService,
        private cookieService: CookieService,
        private router: Router,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
            const errorType = error.headers.get('Error-Type');
            if (error instanceof HttpErrorResponse && errorType === ACCESS_TOKEN_EXPIRATION) {
                return this.handleRefreshToken(req, next);
            }
            return throwError(() => new Error(error));
        }))
    }

    private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
        return this.authorizationService.refreshToken().pipe(
            switchMap((token: any) => {
                const accessToken = token.access_token;
                const refreshToken = token.refresh_token;
                this.cookieService.set('access_token', accessToken);
                this.cookieService.set('refresh_token', refreshToken);

                return next.handle(this.addTokenHeader(request, accessToken));
            }),
            catchError((error) => {
                this.authorizationService.singOut();
                this.router.navigate(['/'])
                return throwError(() => new Error(error));
            })
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({ headers: request.headers.set("Authorization", `Bearer ${token}`) });
    }
}