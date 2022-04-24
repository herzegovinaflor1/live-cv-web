import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  enabled: boolean = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) { }


  refreshToken() {
    this.httpClient
      .get(`${environment.host}/token/refresh`)
      .subscribe((res: any) => {
        const accessToken = res.headers.get('access_token');
        const refreshToken = res.headers.get('refresh_token');
        const userId = res.headers.get('user_id');
        this.cookieService.set('access_token', accessToken);
        this.cookieService.set('refresh_token', refreshToken);
        this.router.navigate([`/cv/${userId}`])
      })
  }

  authenticate(username: any, password: any) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders()
        .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        .append('Access-Control-Allow-Methods', 'POST, GET')
        .append('Access-Control-Allow-Origin', '*')
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Access-Control-Allow-Credentials', 'true'),
    };

    this.httpClient
      .post(`${environment.host}/login`, body.toString(), { ...options, observe: 'response' })
      .subscribe((res: any) => {
        const accessToken = res.headers.get('access_token');
        const refreshToken = res.headers.get('refresh_token');
        const userId = res.headers.get('user_id');
        this.cookieService.set('access_token', accessToken);
        this.cookieService.set('refresh_token', refreshToken);
        this.router.navigate([`/cv/${userId}`])
      })
  }

  isUserLoggedIn(): boolean {
    return !!this.getAccessToken() && this.enabled;
  }

  getAccessToken(): string {
    return this.cookieService.get('access_token');
  }

  getRefreshToken(): string {
    return this.cookieService.get('refresh_token');
  }

  disable() {
    this.enabled = true;
  }

}
