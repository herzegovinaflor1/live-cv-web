import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private httpClient: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  updatePhoto(formData: FormData): Observable<any> {
    const options = {
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${this.authorizationService.getAccessToken()}`)
        .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        .append('Access-Control-Allow-Methods', '*')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Credentials', 'true'),
    };

    return this.httpClient.put(`${environment.host}/photo/user`, formData, options);
  }
}
